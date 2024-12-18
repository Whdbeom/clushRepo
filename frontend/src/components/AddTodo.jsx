import React, { useState } from "react";
import { addTodo } from "../services/api";

const AddTodo = ({ setTodos }) => {
    const [newTodo, setNewTodo] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!newTodo.trim()) return; 

        const todoData = { title: newTodo };

        addTodo(todoData)
        .then((data) => {
        setTodos((prevTodos) => [...prevTodos, data]); 
        setNewTodo(""); 
        })
        .catch((error) => console.error("Error add todo:", error)); 
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="할 일을 입력하세요"
            />
            <button type="submit">추가</button>
        </form>
    );
};

export default AddTodo;