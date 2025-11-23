import {createSlice} from '@reduxjs/toolkit';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    userData: {},
    location: {},
    language: 'hr',
  },
  reducers: {
    setUserData(state, action) {
      state.userData = action.payload;
    },
    setLocation(state, action) {
      state.location = action.payload;
    },
    setLanguage(state, action) {
      state.language = action.payload;
    },
  },
});

export const {setUserData, setLocation, setLanguage} = usersSlice.actions;

export default usersSlice.reducer;
