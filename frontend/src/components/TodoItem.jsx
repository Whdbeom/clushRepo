import React from "react";


const TodoItem = ({ todo, changeTodoStatus, deleteTodo }) => {
    return (
        <li>
            <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => changeTodoStatus(todo.id)}
            />
            <span
                style={{
                    textDecoration: todo.isCompleted ? "line-through" : "none", 
                    color: todo.isCompleted ? "gray" : "black", 
                }}
            >
                {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
    );
};

export default TodoItem;