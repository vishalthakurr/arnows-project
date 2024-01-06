import { configureStore } from '@reduxjs/toolkit';
import { ReloadState, counterReducer } from './reducers/countreducer';

const rootReducer = {
  counter: counterReducer,
  reload: ReloadState
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
