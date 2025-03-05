import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MenuState {
  activePanelId: string | null;
}

const initialState: MenuState = {
  activePanelId: null,
};

const textEditorPanelStateSlice = createSlice({
  name: 'textEditorPanelState',
  initialState,
  reducers: {
    openTextEditorPanel: (state, action: PayloadAction<string>) => {
      state.activePanelId = action.payload;
    },
    closeTextEditorPanel: (state) => {
      state.activePanelId = null;
    },
  },
});

export const { openTextEditorPanel, closeTextEditorPanel } =
  textEditorPanelStateSlice.actions;
export default textEditorPanelStateSlice.reducer;
