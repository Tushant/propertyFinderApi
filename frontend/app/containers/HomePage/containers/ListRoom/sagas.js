import React from 'react';
import { call, takeLatest, fork, put, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import { propertyTypesLoaded, propertyTypesLoadingError } from './actions';

import {
	LOAD_PROPERTY_TYPE,
	LOAD_PROPERTY_TYPE_SUCCESS,
	LOAD_PROPERTY_TYPE_FAILURE
} from './constants';

import { XcelTrip } from 'containers/App/sagas';

function* fetchTypeOfProperties(action) {
	yield call(XcelTrip.get('property/type/', propertyTypesLoaded, propertyTypesLoadingError));
}

function* roomWatcher() {
	yield takeLatest(LOAD_PROPERTY_TYPE, fetchTypeOfProperties);
}

export default [roomWatcher];
