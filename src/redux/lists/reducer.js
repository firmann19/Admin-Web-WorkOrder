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

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  departements: [],
  statusDepartements: statuslist.idle,
  groups: [],
  statusGroups: statuslist.idle,
  users: [],
  statusUsers: statuslist.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_LISTS_DEPARTEMENT:
      return { ...state, statusDepartements: statuslist.process };

    case ERROR_FETCHING_LISTS_DEPARTEMENT:
      return { ...state, statusDepartements: statuslist.error };

    case SUCCESS_FETCHING_LISTS_DEPARTEMENT:
      return {
        ...state,
        statusDepartements: statuslist.success,
        departements: action.departements,
      };

    case START_FETCHING_LISTS_GROUP:
      return { ...state, statusGroups: statuslist.process };

    case ERROR_FETCHING_LISTS_GROUP:
      return { ...state, statusGroups: statuslist.error };

    case SUCCESS_FETCHING_LISTS_GROUP:
      return {
        ...state,
        statusGroups: statuslist.success,
        groups: action.groups,
      };

    case START_FETCHING_LISTS_USER:
      return { ...state, statusUsers: statuslist.process };

    case ERROR_FETCHING_LISTS_USER:
      return {
        ...state,
        statusUsers: statuslist.error,
      };

    case SUCCESS_FETCHING_LISTS_USER:
      return {
        ...state,
        statusGroups: statuslist.success,
        users: action.users,
      };

    default:
      return state;
  }
}
