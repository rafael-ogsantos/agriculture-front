import { createSlice } from '@reduxjs/toolkit';

const producerSlice = createSlice({
  name: 'producer',
  initialState: { producers: [] },
  reducers: {
    addProducer: (state, action) => {
      state.producers.push(action.payload);
    },
  },
});

export const { addProducer } = producerSlice.actions;

export default producerSlice.reducer;