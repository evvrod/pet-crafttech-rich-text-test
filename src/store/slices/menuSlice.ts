import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MenuState {
  activeMenuId: string | null;
}

const initialState: MenuState = {
  activeMenuId: null,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    openMenu: (state, action: PayloadAction<string>) => {
      state.activeMenuId = action.payload;
    },
    closeMenu: (state) => {
      state.activeMenuId = null;
    },
  },
});

export const { openMenu, closeMenu } = menuSlice.actions;
export default menuSlice.reducer;
