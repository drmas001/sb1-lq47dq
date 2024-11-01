import * as React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getWikiArticleDetails } from '../store/wikiSlice';

export function WikiArticleView({ pageId }) {
  const dispatch = useDispatch();
  const { currentArticle, loading } = useSelector((state) => state.wiki);

  React.useEffect(() => {
    if (pageId) {
      dispatch(getWikiArticleDetails(pageId));
    }
  }, [pageId, dispatch]);

  if (loading) {
    return (
      <gridLayout className="p-4">
        <activityIndicator busy={true} />
      </gridLayout>
    );
  }

  if (!currentArticle) {
    return null;
  }

  return (
    <scrollView className="bg-gray-100">
      <stackLayout className="p-4">
        <label className="text-2xl font-bold mb-4" text={currentArticle.title} />
        
        {/* Article Content */}
        <stackLayout className="bg-white p-4 rounded-lg mb-4">
          <webView
            src={{ html: currentArticle.text['*'] }}
            className="min-h-screen"
          />
        </stackLayout>

        {/* Images */}
        {currentArticle.images?.length > 0 && (
          <stackLayout className="bg-white p-4 rounded-lg">
            <label className="text-xl font-bold mb-2" text="Images" />
            <wrapLayout>
              {currentArticle.images.map((image, index) => (
                <image
                  key={index}
                  src={image.url}
                  className="w-32 h-32 m-1 rounded object-cover"
                />
              ))}
            </wrapLayout>
          </stackLayout>
        )}
      </stackLayout>
    </scrollView>
  );
}