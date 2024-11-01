import axios from 'axios';

const WHAPI_BASE_URL = 'https://www.wikihow.com/api.php';

export const whapiService = {
  searchArticles: async (query: string) => {
    try {
      const response = await axios.get(WHAPI_BASE_URL, {
        params: {
          action: 'query',
          list: 'search',
          srsearch: query,
          format: 'json',
          srnamespace: 0,
        },
      });
      return response.data.query.search;
    } catch (error) {
      console.error('WHAPI search error:', error);
      throw error;
    }
  },

  getArticleDetails: async (pageId: number) => {
    try {
      const response = await axios.get(WHAPI_BASE_URL, {
        params: {
          action: 'parse',
          pageid: pageId,
          format: 'json',
          prop: 'text|images|sections',
        },
      });
      return response.data.parse;
    } catch (error) {
      console.error('WHAPI article details error:', error);
      throw error;
    }
  },

  getRandomArticle: async () => {
    try {
      const response = await axios.get(WHAPI_BASE_URL, {
        params: {
          action: 'query',
          list: 'random',
          rnnamespace: 0,
          format: 'json',
        },
      });
      const randomArticle = response.data.query.random[0];
      return await whapiService.getArticleDetails(randomArticle.id);
    } catch (error) {
      console.error('WHAPI random article error:', error);
      throw error;
    }
  },
};