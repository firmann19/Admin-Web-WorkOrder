import { USER_LOGIN, USER_LOGOUT } from "./constants";

export function userLogin(
  token,
  user,
  role,
  idUser,
  getManager,
  getNameManager,
  getCountWO,
  getCountUser,
  getCountDepartement,
  getCountGroup
) {
  return {
    type: USER_LOGIN,
    token,
    user,
    role,
    idUser,
    getManager,
    getNameManager,
    getCountWO,
    getCountUser,
    getCountDepartement,
    getCountGroup,
  };
}

export function userLogout() {
  localStorage.removeItem("auth");
  return {
    type: USER_LOGOUT,
  };
}
