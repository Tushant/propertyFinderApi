import {
  LOAD_MY_INFO,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  UPDATE_MY_INFO,
  UPDATE_MY_INFO_SUCCESS,
  UPDATE_MY_INFO_FAILURE
} from "./constants";

import action from "utils/action";

export const getMyInfo = action(LOAD_MY_INFO, "id");
export const myInfoLoaded = action(LOAD_MY_INFO_SUCCESS, "myInfo");
export const myInfoLoadingError = action(LOAD_MY_INFO_FAILURE, "error");

export const updateMyInfo = action(UPDATE_MY_INFO, "myInfo", "token");
export const myInfoUpdated = action(UPDATE_MY_INFO_SUCCESS, "response");
export const myInfoUpdatingError = action(UPDATE_MY_INFO_FAILURE, "error");
