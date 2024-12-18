package org.example.backend.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.example.backend.entity.Todo;
import org.example.backend.repository.TodoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;


    public List<Todo> getTodo() {
        return todoRepository.findAll();
    }


    @Transactional
    public Todo createTodo(Todo todo){
        return todoRepository.save(todo);
    }

    @Transactional
    public Todo updateTodo(Long id, Todo todo) {
        if (todoRepository.existsById(id)) {
            todo.setId(id); // 기존 ID로 설정하여 수정
            return todoRepository.save(todo);
        }
        return null; // 해당 ID가 없으면 null 반환
    }

    @Transactional
    public Todo changeTodoStatus(Long id) {
        Todo updatedTodo = todoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("not found todo id: " + id));

        updatedTodo.setCompleted(!updatedTodo.isCompleted());
        return todoRepository.save(updatedTodo);
    }

    @Transactional
    public boolean deleteTodo(Long id) {
        if (todoRepository.existsById(id)) {
            todoRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
