import React from "react";
import {
  take,
  takeLatest,
  call,
  fork,
  cancel,
  put,
  select
} from "redux-saga/effects";
import { LOCATION_CHANGE, push } from "react-router-redux";

import {
  ANONYMOUS_AGENT,
  ANONYMOUS_AGENT_SUCCESS,
  ANONYMOUS_AGENT_FAILURE,
  ANONYMOUS_AGENT_DATA,
  ANONYMOUS_AGENT_DATA_SUCCESS,
  ANONYMOUS_AGENT_DATA_FAILURE
} from "./constants";
import { makeSelectLocation } from "containers/App/selectors";
import { showDialog } from "containers/App/actions";
import Login from "containers/Login";
import {
  anonymousagentApplied,
  anonymousagentApplicationFailure,
  anonymousAgentDataLoaded,
  anonymousAgentDataLoadingError
} from "./actions";
import { XcelTrip } from "containers/App/sagas";

function* redirectOnReferralSuccess() {
  const action = yield take(ANONYMOUS_AGENT_SUCCESS);
  yield put(showDialog(<Login />));
}

function* anonymousAgent(action) {
  const anonymous_imp_info = action.anonymous_agent;
  const referral_id = action.anonymous_agent.refer_code;
  const successWatcher = yield fork(redirectOnReferralSuccess);
  yield call(
    XcelTrip.post(
      `api/imp/new/referral/${referral_id}`,
      anonymousagentApplied,
      anonymousagentApplicationFailure,
      anonymous_imp_info
    )
  );
  yield take([LOCATION_CHANGE, ANONYMOUS_AGENT_FAILURE]);
  yield cancel(successWatcher);
}

function* fetchAnonymousAgentData(action) {
  // const state = yield select(makeSelectLocation());
  yield call(
    XcelTrip.get(
      `api/imp/new/referral/${action.referralId}`,
      anonymousAgentDataLoaded,
      anonymousAgentDataLoadingError
    )
  );
}

function* anonymousAgentApplicationWatcher() {
  yield takeLatest(ANONYMOUS_AGENT, anonymousAgent);
  yield takeLatest(ANONYMOUS_AGENT_DATA, fetchAnonymousAgentData);
}

export default [anonymousAgentApplicationWatcher];
