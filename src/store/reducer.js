import { combineReducers } from 'redux';
import { handleActions, createAction } from 'redux-actions';
import nskeymirror from 'nskeymirror';

// Sync action creators
const actions = nskeymirror({
  test: null,
}, 'testApp');

export const testAppTest = createAction(actions.test);

const testReducer = handleActions({
  [testAppTest]: (state, { payload: { value } }) => value,
}, '');

export default combineReducers({
  test: testReducer,
});
