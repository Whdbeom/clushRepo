package org.example.backend.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TodoController {

    @GetMapping(value = "/test")
    public String test(){
        return "asdf";
    }
}
