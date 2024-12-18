// import { useState } from 'react';

// const useTodos = () => {
//   const [todos, setTodos] = useState([]);

//   const addTodo = (title) => {
//     const newTodo = {
//       id: Date.now(),
//       title,
//       completed: false,
//     };
//     setTodos([...todos, newTodo]);
//   };

//   const toggleTodo = (id) => {
//     setTodos(todos.map(todo =>
//       todo.id === id ? { ...todo, completed: !todo.completed } : todo
//     ));
//   };

//   const deleteTodo = (id) => {
//     setTodos(todos.filter(todo => todo.id !== id));
//   };

//   return { todos, addTodo, toggleTodo, deleteTodo };
// };

// export default useTodos;