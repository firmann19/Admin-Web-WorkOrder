import {
    USER_LOGIN,
    USER_LOGOUT,
  } from "./constants";
  
  export function userLogin(token, user, email) {
    return {
      type: USER_LOGIN,
      token,
      user,
      email,
    };
  }
  
  export function userLogout() {
    localStorage.removeItem("auth");
    return {
      type: USER_LOGOUT,
    };
  }
  
  