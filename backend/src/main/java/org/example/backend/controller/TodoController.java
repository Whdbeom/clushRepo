package org.example.backend.controller;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.backend.entity.Todo;
import org.example.backend.service.TodoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/todo")
public class TodoController {

    private final TodoService todoService;

    // 투두 가져오기
    @GetMapping(value = "/getTodo")
    public List<Todo> getTodo(){
        List<Todo> todoList = todoService.getTodo();
        return todoList;
    }

    // 투두 입력
    @PostMapping("/insert")
    public ResponseEntity<Todo> createTodo(@RequestBody Todo todo) {
        Todo savedTodo = todoService.createTodo(todo);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTodo);
    }

    // 투두 수정
    @PutMapping("/update/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable("id") Long id, @RequestBody Todo todo) {
        Todo updatedTodo = todoService.updateTodo(id, todo);
        if (updatedTodo != null) {
            return ResponseEntity.ok(updatedTodo);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // 투두 상태변경 (완료 / 취소)
    @PatchMapping("/complete/{id}")
    public ResponseEntity<Todo> changeTodoStatus(@PathVariable("id") Long id) {
        Todo updatedTodo = todoService.changeTodoStatus(id);
        if (updatedTodo != null) {
            return ResponseEntity.ok(updatedTodo);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // 투두 삭제
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable("id") Long id) {
        boolean isDeleted = todoService.deleteTodo(id);
        if (isDeleted) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


}
