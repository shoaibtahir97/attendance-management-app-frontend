import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  groups: localStorage.getItem('groups')
    ? JSON?.parse(localStorage.getItem('groups'))
    : null,
};

const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setGroups: (state, action) => {
      state.groups = action.payload;
      localStorage.setItem('groups', JSON?.stringify(action.payload));
    },
    unsetGroups: (state, action) => {
      state.groups = null;
      localStorage.removeItem('groups');
    },
  },
});

export const { setGroups, unsetGroups } = groupSlice.actions;

export default groupSlice.reducer;
