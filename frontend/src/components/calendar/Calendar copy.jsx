import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ConfirmModal from './ConfirmModal';
import { getTodoList, getEventList, addEvent  } from '../../services/api';

export default function Calendar() {
    // const [currentEvents, setCurrentEvents] = useState([]);
    // const [todos, setTodos] = useState([]);
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null); // 클릭된 이벤트 상태
    const [showModal, setShowModal] = useState(false); // 모달 상태

    useEffect(() => {
        // getTodoList() 
        // .then((todos) => {
        //     setTodos(mapTodosToEvents(todos));
        // })
        // .catch((error) => console.error("Error get todos:", error));  
        getEventList() 
        .then((events) => {
            setEvents(events);
        })
        .catch((error) => console.error("Error get eventss:", error));  
    }, [events]);

    // function mapTodosToEvents(todos) {
    //     return todos.map(todo => ({
    //         id: todo.id,
    //         title: todo.title, 
    //         start: todo.createdAt,
    //         allDay: false,
    //     }));
    // }

    // function mapTodosToEvents(todos) {
    //     return todos.map(todo => ({
    //         id: todo.id,
    //         title: todo.title, 
    //         start: todo.createdAt,
    //         allDay: false,
    //     }));
    // }

    function handleDateSelect(selectInfo) {
        const title = prompt('일정 이름 입력');
        const calendarApi = selectInfo.view.calendar;
        
        calendarApi.unselect(); // 선택 취소
  
        if (title) {
            calendarApi.addEvent({
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay,
            })
        }
    }

    function handleEventClick(clickInfo) {
        setSelectedEvent(clickInfo.event);
        setShowModal(true);
    }

    function handleCloseModal() {
        setShowModal(false);
        setSelectedEvent(null);
    }

    const handleEventDelete = (eventId) => {

        
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
    };

    // function handleEvents(events) {
    //   setCurrentEvents(events);
    // }
  
    function handleEventAdd(addInfo) {
        const event = addInfo.event;
        addEvent(event)
            .then((data) => {
                setEvents((prevEvents) => [...prevEvents, data]);
            })
            .catch((error) => console.error("Error adding event:", error));
    }

    return (
      <div className="demo-app">
        <div className="demo-app-main">
          <FullCalendar
            locale="kr"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
                left: 'prev',
                center: 'title',
                right: 'next',
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            events={events} // 상태로 관리되는 이벤트 사용
            select={handleDateSelect} // 드래그하여 선택할 때 이벤트 핸들러
            eventClick={handleEventClick}
            // eventContent={eventContent} // 이벤트의 내용에 체크박스 추가
            // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            eventAdd={handleEventAdd}
            // eventChange={handleEventAdd}
            // eventRemove={handleDeleteEvent}
          />
        </div>
        {showModal && (
            <ConfirmModal
                show={showModal}
                event={selectedEvent}
                onClose={handleCloseModal}
                onDelete={(eventId) => handleEventDelete(eventId)}
            />
        )}
      </div>
    );
  }
