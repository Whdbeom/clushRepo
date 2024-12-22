package org.example.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.backend.entity.Todo;
import org.example.backend.service.TodoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class TodoControllerTest {

    private MockMvc mockMvc;

    @Mock
    private TodoService todoService;

    @InjectMocks
    private TodoController todoController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(todoController).build();
    }

    @Test
    void testGetTodo() throws Exception {
        Todo todo1 = new Todo();
        todo1.setId(1L);
        todo1.setTitle("Test Todo 1");
        todo1.setCompleted(false);

        Todo todo2 = new Todo();
        todo2.setId(2L);
        todo2.setTitle("Test Todo 2");
        todo2.setCompleted(false);

        List<Todo> todoList = Arrays.asList(todo1, todo2);
        when(todoService.getTodo()).thenReturn(todoList);

        mockMvc.perform(get("/api/todo/getTodo"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Test Todo 1"))
                .andExpect(jsonPath("$[1].title").value("Test Todo 2"))
                .andExpect(jsonPath("$[0].isCompleted").value(false))
                .andExpect(jsonPath("$[1].isCompleted").value(false));
    }

    @Test
    void testCreateTodo() throws Exception {
        Todo newTodo = new Todo();
        newTodo.setTitle("New Todo");
        newTodo.setCompleted(false);

        Todo savedTodo = new Todo();
        savedTodo.setId(1L);
        savedTodo.setTitle("New Todo");
        savedTodo.setCompleted(false);

        when(todoService.createTodo(any(Todo.class))).thenReturn(savedTodo);

        mockMvc.perform(post("/api/todo/insert")
                        .contentType("application/json")
                        .content(new ObjectMapper().writeValueAsString(newTodo)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("New Todo"))
                .andExpect(jsonPath("$.isCompleted").value(false));
    }

    @Test
    void testUpdateTodo() throws Exception {
        Todo updatedTodo = new Todo();
        updatedTodo.setId(1L);
        updatedTodo.setTitle("Updated Todo");
        updatedTodo.setCompleted(true);

        when(todoService.updateTodo(eq(1L), any(Todo.class))).thenReturn(updatedTodo);

        mockMvc.perform(put("/api/todo/update/1")
                        .contentType("application/json")
                        .content(new ObjectMapper().writeValueAsString(updatedTodo)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Updated Todo"))
                .andExpect(jsonPath("$.isCompleted").value(true));
    }

    @Test
    void testChangeTodoStatus() throws Exception {
        Todo todo = new Todo();
        todo.setId(1L);
        todo.setTitle("Test Todo");
        todo.setCompleted(true);

        when(todoService.changeTodoStatus(1L)).thenReturn(todo);

        mockMvc.perform(patch("/api/todo/complete/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Test Todo"))
                .andExpect(jsonPath("$.isCompleted").value(true));
    }

    @Test
    void testDeleteTodo() throws Exception {
        when(todoService.deleteTodo(1L)).thenReturn(true);

        mockMvc.perform(delete("/api/todo/delete/1"))
                .andExpect(status().isNoContent());

        verify(todoService, times(1)).deleteTodo(1L);
    }
}
