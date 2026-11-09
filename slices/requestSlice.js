import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  requests: [],           // pending + completed
  offlineQueue: [],       // requests made while offline
};

const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    // We'll fill these later
  },
});

export default requestSlice.reducer;