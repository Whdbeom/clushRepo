import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";
import { getTodoList, changeTodoStatus, deleteTodo } from "../../services/api";
import styled from "styled-components";

const StyledTodoListDiv = styled.div`
    background-color: #dddddd;
    width: 23%;
    padding: 1rem;
    overflow: scroll;
    height: 850px;
    overflow-x: hidden;
`

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    // 투두리스트 붏러오기
    useEffect(() => {
        getTodoList() 
        .then((data) => {
            setTodos(data);
            console.log(data); 
        })
        .catch((error) => console.error("Error get todos:", error));  
    }, []);
    
    // 상태변경
    const handleStatusChange = (id) => {
        changeTodoStatus(id)
            .then(() => {
                getTodoList()
                    .then((data) => setTodos(data))
                    .catch((error) => console.error("Error get todos:", error));
            })
            .catch((error) => console.error("Error change todo status:", error));
    };

    // 삭제
    const handleDelete = (id) => {
        deleteTodo(id)
            .then(() => {
                setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
            })
            .catch((error) => console.error("Error deleting todo:", error));
    };
    
    return (
        <StyledTodoListDiv>
            <h1>Todo List</h1>
            <AddTodo setTodos={setTodos} />                    
                {todos.map((todo) => (
                    <TodoItem 
                        key={todo.id} 
                        todo={todo} 
                        changeTodoStatus={handleStatusChange} 
                        deleteTodo={handleDelete}
                    />
                ))}
        </StyledTodoListDiv>
    );
};

export default TodoList;
