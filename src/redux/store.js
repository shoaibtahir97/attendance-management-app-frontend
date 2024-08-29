import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import authSliceReducer from './slices/authSlice';
import subjectSliceReducer from './slices/subjectSlice';
import groupSliceReducer from './slices/groupSlice';
import attendanceSliceReducer from './slices/attendanceSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    subjects: subjectSliceReducer,
    groups: groupSliceReducer,
    attendanceRecords: attendanceSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
