import { createSlice } from "@reduxjs/toolkit";

let previous = undefined;

const notificationVariant = "success";
const errorVariant = "danger";

const hideStyle = {
  display: "none",
};

const initialState = {
  message: "",
  variant: hideStyle,
  style: {
    display: 'none'
  }
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotification(state, action) {
      return {
        message: action.payload.message,
        variant: action.payload.isError ? errorVariant : notificationVariant,
        style: {display: ''}
      };
    },

    hideNotification(state) {
      return { ...state, style: hideStyle };
    },
  },
});

export const setNotification = (message, isError, seconds) => {
  clearTimeout(previous);
  const ms = seconds * 1000;
  return async (dispatch) => {
    dispatch(createNotification({ message, isError }));
    previous = setTimeout(() => {
      dispatch(hideNotification());
    }, ms);
  };
};

export const { createNotification, hideNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
