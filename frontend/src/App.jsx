import React from 'react';
import TodoList from './components/TodoList/TodoList';
import Calendar from './components/calendar/Calendar';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`

const App = () => {

  return (
    <Container>
      <TodoList />
      <Calendar />
    </Container>
  );
};

export default App;
