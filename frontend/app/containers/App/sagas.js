import React from 'react';
import { request, requestJSON } from 'utils/request';
import { takeLatest, take, call, put, fork, cancel, select } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import ObjectToFormData from 'utils/objectToFormData';
import { makeSelectUser } from 'containers/App/selectors';

import {
	loadInitialDataSuccess,
	loadInitialDataError,
	showDialog,
	loadUserProfileSuccess
} from 'containers/App/actions';

import {
	API_BASE,
	INITIALIZE,
	INITIALIZE_SUCCESS,
	INITIALIZE_ERROR,
	LOAD_USER_PROFILE_SUCCESS
} from 'containers/App/constants';
import { delay } from 'redux-saga';

export class XcelTrip {
	/**
   * Generic api data loader
   */
	static dataLoader(apiUri, onSuccess, onError, data, metaData, ...actionArguments) {
		return function*() {
			// eslint-disable-line func-names
			const requestURL = `${API_BASE}${apiUri}`;
			try {
				let options;
				if (data !== undefined) {
					// If we have data to post
					const stringifiedData = JSON.stringify(data);
					options = {
						method: data._id ? 'PUT' : 'POST',
						body: JSON.stringify(data),
						headers: {
							'Content-Type': 'application/json',
							'X-Requested-With': 'XMLHttpRequest',
							'Access-Control-Allow-Origin': '*'
						}
					};
				} else {
					options = {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'X-Requested-With': 'XMLHttpRequest',
							'Access-Control-Allow-Origin': 'http://localhost:3000',
							'Access-Control-Allow-Credentials': 'true'
						}
					};
				}
				const response = yield call(requestJSON, requestURL, options);

				yield put(onSuccess(response, data, metaData, ...actionArguments));
			} catch (e) {
				let error = null;
				try {
					error = yield call(() => e.response.json());
				} catch (_) {
					error = {
						errors: [
							{
								code: e.response.status,
								msg: e.response.statusText
							}
						]
					};
				}
				yield put(onError(error, ...actionArguments));
				yield put({ type: INITIALIZE_ERROR, error });
			}
		};
	}

	static multipartPost(apiUri, onSuccess, onError, data, document, ...actionArguments) {
		return function*() {
			const requestURL = `${API_BASE}${apiUri}`;
			let multipartData = new FormData();
			multipartData = ObjectToFormData(data, multipartData);
			multipartData.append('file', document);
			try {
				const options = {
					method: data._id ? 'PUT' : 'POST',
					body: multipartData,
					headers: {
						processData: false,
						// 'Content-Type': 'multipart/form-data',
						contentType: false,
						'X-Requested-With': 'XMLHttpRequest'
					}
				};
				const response = yield call(request, requestURL, options);
				yield put(onSuccess(response, actionArguments));
			} catch (e) {
				let error = null;
				try {
					error = yield call(() => e.response.json());
				} catch (_) {
					error = {
						errors: [
							{
								code: e.response.status,
								msg: e.response.statusText
							}
						]
					};
				}
				yield put(onError(error, ...actionArguments));
			}
		};
	}

	static get(apiUri, onSuccess, onError, ...actionArguments) {
		return this.dataLoader(apiUri, onSuccess, onError, undefined, ...actionArguments);
	}

	/*
   * Shorthand POST function
   */
	static post(apiUri, onSuccess, onError, data, metaData, ...actionArguments) {
		return this.dataLoader(apiUri, onSuccess, onError, data, token, metaData, ...actionArguments);
	}

	static put(apiUri, onSuccess, onError, data, ...actionArguments) {
		return this.dataLoader(apiUri, onSuccess, onError, data, ...actionArguments);
	}

	static patch(apiUri, onSuccess, onError, ...actionArguments) {
		return function*() {
			// eslint-disable-line func-names
			const requestURL = `${API_BASE}${apiUri}`;
			try {
				// Call our request helper (see 'utils/request')
				const options = {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						'X-Requested-With': 'XMLHttpRequest'
					}
				};
				const response = yield call(request, requestURL, options);
				yield put(onSuccess(response, actionArguments));
				// yield call(request, requestURL, options);
				// yield put(onSuccess(actionArguments));
			} catch (e) {
				let error = null;
				try {
					error = yield call(() => e.response.json());
				} catch (_) {
					error = {
						errors: [
							{
								code: e.response.status,
								msg: e.response.statusText
							}
						]
					};
				}
				yield put(onError(error, ...actionArguments));
			}
		};
	}

	static delete(apiUri, onSuccess, onError, ...actionArguments) {
		return function*() {
			// eslint-disable-line func-names
			const requestURL = `${API_BASE}${apiUri}`;
			try {
				// Call our request helper (see 'utils/request')
				const options = {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						'X-Requested-With': 'XMLHttpRequest'
					}
				};
				const response = yield call(request, requestURL, options);
				yield put(onSuccess(response, actionArguments));
				// yield call(request, requestURL, options);
				// yield put(onSuccess(actionArguments));
			} catch (e) {
				let error = null;
				try {
					error = yield call(() => e.response.json());
				} catch (_) {
					error = {
						errors: [
							{
								code: e.response.status,
								msg: e.response.statusText
							}
						]
					};
				}
				yield put(onError(error, ...actionArguments));
			}
		};
	}
}

function* loadInitialData(action) {
	console.log('load');
}

function* initialize() {
	const watcher = yield fork(loadInitialData);
	yield take([INITIALIZE_ERROR, INITIALIZE_SUCCESS]);
	yield cancel(watcher);
}

function* rootSaga() {
	yield takeLatest(INITIALIZE, initialize);
	// yield takeLatest(LOAD_USER_PROFILE_SUCCESS, loadUserProfile);
}

export default [rootSaga];
