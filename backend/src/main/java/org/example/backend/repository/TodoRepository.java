package org.example.backend.repository;

import org.example.backend.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    // 완료된 투두 조회
    List<Todo> findByIsCompletedTrue();

    // 미완료된 투두 조회
    List<Todo> findByIsCompletedFalse();

    //제목으로 투두 조회
    List<Todo> findByTitleContainingIgnoreCase(String title);
}
