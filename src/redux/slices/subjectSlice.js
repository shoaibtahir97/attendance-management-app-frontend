// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   subjects: localStorage.getItem('subjects')
//     ? JSON.parse(localStorage.getItem('subjects'))
//     : null,
// };

// const subjectSlice = createSlice({
//   name: 'subjects',
//   initialState,
//   reducers: {
//     setSubjects: (state, action) => {
//       state.subjects = action.payload;
//       localStorage.setItem('subjects', JSON.stringify(action.payload));
//     },
//     unsetSubjects: (state, action) => {
//       state.subjects = null;
//       localStorage.removeItem('subjects');
//     },
//   },
// });

// export const { setSubjects, unsetSubjects } = subjectSlice.actions;

// export default subjectSlice.reducer;
