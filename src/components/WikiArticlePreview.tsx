import * as React from "react";
import { useSelector } from 'react-redux';

export function WikiArticlePreview({ article, onTap }) {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const { darkMode } = useSelector((state) => state.settings);

  const getFirstImage = () => {
    return article.images?.[0]?.url || null;
  };

  return (
    <stackLayout 
      className={`p-4 rounded-lg mb-2 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      onTap={onTap}
    >
      <gridLayout columns="auto,*" rows="auto,auto,auto" className="gap-2">
        {getFirstImage() && (
          <image
            row="0"
            rowSpan="2"
            col="0"
            src={getFirstImage()}
            className="w-24 h-24 rounded"
            onLoad={() => setImageLoaded(true)}
          />
        )}
        
        <label 
          row="0"
          col="1"
          className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}
          text={article.title}
          textWrap={true}
        />
        
        <label
          row="1"
          col="1"
          className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
          text={article.snippet?.replace(/<\/?[^>]+(>|$)/g, "")}
          textWrap={true}
        />

        {article.categories && (
          <wrapLayout row="2" col="1">
            {article.categories.slice(0, 3).map((category, index) => (
              <label
                key={index}
                className={`text-xs px-2 py-1 mr-1 mb-1 rounded ${
                  darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                }`}
                text={category}
              />
            ))}
          </wrapLayout>
        )}
      </gridLayout>
    </stackLayout>
  );
}