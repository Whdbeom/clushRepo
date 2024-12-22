package org.example.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.backend.entity.Event;
import org.example.backend.service.EventService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class EventControllerTest {

    private MockMvc mockMvc;

    @Mock
    private EventService eventService;

    @InjectMocks
    private EventController eventController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(eventController).build();
    }

    @Test
    void testGetEvents() throws Exception {
        Event event1 = new Event();
        event1.setId(1L);
        event1.setTitle("Event 1");

        Event event2 = new Event();
        event2.setId(2L);
        event2.setTitle("Event 2");

        List<Event> eventList = Arrays.asList(event1, event2);
        when(eventService.getAllEvents()).thenReturn(eventList);

        mockMvc.perform(get("/api/calendar"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Event 1"))
                .andExpect(jsonPath("$[1].title").value("Event 2"));
    }

    @Test
    void testCreateEvent() throws Exception {
        Event newEvent = new Event();
        newEvent.setTitle("New Event");

        Event savedEvent = new Event();
        savedEvent.setId(1L);
        savedEvent.setTitle("New Event");

        when(eventService.createEvent(any(Event.class))).thenReturn(savedEvent);

        mockMvc.perform(post("/api/calendar")
                        .contentType("application/json")
                        .content(new ObjectMapper().writeValueAsString(newEvent)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("New Event"));
    }

    @Test
    void testDeleteEvent() throws Exception {
        Long eventId = 1L;
        doNothing().when(eventService).deleteEvent(eventId);

        mockMvc.perform(delete("/api/calendar/{id}", eventId))
                .andExpect(status().isNoContent());

        verify(eventService, times(1)).deleteEvent(eventId);
    }


}
