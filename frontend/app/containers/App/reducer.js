import { fromJS } from 'immutable';

import {
  INITIALIZE,
  INITIALIZE_SUCCESS,
  INITIALIZE_ERROR,
  SHOW_TOKEN_INVALID_MESSAGE,
  SHOW_DIALOG,
  CLIENT_SET,
  CLIENT_UNSET
} from 'containers/App/constants';

// The initial state of the App
const initialState = fromJS({
  initialized: false,
  tokenMessage: null,
  errors: {},
  id: null,
  token: null,
  dialog: null
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE:
      return state.set('initialized', false);
    case INITIALIZE_SUCCESS:
      return state.set('initialized', true);
    case SHOW_DIALOG:
      return state.set('dialog', action.dialog);
    case SHOW_TOKEN_INVALID_MESSAGE:
      return state.set('tokenMessage', 'Token is Invalid. Please login');
    case CLIENT_SET:
      return state.set('token', action.token).set('id', action.id);
    case CLIENT_UNSET:
      return state.set('id', null).set('token', null);
    case INITIALIZE_ERROR:
      return state.set('id', null).set('error', action.error);
    default:
      return state;
  }
}

export default appReducer;
