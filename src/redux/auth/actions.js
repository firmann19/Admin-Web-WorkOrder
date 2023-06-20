import {
    USER_LOGIN,
    USER_LOGOUT,
  } from "./constants";
  
  export function userLogin(token, user, role, idUser) {
    return {
      type: USER_LOGIN,
      token,
      user,
      role,
      idUser
    };
  }
  
  export function userLogout() {
    localStorage.removeItem("auth");
    return {
      type: USER_LOGOUT,
    };
  }
  
  