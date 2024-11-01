import { configureStore } from '@reduxjs/toolkit';
import repairReducer from './repairSlice';
import userReducer from './userSlice';
import categoryReducer from './categorySlice';
import favoriteReducer from './favoriteSlice';
import toolReducer from './toolSlice';
import settingsReducer from './settingsSlice';

export const store = configureStore({
  reducer: {
    repairs: repairReducer,
    user: userReducer,
    categories: categoryReducer,
    favorites: favoriteReducer,
    tools: toolReducer,
    settings: settingsReducer,
  },
});