import {
  START_FETCHING_USERS,
  SUCCESS_FETCHING_USERS,
  ERROR_FETCHING_USERS,
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

      dispatch(
        successFetchingUsers({
          events: res.data.data.getAll_users,
        })
      );
    } catch (error) {
      dispatch(errorFetchingUsers());
    }
  };
};
