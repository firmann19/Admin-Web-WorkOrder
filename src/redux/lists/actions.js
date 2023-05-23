/* eslint-disable no-undef */
import debounce from "debounce-promise";
import { getData } from "../../utils/fetch";
import {
  ERROR_FETCHING_LISTS_DEPARTEMENT,
  ERROR_FETCHING_LISTS_GROUP,
  ERROR_FETCHING_LISTS_HeadIT,
  START_FETCHING_LISTS_DEPARTEMENT,
  START_FETCHING_LISTS_GROUP,
  START_FETCHING_LISTS_HeadIT,
  SUCCESS_FETCHING_LISTS_DEPARTEMENT,
  SUCCESS_FETCHING_LISTS_GROUP,
  SUCCESS_FETCHING_LISTS_HeadIT,
} from "./constants";

let debouncedFetchListsDepartement = debounce(getData, 1000);
let debouncedFetchListsGroup = debounce(getData, 1000);
let debouncedFetchListsHeadIT = debounce(getData, 1000);

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

      res.data.data.getAll_departement.forEach((res) => {
        _temp.push({
          value: res.id,
          label: res.nama,
          target: { value: res.id, name: "DepartementId" },
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

      res.data.data.getAll_group.forEach((res) => {
        _temp.push({
          value: res.id,
          label: res.nama,
          target: { value: res.id, name: "GroupId" },
        });
      });

      dispatch(successFetchingListsGroup({ groups: _temp }));
    } catch (error) {
      dispatch(errorFetchingListsGroup());
    }
  };
};

// User

export const startFetchingListsHeadIT = () => {
  return {
    type: START_FETCHING_LISTS_HeadIT,
  };
};

export const successFetchingListsHeadIT = ({ HeadIT }) => {
  return {
    type: SUCCESS_FETCHING_LISTS_HeadIT,
    HeadIT,
  };
};

export const errorFetchingListsHeadIT = () => {
  return {
    type: ERROR_FETCHING_LISTS_HeadIT,
  };
};

export const fetchListsHeadIT = () => {
  return async (dispatch) => {
    dispatch(startFetchingListsHeadIT());

    try {
      let res = await debouncedFetchListsHeadIT("/getAllApprove");

      let _temp = [];

      res.data.data.getAllApprove_users.forEach((res) => {
        _temp.push({
          value: res.id,
          label: res.name,
          target: {value: res.id, name: "HeadITid"}
        });
      });

      dispatch(
        successFetchingListsHeadIT({
          HeadIT: _temp,
        })
      );
    } catch (error) {
      dispatch(errorFetchingListsHeadIT());
    }
  };
};
