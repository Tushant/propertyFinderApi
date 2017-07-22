import {
	LOAD_PROPERTY_TYPE,
	LOAD_PROPERTY_TYPE_SUCCESS,
	LOAD_PROPERTY_TYPE_FAILURE
} from './constants';

import { fromJS } from 'immutable';
import reviver from 'utils/reviver';
const idReviver = reviver('_id', true);

const initialState = fromJS({
	requesting: false,
	typesOfProperty: {},
	response: {},
	error: null
});

function roomReducer(state = initialState, action) {
	switch (action.type) {
		case LOAD_PROPERTY_TYPE:
			return state.set('requesting', true).set('response', null).set('error', null);
		case LOAD_PROPERTY_TYPE_SUCCESS:
			return state
				.set('requesting', false)
				.set('typesOfProperty', action.typesOfProperty.data)
				.set('error', null);
		case LOAD_PROPERTY_TYPE_FAILURE:
			return state.set('requesting', false).set('error', action.error.data).set('response', null);
		default:
			return state;
	}
}

export default roomReducer;
