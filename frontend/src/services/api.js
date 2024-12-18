export const getTodoList = () => {
    return fetch("http://localhost:8080/api/todo/getTodo")
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error get todos:", error);
        throw error; 
        });
};

export const addTodo = (newTodo) => {
    return fetch("http://localhost:8080/api/todo/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
        })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error add todo:", error);
        throw error;
        });
};
