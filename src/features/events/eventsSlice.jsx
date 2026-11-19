
import { createSlice } from "@reduxjs/toolkit";
import demoEvents from "../../data/demoEvents";

const loadEvents = () => {
  try {
    const savedEvents = localStorage.getItem("events");
    return savedEvents ? JSON.parse(savedEvents) : demoEvents;
  } catch (error) {
    console.error("Error loading events:", error);
    return demoEvents;
  }
};

const saveEvents = (events) => {
  try {
    localStorage.setItem("events", JSON.stringify(events));
  } catch (error) {
    console.error("Error saving events:", error);
  }
};

const initialState = {
  events: loadEvents(),
};

const eventSlice = createSlice({
  name: "events",
  initialState,

  reducers: {
    addEvent: (state, action) => {
      state.events.push(action.payload);
      saveEvents(state.events);
    },

    updateEvent: (state, action) => {
      const index = state.events.findIndex(
        (event) => String(event.id) === String(action.payload.id)
      );

      if (index !== -1) {
        state.events[index] = {
          ...state.events[index],
          ...action.payload,
        };

        saveEvents(state.events);
      }
    },

    deleteEvent: (state, action) => {
      state.events = state.events.filter(
        (event) => String(event.id) !== String(action.payload)
      );

      saveEvents(state.events);
    },
  },
});

export const { addEvent, updateEvent, deleteEvent } = eventSlice.actions;

export default eventSlice.reducer;
