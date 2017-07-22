import {
  INITIALIZE,
  INITIALIZE_SUCCESS,
  INITIALIZE_ERROR,
  LOAD_USER_PROFILE_SUCCESS,
  SHOW_TOKEN_INVALID_MESSAGE,
  CLIENT_SET,
  CLIENT_UNSET,
  SHOW_DIALOG
} from './constants';

export function loadInitialData() {
  return {
    type: INITIALIZE
  };
}

export function loadInitialDataSuccess() {
  return {
    type: INITIALIZE_SUCCESS
  };
}

export function loadInitialDataError(error) {
  return {
    type: INITIALIZE_ERROR,
    error
  };
}

export function loadUserProfileSuccess() {
  return {
    type: LOAD_USER_PROFILE_SUCCESS,
    user
  };
}

export function showTokenisInvalid() {
  return {
    type: SHOW_TOKEN_INVALID_MESSAGE
  };
}

export function setClient(token) {
  return {
    type: CLIENT_SET,
    token
  };
}

export function unsetClient() {
  return {
    type: CLIENT_UNSET
  };
}

export function showDialog(dialog) {
  return {
    type: SHOW_DIALOG,
    dialog
  };
}
