
import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "../features/events/eventsSlice";
import authReducer from "../features/auth/authSlice"

const store = configureStore({
  reducer: {
    events: eventReducer,
    auth: authReducer,
    },
});

// Save Redux state whenever it changes
store.subscribe(() => {
  const events = store.getState().events.events;
  localStorage.setItem("events", JSON.stringify(events));
});

export default store;
