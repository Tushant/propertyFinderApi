/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const selectUser = state => state.get('login');

const selectRoute = state => state.get('route');

export const selectInitialize = () => state => state.getIn(['global', 'initialized']);

const makeSelectError = () =>
  createSelector(selectGlobal, globalState => {
    return globalState.get('error');
  });

const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.get('location').toJS());

const makeSelectUser = () => createSelector(selectUser, userState => userState.get('userInfo'));

const makeSelectDialog = () =>
  createSelector(selectGlobal, globalState => globalState.get('dialog'));

const makeSelectTokenMessage = () =>
  createSelector(selectGlobal, gobalState => gobalState.get('tokenMessage'));

const selectHome = () => state => state.get('home');

export {
  selectGlobal,
  makeSelectDialog,
  makeSelectUser,
  makeSelectError,
  makeSelectLocation,
  makeSelectTokenMessage,
  selectHome,
  selectUser
};
