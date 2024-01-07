import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

export const counterReducer = createReducer(initialState, {
  increment: (state, action) => {
    state.count += 1;
  },
  incrementBypalyload: (state, action) => {
    state.count += action.payload;
  },
  decrement: (state, action) => {
    state.count -= 1;
  },
});
