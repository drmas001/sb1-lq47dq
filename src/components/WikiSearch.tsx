import * as React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { searchWikiArticles, getRandomWikiArticle } from '../store/wikiSlice';
import { WikiArticlePreview } from './WikiArticlePreview';

export function WikiSearch({ navigation }) {
  const dispatch = useDispatch();
  const { searchResults, loading } = useSelector((state) => state.wiki);
  const { darkMode } = useSelector((state) => state.settings);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const categories = [
    'all',
    'automotive',
    'home',
    'electronics',
    'computers',
    'maintenance',
    'repair'
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const query = selectedCategory === 'all' 
        ? searchQuery 
        : `${searchQuery} ${selectedCategory}`;
      dispatch(searchWikiArticles(query.trim()));
    }
  };

  const handleRandomArticle = () => {
    dispatch(getRandomWikiArticle());
  };

  return (
    <scrollView className={darkMode ? 'bg-gray-900' : 'bg-gray-100'}>
      <stackLayout className="p-4">
        {/* Search Header */}
        <stackLayout className={`p-4 rounded-lg mb-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <gridLayout columns="*,auto" className="mb-4">
            <searchBar
              col="0"
              text={searchQuery}
              hint="Search WikiHow articles..."
              onTextChange={(e) => setSearchQuery(e.value)}
              onSubmit={handleSearch}
              className={`mr-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}
            />
            <button
              col="1"
              text="Random"
              className={`p-2 rounded ${
                darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
              }`}
              onTap={handleRandomArticle}
            />
          </gridLayout>

          {/* Categories */}
          <scrollView orientation="horizontal" className="mb-2">
            <stackLayout orientation="horizontal">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`mr-2 px-4 py-2 rounded-full ${
                    selectedCategory === category
                      ? darkMode
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-500 text-white'
                      : darkMode
                      ? 'bg-gray-700 text-gray-300'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  text={category.charAt(0).toUpperCase() + category.slice(1)}
                  onTap={() => setSelectedCategory(category)}
                />
              ))}
            </stackLayout>
          </scrollView>
        </stackLayout>

        {/* Search Results */}
        {loading ? (
          <activityIndicator busy={true} />
        ) : searchResults.length === 0 ? (
          <stackLayout className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <label 
              className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
              text="No articles found. Try a different search term."
            />
          </stackLayout>
        ) : (
          <listView
            items={searchResults}
            className="gap-2"
            itemTemplate={(result) => (
              <WikiArticlePreview
                article={result}
                onTap={() => navigation.navigate('WikiArticle', { pageId: result.pageid })}
              />
            )}
          />
        )}
      </stackLayout>
    </scrollView>
  );
}