package org.example.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.example.backend.entity.Event;
import org.example.backend.service.EventService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/calendar")
public class EventController {

    private final EventService eventService;

    @Operation(summary = "일정 목록 조회", description = "모든 일정의 목록을 조회합니다.")
    @GetMapping
    public ResponseEntity<List<Event>> getEvents() {
        List<Event> allEvents = eventService.getAllEvents();
        return ResponseEntity.ok(allEvents);
    }

    @Operation(summary = "일정 생성", description = "새로운 일정을 생성하여 데이터베이스에 저장합니다.")
    @PostMapping
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        Event createdEvent = eventService.createEvent(event);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdEvent);
    }

    @Operation(summary = "일정 삭제", description = "ID를 기준으로 일정을 삭제합니다.")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "일정 수정", description = "일정 정보를 수정합니다.")
    @PutMapping("/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event event) {
        Event updatedEvent = eventService.updateEvent(id, event);
        return ResponseEntity.ok(updatedEvent);
    }
}