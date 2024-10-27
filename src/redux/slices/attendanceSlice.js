import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  attendanceRecords: localStorage.getItem('attendanceRecords')
    ? JSON.parse(localStorage.getItem('attendanceRecords'))
    : [],
};

const attendanceSlice = createSlice({
  name: 'attendanceRecord',
  initialState,
  reducers: {
    markAttendance: (state, action) => {
      const attendance = state.attendanceRecords.find(
        (attendance) => attendance.studentId === action.payload.studentId
      );
      if (attendance) {
        attendance.status = action.payload.status;
      } else {
        state.attendanceRecords.push(action.payload);
      }
    },
    addAbsentReason: (state, action) => {
      const attendance = state.attendanceRecords.find(
        (attendance) => attendance.studentId === action.payload.studentId
      );

      if (attendance) {
        attendance.reason = action.payload.reason;
      }
    },
    resetAttendanceRecord: (state, action) => {
      localStorage.removeItem('attendanceRecords');
      state.attendanceRecords = [];
    },
  },
});

export const { markAttendance, resetAttendanceRecord, addAbsentReason } =
  attendanceSlice.actions;

export default attendanceSlice.reducer;
