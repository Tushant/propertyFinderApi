import {
  ANONYMOUS_AGENT,
  ANONYMOUS_AGENT_SUCCESS,
  ANONYMOUS_AGENT_FAILURE,
  ANONYMOUS_AGENT_DATA,
  ANONYMOUS_AGENT_DATA_SUCCESS,
  ANONYMOUS_AGENT_DATA_FAILURE
} from "./constants";

import action from "utils/action";

export const anonymousAgentApplication = action(
  ANONYMOUS_AGENT,
  "anonymous_agent"
);
export const anonymousagentApplied = action(
  ANONYMOUS_AGENT_SUCCESS,
  "response"
);
export const anonymousagentApplicationFailure = action(
  ANONYMOUS_AGENT_FAILURE,
  "error"
);

export const loadAnonymousAgentData = action(
  ANONYMOUS_AGENT_DATA,
  "referralId"
);
export const anonymousAgentDataLoaded = action(
  ANONYMOUS_AGENT_DATA_SUCCESS,
  "anonymous_info"
);
export const anonymousAgentDataLoadingError = action(
  ANONYMOUS_AGENT_DATA_FAILURE,
  "error"
);
