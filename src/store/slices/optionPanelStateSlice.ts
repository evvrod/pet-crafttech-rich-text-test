import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MenuState {
  activePanelId: string | null;
}

const initialState: MenuState = {
  activePanelId: null,
};

const optionPanelStateSlice = createSlice({
  name: 'optionPanel',
  initialState,
  reducers: {
    openOptionPanel: (state, action: PayloadAction<string>) => {
      state.activePanelId = action.payload;
    },
    closeOptionPanel: (state) => {
      state.activePanelId = null;
    },
  },
});

export const { openOptionPanel, closeOptionPanel } =
  optionPanelStateSlice.actions;
export default optionPanelStateSlice.reducer;
