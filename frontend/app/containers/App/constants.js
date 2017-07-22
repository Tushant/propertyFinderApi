export const INITIALIZE = 'XcelTrip/App/INITIALIZE';
export const INITIALIZE_SUCCESS = 'XcelTrip/App/INITIALIZE_SUCCESS';
export const INITIALIZE_ERROR = 'XcelTrip/App/INITIALIZE_ERROR';
export const LOAD_USER_PROFILE_SUCCESS = 'XcelTrip/App/LOAD_USER_PROFILE_SUCCESS';
export const SHOW_TOKEN_INVALID_MESSAGE = 'XcelTrip/App/SHOW_TOKEN_INVALID_MESSAGE';
export const SHOW_DIALOG = 'XcelTrip/App/SHOW_DIALOG';
export const CLIENT_SET = 'XcelTrip/App/CLIENT_SET';
export const CLIENT_UNSET = 'XcelTrip/App/CLIENT_UNSET';

export const API_BASE =
	process.env.NODE_ENV === 'production'
		? 'http://localhost:8000/api/v1/'
		: 'http://localhost:8000/api/v1/';

export const DEFAULT_LOCALE = 'en';
