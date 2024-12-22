package org.example.backend.controller;


import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.backend.entity.Todo;
import org.example.backend.service.TodoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/todo")
public class TodoController {

    private final TodoService todoService;

    @Operation(summary = "TodoList 조회", description = "모든 TodoList의 목록을 조회합니다.")
    @GetMapping(value = "/getTodo")
    public List<Todo> getTodo(){
        List<Todo> todoList = todoService.getTodo();
        return todoList;
    }

    @Operation(summary = "Todo 항목 생성", description = "새로운 Todo 항목을 생성하여 데이터베이스에 저장합니다.")
    @PostMapping("/insert")
    public ResponseEntity<Todo> createTodo(@RequestBody Todo todo) {
        Todo savedTodo = todoService.createTodo(todo);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTodo);
    }

    @Operation(summary = "Todo 항목 수정", description = "기존의 투두 항목을 수정합니다.")
    @PutMapping("/update/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable("id") Long id, @RequestBody Todo todo) {
        Todo updatedTodo = todoService.updateTodo(id, todo);
        if (updatedTodo != null) {
            return ResponseEntity.ok(updatedTodo);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @Operation(summary = "Todo Item 항목 변경", description = "Todo 항목의 상태를 완료 또는 취소로 변경합니다.")
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
    @Operation(summary = "Todo 항목 삭제", description = "ID를 기준으로 Todo 항목을 삭제합니다.")
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
