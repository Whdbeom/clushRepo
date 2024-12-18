import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";
import { getTodoList } from "../services/api";

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    // 투두리스트 붏러오기
    useEffect(() => {
        getTodoList() 
        .then((data) => {
            setTodos(data);
            console.log(data); 
        })
        .catch((error) => console.error("Error get todos:", error));  // 에러 처리
    }, []);
    
    // 상태변경
    const changeTodoStatus = (id) => {
        fetch(`http://localhost:8080/api/todo/complete/${id}`, {
            method: "PATCH",
        })
        .then((response) => response.json())
        .then(() => {
            fetch("http://localhost:8080/api/todo/getTodo")
                .then((response) => response.json())
                .then((data) => setTodos(data)) 
                .catch((error) => console.error("Error get todos:", error));
        })
        .catch((error) => console.error("Error updating todo:", error));
    };

    // 삭제
    const deleteTodo = (id) => {
        fetch(`http://localhost:8080/api/todo/delete/${id}`, {
            method: "DELETE",
        })
        .then(() => setTodos(todos.filter((todo) => todo.id !== id)))
        .catch((error) => console.error("Error deleting todo:", error));
    };
    
    return (
        <div>
            <h1>Todo List</h1>\
            <AddTodo setTodos={setTodos} />
            <ul>                     
                {todos.map((todo) => (
                    <TodoItem 
                        key={todo.id} 
                        todo={todo} 
                        changeTodoStatus={changeTodoStatus} 
                        deleteTodo={deleteTodo}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
