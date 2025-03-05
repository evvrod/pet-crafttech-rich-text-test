import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Figure } from '../../types/types';

interface FigureState {
  selectedFigure: Figure | null;
}

const initialState: FigureState = {
  selectedFigure: null,
};

const activeFigureSlice = createSlice({
  name: 'figure',
  initialState,
  reducers: {
    selectFigure: (state, action: PayloadAction<Figure>) => {
      state.selectedFigure = action.payload;
    },
    clearSelection: (state) => {
      state.selectedFigure = null;
    },
  },
});

export const { selectFigure, clearSelection } = activeFigureSlice.actions;
export default activeFigureSlice.reducer;
