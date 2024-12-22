import React from "react";
import styled from "styled-components";

const StyledTodoItemDiv = styled.div`
    border: 1px solid black;
    border-radius: 5px;
    margin-bottom: 10px;
    display: grid;
    grid-template-columns: 0.2fr 1fr 0.2fr;

    & span {
        overflow: hidden; 
        white-space: nowrap; 
        text-overflow: ellipsis; 
        display: block; 
    }

`

const TodoItem = ({ todo, changeTodoStatus, deleteTodo }) => {
    return (
        <StyledTodoItemDiv>
            <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => changeTodoStatus(todo.id)}
            />
            <span
                title={todo.title}
                style={{
                    textDecoration: todo.isCompleted ? "line-through" : "none", 
                    color: todo.isCompleted ? "gray" : "black", 
                }}
            >
                {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>삭제</button>
        </StyledTodoItemDiv>
    );
};

export default TodoItem;