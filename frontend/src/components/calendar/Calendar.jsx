import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import styled from 'styled-components';
import ConfirmModal from './ConfirmModal';
import { getEventList, addEvent, deleteEvent } from '../../services/api';

const StyledCalendarDiv = styled.div`
    background-color: #f8f9fa;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    width: 80%;
    margin: 0 auto;
`;

const Calendar = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null); 
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getEventList()
            .then((data) => {
                setEvents(data);
                console.log(data);
            })
            .catch((error) => console.error('Error getting events:', error));
    }, []);

    const handleDateSelect = (selectInfo) => {
        console.log("날짜선택이벤트", selectInfo);
        
        const title = prompt('일정 이름 입력');
        const calendarApi = selectInfo.view.calendar;

        calendarApi.unselect(); 

        if (title) {

            let endDate = new Date(selectInfo.endStr);
            endDate.setDate(endDate.getDate() - 1); 
        
            const endStr = endDate.toISOString().split('T')[0];

            const newEvent = {
                title,
                start: selectInfo.startStr + "T00:00",
                end: endStr + "T23:59",
                allDay: selectInfo.allDay,
            };

            addEvent(newEvent)
                .then((data) => {
                    setEvents((prevEvents) => [...prevEvents, data]);
                })
                .catch((error) => console.error('Error adding event:', error));
        }
    };

    const handleEventClick = (clickInfo) => {
        setSelectedEvent(clickInfo.event);
        console.log("Asdfadsf", clickInfo.event);
        
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedEvent(null);
    };

    const handleEventDelete = () => {
        getEventList()
        .then((data) => {
            setEvents(data);
        })
        .catch((error) => console.error('Error getting events:', error));
    };

    return (
        <StyledCalendarDiv>
            <h1>Calendar</h1>
            <FullCalendar
                displayEventTime={false}
                height="750px"
                expandRows={true}
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
                events={events} 
                select={handleDateSelect}
                eventClick={handleEventClick}
            />
            {showModal && (
                <ConfirmModal
                    show={showModal}
                    event={selectedEvent}
                    onClose={handleCloseModal}
                    onUpdate={handleEventDelete}
                    onDelete={handleEventDelete}
                />
            )}
        </StyledCalendarDiv>
    );
};

export default Calendar;
