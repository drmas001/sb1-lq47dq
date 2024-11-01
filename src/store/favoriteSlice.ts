import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../services/supabase';

export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async (userId: string) => {
    const { data, error } = await supabase
      .from('favorites')
      .select('*, repairs(*)')
      .eq('user_id', userId);
    if (error) throw error;
    return data;
  }
);

export const toggleFavorite = createAsyncThunk(
  'favorites/toggleFavorite',
  async ({ userId, repairId }: { userId: string; repairId: string }) => {
    const { data: existing, error: checkError } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('repair_id', repairId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') throw checkError;

    if (existing) {
      const { error: deleteError } = await supabase
        .from('favorites')
        .delete()
        .eq('id', existing.id);
      if (deleteError) throw deleteError;
      return { repairId, action: 'removed' };
    } else {
      const { error: insertError } = await supabase
        .from('favorites')
        .insert({ user_id: userId, repair_id: repairId });
      if (insertError) throw insertError;
      return { repairId, action: 'added' };
    }
  }
);

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        if (action.payload.action === 'removed') {
          state.favorites = state.favorites.filter(
            (fav) => fav.repair_id !== action.payload.repairId
          );
        }
      });
  },
});

export default favoriteSlice.reducer;