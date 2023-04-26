/* eslint-disable no-undef */
import debounce from "debounce-promise";
import { getData } from "../../utils/fetch";
import {
  ERROR_FETCHING_LISTS_DEPARTEMENT,
  ERROR_FETCHING_LISTS_GROUP,
  ERROR_FETCHING_LISTS_USER,
  START_FETCHING_LISTS_DEPARTEMENT,
  START_FETCHING_LISTS_GROUP,
  START_FETCHING_LISTS_USER,
  SUCCESS_FETCHING_LISTS_DEPARTEMENT,
  SUCCESS_FETCHING_LISTS_GROUP,
  SUCCESS_FETCHING_LISTS_USER,
} from "./constants";

let debouncedFetchListsDepartement = debounce(getData, 1000);
let debouncedFetchListsGroup = debounce(getData, 1000);
let debouncedFetchListsUser = debounce(getData, 1000);

// Departement

export const startFetchingListsDepartement = () => {
  return {
    type: START_FETCHING_LISTS_DEPARTEMENT,
  };
};

export const successFetchingListsDepartement = ({ departements }) => {
  return {
    type: SUCCESS_FETCHING_LISTS_DEPARTEMENT,
    departements,
  };
};

export const errorFetchingListsDepartement = () => {
  return {
    type: ERROR_FETCHING_LISTS_DEPARTEMENT,
  };
};

export const fetchListsDepartement = () => {
  return async (dispatch) => {
    dispatch(startFetchingListsDepartement());

    try {
      let res = await debouncedFetchListsDepartement("/departement");

      let _temp = [];

      res.data.data.getAll_users.forEach((res) => {
        _temp.push({
          value: res.id,
          label: res.nama,
          target: { value: res.id, name: "departement" },
        });
      });

      dispatch(
        successFetchingListsDepartement({
          departements: _temp,
        })
      );
    } catch (error) {
      dispatch(errorFetchingListsDepartement());
    }
  };
};

// Group

export const startFetchingListsGroup = () => {
  return {
    type: START_FETCHING_LISTS_GROUP,
  };
};

export const successFetchingListsGroup = ({ groups }) => {
  return {
    type: SUCCESS_FETCHING_LISTS_GROUP,
    groups,
  };
};

export const errorFetchingListsGroup = () => {
  return {
    type: ERROR_FETCHING_LISTS_GROUP,
  };
};

export const fetchListsGroup = () => {
  return async (dispatch) => {
    dispatch(startFetchingListsGroup());

    try {
      let res = await debouncedFetchListsGroup("/group");

      let _temp = [];

      res.data.data.forEach((res) => {
        _temp.push({
          value: res.id,
          label: res.nama,
          target: { value: res.id, name: "group" },
        });
      });

      dispatch(successFetchingListsGroup({ groups: _temp }));
    } catch (error) {
      dispatch(errorFetchingListsGroup());
    }
  };
};

// User

export const startFetchingListsUser = () => {
  return {
    type: START_FETCHING_LISTS_USER,
  };
};

export const successFetchingListsUser = ({ users }) => {
  return {
    type: SUCCESS_FETCHING_LISTS_USER,
    users,
  };
};

export const errorFetchingListsUser = () => {
  return {
    type: ERROR_FETCHING_LISTS_USER,
  };
};

export const fetchListsUser = () => {
  return async (dispatch) => {
    dispatch(startFetchingListsUser());

    try {
      let res = await debouncedFetchListsUser("/user");

      let _temp = [];

      res.data.data.getAll_users.forEach((res) => {
        _temp.push({
          value: res.id,
          label: res.name,
          target: {value: res.id, name: "user"}
        });
      });

      dispatch(
        successFetchingListsUser({
          users: _temp,
        })
      );
    } catch (error) {
      dispatch(errorFetchingListsUser());
    }
  };
};
