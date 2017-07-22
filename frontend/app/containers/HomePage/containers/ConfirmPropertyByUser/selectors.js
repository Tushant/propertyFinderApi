import { createSelector } from "reselect";

const selectMyInfoState = state => {
  return state.get("myInfoReducer");
};

const makeSelectMyInfo = () =>
  createSelector(selectMyInfoState, myInfoState => myInfoState.get("myInfo"));

const makeSelectMyInfoSuccessResponse = () =>
  createSelector(selectMyInfoState, myInfoState => myInfoState.get("response"));

const makeSelectMyInfoErrorResponse = () =>
  createSelector(selectMyInfoState, myInfoState => myInfoState.get("error"));

export {
  makeSelectMyInfo,
  makeSelectMyInfoSuccessResponse,
  makeSelectMyInfoErrorResponse
};
