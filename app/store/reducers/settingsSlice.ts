import { createSlice } from '@reduxjs/toolkit';
import { NSettings } from '../../types';

const initialState: NSettings.State = {
  enableLocalAuthentication: false,
};

export default createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleLocalAuthentication(state) {
      state.enableLocalAuthentication = !state.enableLocalAuthentication;
    },
  },
});
