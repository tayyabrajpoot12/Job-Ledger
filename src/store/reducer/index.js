import {combineReducers} from 'redux';

import {authConfigsSlice} from './AuthConfig';
import {usersSlice} from './usersSlice';

export const rootReducer = combineReducers({
  users: usersSlice.reducer,
  authConfigs: authConfigsSlice.reducer,
});
