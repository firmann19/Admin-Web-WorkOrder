import { USER_LOGIN, USER_LOGOUT } from "./constants";

let initialState = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : { token: null, user: null, role: null, idUser: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        token: action.token,
        user: action.user,
        role: action.role,
        idUser: action.idUser,
      };

    case USER_LOGOUT:
      return { token: null, user: null, role: null, idUser: null };

    default:
      return state;
  }
}
