import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Figure } from '../../types/types';

interface FigureState {
  figures: Figure[];
}

const initialState: FigureState = {
  figures: [],
};

const figureSlice = createSlice({
  name: 'figures',
  initialState,
  reducers: {
    addFigure: (state, action: PayloadAction<Figure>) => {
      state.figures.push(action.payload);
    },
    updateFigure: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Figure> }>,
    ) => {
      const index = state.figures.findIndex(
        (figure) => figure.id === action.payload.id,
      );
      if (index !== -1) {
        state.figures[index] = {
          ...state.figures[index],
          ...action.payload.updates,
        } as Figure;
      }
    },
    deleteFigure: (state, action: PayloadAction<string>) => {
      state.figures = state.figures.filter(
        (figure) => figure.id !== action.payload,
      );
    },
  },
});

export const { addFigure, deleteFigure, updateFigure } = figureSlice.actions;
export default figureSlice.reducer;
