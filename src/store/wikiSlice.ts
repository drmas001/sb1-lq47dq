import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { whapiService } from '../services/whapi';

export const searchWikiArticles = createAsyncThunk(
  'wiki/searchArticles',
  async (query: string) => {
    const results = await whapiService.searchArticles(query);
    // Fetch additional details for each result
    const detailedResults = await Promise.all(
      results.map(async (result) => {
        const details = await whapiService.getArticleDetails(result.pageid);
        return {
          ...result,
          images: details.images,
          categories: details.categories,
        };
      })
    );
    return detailedResults;
  }
);

export const getWikiArticleDetails = createAsyncThunk(
  'wiki/getArticleDetails',
  async (pageId: number) => {
    return await whapiService.getArticleDetails(pageId);
  }
);

export const getRandomWikiArticle = createAsyncThunk(
  'wiki/getRandomArticle',
  async () => {
    return await whapiService.getRandomArticle();
  }
);

const wikiSlice = createSlice({
  name: 'wiki',
  initialState: {
    searchResults: [],
    currentArticle: null,
    recentArticles: [],
    loading: false,
    error: null,
  },
  reducers: {
    addToRecentArticles: (state, action) => {
      const exists = state.recentArticles.some(
        article => article.pageid === action.payload.pageid
      );
      if (!exists) {
        state.recentArticles = [
          action.payload,
          ...state.recentArticles.slice(0, 9)
        ];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchWikiArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchWikiArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchWikiArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getWikiArticleDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWikiArticleDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentArticle = action.payload;
        state.error = null;
      })
      .addCase(getWikiArticleDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getRandomWikiArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRandomWikiArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.currentArticle = action.payload;
        state.error = null;
      })
      .addCase(getRandomWikiArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addToRecentArticles } = wikiSlice.actions;
export default wikiSlice.reducer;