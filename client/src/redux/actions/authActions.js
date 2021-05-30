import { LOGOUT, LOGIN } from "../types";
import axios from "axios";

export const login = (loginDetails) => async (dispatch) => {
  console.log("HELLOSFPOIN");
  try {
    let res = await axios.post(
      `${process.env.REACT_APP_AUTH_API_URL}/auth/login`,
      loginDetails,
      { withCredentials: true, credentials: "include" }
    );
    console.log(res);
    if (res.status === 200) {
      dispatch({ type: LOGIN, payload: res.data });
      // window.location = "/myProfile";
    }

    // if (res.status !== 200) {
    //   M.toast({ html: res.data.msg });
    // }
  } catch (err) {
    // console.log(err.response.data);
  }
};

export const logout = () => async (dispatch) => {
  try {
    let res = await axios.get(
      `${process.env.REACT_APP_AUTH_API_URL}/auth/logout`,
      { withCredentials: true, credentials: "include" }
    );
    if (res.status === 200) {
      dispatch({ type: LOGOUT });

      // window.location = "/login";
    }
  } catch (err) {
    console.log(err);
  }
};

export const register = () => async (dispatch) => {};
