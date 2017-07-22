import {
	LOAD_PROPERTY_TYPE,
	LOAD_PROPERTY_TYPE_SUCCESS,
	LOAD_PROPERTY_TYPE_FAILURE,
	LIST_PROPERTY,
	LIST_PROPERTY_SUCCESS,
	LIST_PROPERTY_FAILURE
} from './constants';

import action from 'utils/action';

export const getTypeOfProperty = action(LOAD_PROPERTY_TYPE);
export const propertyTypesLoaded = action(LOAD_PROPERTY_TYPE_SUCCESS, 'typesOfProperty');
export const propertyTypesLoadingError = action(LOAD_PROPERTY_TYPE_FAILURE, 'error');

export const listProperty = action(LIST_PROPERTY, 'property');
export const propertyListed = action(LIST_PROPERTY_SUCCESS, 'response');
export const propertyListingError = action(LIST_PROPERTY_FAILURE, 'error');
