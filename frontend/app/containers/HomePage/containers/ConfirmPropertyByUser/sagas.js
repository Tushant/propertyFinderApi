import React from "react";
import { call, takeLatest, fork, put, take, cancel } from "redux-saga/effects";
import { LOCATION_CHANGE, push } from "react-router-redux";

import {
  myInfoLoaded,
  myInfoLoadingError,
  myInfoUpdated,
  myInfoUpdatingError
} from "./actions";

import {
  LOAD_MY_INFO,
  UPDATE_MY_INFO,
  UPDATE_MY_INFO_SUCCESS,
  UPDATE_MY_INFO_FAILURE
} from "./constants";

import { XcelTrip } from "containers/App/sagas";

// const token = JSON.parse(localStorage.getItem("user"))["token"];

// function* redirectOnSuccess() {
//   const action = yield take(LIST_FEATURE_SUCCESS);
//   yield put(showDialog(null));
// }

function* fetchMyInfo(action) {
  yield call(
    XcelTrip.get(
      `api/property/contact-info/${action.id}`,
      myInfoLoaded,
      myInfoLoadingError
    )
  );
}

function* updateMyInfo(action) {
  const myInfo = action.myInfo;
  yield call(
    XcelTrip.post(
      `api/property/contact-user-register/${action.token}`,
      myInfoUpdated,
      myInfoUpdatingError,
      myInfo
    )
  );
}

function* myInfoWatcher() {
  yield takeLatest(LOAD_MY_INFO, fetchMyInfo);
  yield takeLatest(UPDATE_MY_INFO, updateMyInfo);
}

export default [myInfoWatcher];
