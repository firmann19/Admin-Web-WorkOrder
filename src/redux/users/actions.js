import {
  START_FETCHING_USERS,
  SUCCESS_FETCHING_USERS,
  ERROR_FETCHING_USERS,
  SET_DEPARTEMENT,
  SET_GROUP,
} from "./constants";

import { getData } from "../../utils/fetch";
import debounce from "debounce-promise";
import { clearNotif } from "../notif/actions";

let debouncedFetchUsers = debounce(getData, 1000);

export const startFetchingUsers = () => {
  return {
    type: START_FETCHING_USERS,
  };
};

export const successFetchingUsers = ({ users }) => {
  return {
    type: SUCCESS_FETCHING_USERS,
    users,
  };
};

export const errorFetchingUsers = () => {
  return {
    type: ERROR_FETCHING_USERS,
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch(startFetchingUsers());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 5000);

      let res = await debouncedFetchUsers("/user");
      console.log("test", res)

      for (const element of res.data.data.getAll_users) {
        element.posisi = element.Posisi.jabatan;
        element.role = element.Role.roleEmploye;
        element.departmentName = element.Departement.nama;
        element.groupName = element.Group.nama;
      };
      
      dispatch(
        successFetchingUsers({
          users: res.data.data.getAll_users,
        })
      );
    } catch (error) {
      dispatch(errorFetchingUsers());
    }
  };
};

export const setDepartement = (departement) => {
  return {
    type: SET_DEPARTEMENT,
    departement,
  };
};

export const setGroup = (group) => {
  return {
    type: SET_GROUP,
    group,
  };
};
