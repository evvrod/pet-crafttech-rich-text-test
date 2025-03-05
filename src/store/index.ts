import { configureStore } from '@reduxjs/toolkit';
import toolReducer from './slices/toolSlice';
import shapeReducer from './slices/shapeSlice';
import figureReducer from './slices/figureSlice';
import menuReducer from './slices/menuSlice';
import activeFigureReducer from './slices/activeFigureSlice';

export const store = configureStore({
  reducer: {
    tool: toolReducer,
    shape: shapeReducer,
    figures: figureReducer,
    menu: menuReducer,
    activeFigure: activeFigureReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
