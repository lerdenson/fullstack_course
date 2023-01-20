import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import { setToken } from "../services/blogs";

const initialState = {user: null, message: null};

const authSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      return action.payload;
    },
  },
});

export const getUserFromBrowser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setToken(user.token);
      dispatch(setCurrentUser({ user, message: null }));
    }
  };
};

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setToken(user.token);
      await dispatch(
        setCurrentUser({
          user,
          message: { text: `welcome ${user.name}!`, isError: false },
        })
      );
    } catch (e) {
      await dispatch(
        setCurrentUser({
          user: null,
          message: { text: e.response.data.error, isError: true },
        })
      );
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedUser");
    setToken(null);
    dispatch(setCurrentUser({user: null, message: null}));
  };
};

export const { setCurrentUser } = authSlice.actions;

export default authSlice.reducer;
