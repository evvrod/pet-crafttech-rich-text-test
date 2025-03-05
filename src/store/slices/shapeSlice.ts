import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Shape } from '../../types/types';

interface ShapeState {
  selectedShape: Shape;
}

const initialState: ShapeState = {
  selectedShape: 'circle',
};

const shapeSlice = createSlice({
  name: 'shape',
  initialState,
  reducers: {
    setShape: (state, action: PayloadAction<Shape>) => {
      state.selectedShape = action.payload;
    },
  },
});

export const { setShape } = shapeSlice.actions;
export default shapeSlice.reducer;
