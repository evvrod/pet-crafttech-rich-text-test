import { configureStore } from '@reduxjs/toolkit';
import toolReducer from './slices/toolSlice';
import shapeReducer from './slices/shapeSlice';
import figuresReducer from './slices/figuresSlice';
import textEditorPanelStateReducer from './slices/textEditorPanelStateSlice';
import optionPanelStateReducer from './slices/optionPanelStateSlice';
import figureSelectedReducer from './slices/figureSelectedSlice';

export const store = configureStore({
  reducer: {
    tool: toolReducer,
    shape: shapeReducer,
    figures: figuresReducer,

    figureSelected: figureSelectedReducer,
    textEditorPanelState: textEditorPanelStateReducer,
    optionPanelState: optionPanelStateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
