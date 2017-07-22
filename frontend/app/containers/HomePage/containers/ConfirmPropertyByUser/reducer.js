import {
  LOAD_MY_INFO,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  UPDATE_MY_INFO,
  UPDATE_MY_INFO_SUCCESS,
  UPDATE_MY_INFO_FAILURE
} from "./constants";

import { fromJS } from "immutable";

const initialState = fromJS({
  requesting: false,
  myInfo: {},
  response: {},
  error: null
});

function myInfoReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_MY_INFO:
    case UPDATE_MY_INFO:
      return state
        .set("requesting", true)
        .set("response", null)
        .set("error", null);
    case LOAD_MY_INFO_SUCCESS:
      return state.set("requesting", false).set("myInfo", action.myInfo.data);
    case UPDATE_MY_INFO_SUCCESS:
      return state
        .set("requesting", false)
        .set("response", action.response.data);
    case LOAD_MY_INFO_FAILURE:
    case UPDATE_MY_INFO_FAILURE:
      return state
        .set("requesting", false)
        .set("error", action.error.data)
        .set("response", null);
    default:
      return state;
  }
}

export default myInfoReducer;
