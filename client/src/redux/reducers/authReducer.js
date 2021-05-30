import {
  UPDATE_USER,
  SET_USER,
  CLEAR_USER,
  LOGIN,
  LOGOUT,
  REGISTER,
} from "../types";

const initialState = {
  user: {},
  isAuthenticated: false,
  token: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      console.log("I AM HERE");
      console.log(action);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.access_token,
        isAuthenticated: true,
      };
    case LOGOUT:
      console.log("LOGGING OUT");
      return {
        ...state,
        user: {},
        token: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
