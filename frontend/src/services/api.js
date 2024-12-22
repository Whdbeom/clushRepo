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

export const changeTodoStatus = (id) => {
  return fetch(`http://localhost:8080/api/todo/complete/${id}`, {
      method: "PATCH",
  })
  .then((response) => response.json())
  .catch((error) => {
      console.error("Error change todo status:", error);
      throw error;
  });
};

export const deleteTodo = (id) => {
  return fetch(`http://localhost:8080/api/todo/delete/${id}`, {
      method: "DELETE",
  })
  .then((response) => {
      if (!response.ok) {
          throw new Error(`Failed to delete todo with id: ${id}`);
      }
  })
  .catch((error) => {
      console.error("Error delete todo:", error);
      throw error;
  });
};

export const getEventList = () => {
  return fetch("http://localhost:8080/api/calendar")
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error get todos:", error);
      throw error; 
    });
};

export const deleteEvent = (id) => {
  return fetch(`http://localhost:8080/api/calendar/${id}`, {
      method: "DELETE",
  })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Failed to delete event with id: ${id}`);
        }
    })
    .catch((error) => {
        console.error("Error delete event:", error);
        throw error;
    });
};

export const addEvent = (event) => {
  return fetch("http://localhost:8080/api/calendar", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
  })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Failed to add event");
        }
        return response.json();
    })
    .catch((error) => {
        console.error("Error add event:", error);
        throw error;
    });
};

export const updateEvent = (updatedEvent) => {
  return fetch(`http://localhost:8080/api/calendar/${updatedEvent.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedEvent),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to update event');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error update event:', error);
      throw error;
    });
};