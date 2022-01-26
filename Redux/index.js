const { createSlice, configureStore } = require("@reduxjs/toolkit");

const initialState = {
  theme: "dark",
  scroll: 0,
  language: "tr",
  notification: null,
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialState.theme,
  reducers: {
    setTheme(state, action) {
      return action.payload;
    },
    toggleTheme(state) {
      return state === "dark" ? "light" : "dark";
    },
  },
});

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState.notification,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    hideNotification() {
      return null;
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
export const { setNotification, hideNotification } = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
const rootReducer = {
  theme: themeReducer,
  notification: notificationReducer,
};

export const store = configureStore({ reducer: rootReducer });
