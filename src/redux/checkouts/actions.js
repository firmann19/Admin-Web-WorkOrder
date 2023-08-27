import { getData } from "../../utils/fetch";
import debounce from "debounce-promise";
import { clearNotif } from "../notif/actions";
import {
  ERROR_FETCHING_CHECKOUTS,
  START_FETCHING_CHECKOUTS,
  SUCCESS_FETCHING_CHECKOUTS,
} from "./constants";

let debouncedFetchCheckouts = debounce(getData, 1000);

export const startFetchingCheckouts = () => {
  return {
    type: START_FETCHING_CHECKOUTS,
  };
};

export const successFetchingCheckouts = ({ checkouts }) => {
  return {
    type: SUCCESS_FETCHING_CHECKOUTS,
    checkouts,
  };
};

export const errorFetchingCheckouts = () => {
  return {
    type: ERROR_FETCHING_CHECKOUTS,
  };
};

export const fetchCheckouts = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingCheckouts());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 5000);

     /* let params = {
        page: getState().checkouts?.page || 0,
        size: getState().checkouts?.size || 5,
      }; */

      let res = await debouncedFetchCheckouts("/checkout", /*params*/);
      console.log("test", res);

      for (const element of res.data.data) {
        element.fullName = element.userRequest.name;
        element.departmentName = element.Departement.nama;
      };

      /* let _temp = [];

      res.data.data.checkouts.forEach((res) => {
        _temp.push({
          namaBarang: res.namaBarang,
          kodeBarang: res.kodeBarang,
          permasalahan: res.permasalahan,
          tindakan: res.tindakan,
          gantiSparepart: res.gantiSparepart,
          UserRequestId: res.UserRequestId,
          DepartUserId: res.DepartUserId,
          UserApproveId: res.UserApproveId,
          StatusWO: res.StatusWO,
          date_requestWO: res.date_requestWO,
          StatusPengerjaan: res.StatusPengerjaan,
          date_completionWO: res.date_completionWO,
        });
      }); */

      dispatch(
        successFetchingCheckouts({
          checkouts: res.data.data
          //checkouts: _temp,
          //pages: res.data.data.pages,
        })
      );
    } catch (error) {
      dispatch(errorFetchingCheckouts());
    }
  };
};
