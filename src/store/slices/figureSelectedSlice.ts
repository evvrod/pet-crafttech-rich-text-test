import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FigureState {
  idFigure: string | null;
}

const initialState: FigureState = {
  idFigure: null,
};

const figureSelectedSlice = createSlice({
  name: 'figure',
  initialState,
  reducers: {
    selectEditedFigure: (state, action: PayloadAction<string>) => {
      state.idFigure = action.payload;
    },
    clearEditedFigure: (state) => {
      state.idFigure = null;
    },
  },
});

export const { selectEditedFigure, clearEditedFigure } =
  figureSelectedSlice.actions;
export default figureSelectedSlice.reducer;
