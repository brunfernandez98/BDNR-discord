import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';

interface MainState {
  id: number | null;
  email: null | string;
  username: string | null;
  avatar: string | null;
}

const initialState: MainState = {
  id: null,
  email: '',
  username: '',
  avatar: '',
};

export const mainSlice: Slice<MainState> = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.avatar = action.payload.avatar;
    },
    cleanSession: (state) => {
      state.id = null;
      state.email = null;
      state.username = null;
      state.avatar = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, cleanSession } = mainSlice.actions;

export default mainSlice.reducer;
