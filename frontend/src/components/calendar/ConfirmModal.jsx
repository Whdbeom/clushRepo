import React from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { deleteEvent, updateEvent } from '../../services/api';
import { useState, useEffect } from 'react';

const modalStyles = {
    overlay: {
        backgroundColor: 'rgba(172, 172, 172, 0.4)',
        width: '100vw',
        height: '100vh',
        zIndex: 10,
        position: 'fixed',
        top: 0,
        left: 0,
      },
      content: {
        width: '500px',
        height: '700px',
        zIndex: 150,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '10px',
        boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
        backgroundColor: 'white',
        overflow: 'hidden',
        outline: 'none'
    },
};

const StyledConfirmModal = styled(ReactModal)`
    display: grid;
    width: 100%;
    grid-template-rows: 50px 550px 100px;
    background-color: #FAFAFA;

    & > div {
        width: 100%;
    }

    #modalHeader {
        /* background-color: red; */
        border-bottom: 1px solid black;
    } 

    #modalBody {
        
    }

    #modalFooter {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 16px;
        gap: 16px;
    }
`;

const Button = styled.button`
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    ${({ variant }) =>
        variant === 'primary' &&
        `
        background-color: #007bff;
        color: white;
    `}
    ${({ variant }) =>
        variant === 'danger' &&
        `
        background-color: #dc3545;
        color: white;
    `}
    ${({ variant }) =>
        variant === 'secondary' &&
        `
        background-color: #6c757d;
        color: white;
    `}
`;

const ConfirmModal = ({ show, event, onClose, onDelete, onUpdate}) => {

    const [formData, setFormData] = useState({
        title: '',
        startDate: '',
        endDate: '',
    });

    
    useEffect(() => {
        if (event) {
            setFormData({
                title: event.title,
                startDate: event.startStr.split('T')[0],
                endDate: event.endStr.split('T')[0],
            });
        }
    }, [event]);
    
    if (!event) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDelete = () => {
        const eventId = event.id;
        deleteEvent(eventId) 
            .then(() => {
                onDelete(); 
            })
            .catch((error) => {
                console.error("Error delete event:", error);
            });
        onClose();
    };

    const handleUpdate = () => {
        
        const updatedEvent = {
            id: event.id,
            title: formData.title,
            start: formData.startDate + "T00:00",
            end: formData.endDate + "T23:59",
        };
    

        updateEvent(updatedEvent)
        .then((updatedEventData) => {
            onUpdate(); 
        })
        .catch((error) => {
            console.error("Error update event:", error);
        });

        onClose();
    }

    return (
        <StyledConfirmModal   
            isOpen={show} 
            onRequestClose={onClose} 
            style={modalStyles} 
        >
            <div id='modalHeader'>
                <h3>일정 관리</h3>
            </div>
            <div id='modalBody'>
                <div>
                    <label>제목</label>
                    <input 
                        type="text" 
                        name="title"
                        value={formData.title} 
                        onChange={handleInputChange} 
                        placeholder="일정 제목을 입력하세요" 
                    />
                </div>
                <div className="date-info">
                    <label>시작일</label>
                    <input 
                        type="date" 
                        name="startDate"
                        value={formData.startDate} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div className="date-info">
                    <label>종료일</label>
                    <input 
                        type="date" 
                        name="endDate"
                        value={formData.endDate} 
                        onChange={handleInputChange} 
                    />
                </div>
            </div>
        
            <div id='modalFooter'>
                <Button variant="primary" onClick={handleUpdate}>
                    수정
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    삭제
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    취소
                </Button>
            </div>
        </StyledConfirmModal>
    );
};

export default ConfirmModal;
