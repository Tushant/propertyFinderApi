import {
  ANONYMOUS_AGENT,
  ANONYMOUS_AGENT_SUCCESS,
  ANONYMOUS_AGENT_FAILURE,
  ANONYMOUS_AGENT_DATA,
  ANONYMOUS_AGENT_DATA_SUCCESS,
  ANONYMOUS_AGENT_DATA_FAILURE
} from "./constants";

import { fromJS } from "immutable";

const initialState = fromJS({
  loading: false,
  response: {},
  anonymous_info: {},
  error: null
});

function anonymousAgentReferralReducer(state = initialState, action) {
  switch (action.type) {
    case ANONYMOUS_AGENT:
    case ANONYMOUS_AGENT_DATA:
      return state.set("loading", true).set("response", null);
    case ANONYMOUS_AGENT_SUCCESS:
      return state.set("loading", false).set("response", action.response.data);
    case ANONYMOUS_AGENT_DATA_SUCCESS:
      return state
        .set("loading", false)
        .set("anonymous_info", action.anonymous_info.data)
        .set("response", null);
    case ANONYMOUS_AGENT_FAILURE:
    case ANONYMOUS_AGENT_DATA_FAILURE:
      return state
        .set("loading", false)
        .set("error", action.error.data)
        .set("response", null);
    default:
      return state;
  }
}

export default anonymousAgentReferralReducer;
