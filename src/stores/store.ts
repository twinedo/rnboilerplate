import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import authReducer from './authSlice';
import connectionReducer from './connectionSlice';
import {reduxStorage} from './storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: reduxStorage,
};
const rootReducer = combineReducers({
  auth: authReducer,
  connection: connectionReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
