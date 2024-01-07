import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from './reducers/countreducer';

const rootReducer = {
  counter: counterReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
