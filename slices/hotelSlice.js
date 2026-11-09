import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedHotel: null,
  hotels: [],
};

const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
    // We'll fill these later
  },
});

export default hotelSlice.reducer;