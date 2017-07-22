import { createSelector } from "reselect";

const selectAnonymousAgent = state => {
  return state.get("anonymousAgentReferralReducer");
};

const makeSelectAnonymousAgentInfo = () =>
  createSelector(selectAnonymousAgent, anonymousAgentState =>
    anonymousAgentState.get("anonymous_info")
  );

const makeSelectAnonymousAgentSuccessResponse = () =>
  createSelector(selectAnonymousAgent, anonymousAgentState =>
    anonymousAgentState.get("response")
  );
const makeSelectAnonymousAgentErrorResponse = () =>
  createSelector(selectAnonymousAgent, anonymousAgentState =>
    anonymousAgentState.get("error")
  );

export {
  makeSelectAnonymousAgentInfo,
  makeSelectAnonymousAgentSuccessResponse,
  makeSelectAnonymousAgentErrorResponse
};
