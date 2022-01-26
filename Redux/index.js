const { createSlice, configureStore } = require("@reduxjs/toolkit");

const initialState = {
  theme: "dark",
  scroll: 0,
  language: "tr",
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

export const { setTheme, toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
const rootReducer = {
  theme: themeReducer,
};

export const store = configureStore({ reducer: rootReducer });
