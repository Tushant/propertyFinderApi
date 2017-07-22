import { createSelector } from 'reselect';

const selectRoomState = state => {
	return state.get('roomReducer');
};

const makeSelectTypeofProperty = () =>
	createSelector(selectRoomState, roomState => roomState.get('typesOfProperty'));

const makeSelectRoomSuccessResponse = () =>
	createSelector(selectRoomState, roomState => roomState.get('response'));
const makeSelectRoomErrorResponse = () =>
	createSelector(selectRoomState, roomState => roomState.get('error'));

export { makeSelectTypeofProperty, makeSelectRoomSuccessResponse, makeSelectRoomErrorResponse };
