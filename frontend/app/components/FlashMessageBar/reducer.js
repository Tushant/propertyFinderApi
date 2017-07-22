import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from '../actions/types';
import shortid from 'shortid';
import findIndex from 'lodash/findIndex';
import initialState from './initialState';

const flashMessageReducer = (state = initialState.flashMessages, action = {}) => {
  switch(action.type) {
    case ADD_FLASH_MESSAGE:
      return [...state,
        {
          id: shortid.generate(),
          type: action.message.type,
          text: action.message.text
        }
      ];
    case DELETE_FLASH_MESSAGE:
      const index = findIndex(state, {id: action.id });
      if (index >= 0) {
        return [...state.splice(0, index),
          ...state.splice(index + 1)
        ];
      }
      return state;
    default: return state;
  }
};

