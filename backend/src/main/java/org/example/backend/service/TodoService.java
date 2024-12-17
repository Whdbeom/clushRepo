package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.entity.Todo;
import org.example.backend.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;
    public Todo createTodo(Todo todo){
        return todoRepository.save(todo);
    }

    public Todo updateTodo(Long id, Todo todo) {
        if (todoRepository.existsById(id)) {
            todo.setId(id); // 기존 ID로 설정하여 수정
            return todoRepository.save(todo);
        }
        return null; // 해당 ID가 없으면 null 반환
    }

    public Todo markAsCompleted(Long id) {
        Optional<Todo> todo = todoRepository.findById(id);
        if (todo.isPresent()) {
            Todo updatedTodo = todo.get();
            updatedTodo.setCompleted(true);
            return todoRepository.save(updatedTodo);
        }
        return null;
    }

    public boolean deleteTodo(Long id) {
        if (todoRepository.existsById(id)) {
            todoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
