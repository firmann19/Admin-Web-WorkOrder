import { USER_LOGIN, USER_LOGOUT } from "./constants";

let initialState = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : {
      token: null,
      user: null,
      role: null,
      idUser: null,
      getManager: null,
      getNameManager: null,
      getCountWO: null,
      getCountUser: null,
      getCountDepartement: null,
      getCountGroup: null,
    };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        token: action.token,
        user: action.user,
        role: action.role,
        idUser: action.idUser,
        getManager: action.getManager,
        getNameManager: action.getNameManager,
        getCountWO: action.getCountWO,
        getCountUser: action.getCountUser,
        getCountDepartement: action.getCountDepartement,
        getCountGroup: action.getCountGroup,
      };

    case USER_LOGOUT:
      return {
        token: null,
        user: null,
        role: null,
        idUser: null,
        getManager: null,
        getNameManager: null,
        getCountWO: null,
        getCountUser: null,
        getCountDepartement: null,
        getCountGroup: null,
      };

    default:
      return state;
  }
}
