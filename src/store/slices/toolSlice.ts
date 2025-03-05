import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tool } from '../../types/types';

interface ToolState {
  tool: Tool;
}

const initialState: ToolState = {
  tool: 'cursor',
};

const toolSlice = createSlice({
  name: 'tool',
  initialState,
  reducers: {
    setTool: (state, action: PayloadAction<Tool>) => {
      state.tool = action.payload;
    },
  },
});

export const { setTool } = toolSlice.actions;
export default toolSlice.reducer;
