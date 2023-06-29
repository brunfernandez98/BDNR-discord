import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channel_id: null,
  channelName: null,
};

export const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    setChannelInfo: (state, action) => {
      state.channel_id = action.payload.channel_id;
      state.channelName = action.payload.channelName;
    },
  },
});

export const { setChannelInfo } = channelSlice.actions;

export default channelSlice.reducer;
