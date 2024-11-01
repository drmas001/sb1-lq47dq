import * as React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getWikiArticleDetails } from '../store/wikiSlice';
import { toggleFavorite } from '../store/favoriteSlice';

export function WikiArticle({ route, navigation }) {
  const dispatch = useDispatch();
  const { currentArticle, loading } = useSelector((state) => state.wiki);
  const { user } = useSelector((state) => state.user);
  const pageId = route.params?.pageId;

  React.useEffect(() => {
    if (pageId) {
      dispatch(getWikiArticleDetails(pageId));
    }
  }, [pageId, dispatch]);

  const handleFavorite = () => {
    if (user && currentArticle) {
      dispatch(toggleFavorite({ userId: user.id, articleId: pageId }));
    }
  };

  if (loading) {
    return (
      <gridLayout className="p-4">
        <activityIndicator busy={true} />
      </gridLayout>
    );
  }

  if (!currentArticle) {
    return (
      <stackLayout className="p-4">
        <label className="text-center text-gray-600" text="Article not found" />
      </stackLayout>
    );
  }

  return (
    <scrollView className="bg-gray-100">
      <stackLayout className="p-4">
        {/* Header */}
        <stackLayout className="bg-white p-4 rounded-lg mb-4">
          <gridLayout columns="*,auto">
            <label col="0" className="text-2xl font-bold" text={currentArticle.title} />
            {user && (
              <button
                col="1"
                className="text-2xl"
                text="♥"
                onTap={handleFavorite}
              />
            )}
          </gridLayout>
        </stackLayout>

        {/* Article Content */}
        <stackLayout className="bg-white p-4 rounded-lg mb-4">
          <webView
            src={{ html: currentArticle.text['*'] }}
            className="min-h-screen"
          />
        </stackLayout>

        {/* Images */}
        {currentArticle.images?.length > 0 && (
          <stackLayout className="bg-white p-4 rounded-lg mb-4">
            <label className="text-xl font-bold mb-2" text="Related Images" />
            <scrollView orientation="horizontal">
              <stackLayout orientation="horizontal">
                {currentArticle.images.map((image, index) => (
                  <image
                    key={index}
                    src={image.url}
                    className="w-48 h-48 m-1 rounded object-cover"
                  />
                ))}
              </stackLayout>
            </scrollView>
          </stackLayout>
        )}

        {/* References */}
        {currentArticle.sections?.length > 0 && (
          <stackLayout className="bg-white p-4 rounded-lg">
            <label className="text-xl font-bold mb-2" text="Sections" />
            <listView
              items={currentArticle.sections}
              className="gap-2"
              itemTemplate={(section) => (
                <label
                  className="text-blue-500"
                  text={section.line}
                  textWrap={true}
                />
              )}
            />
          </stackLayout>
        )}
      </stackLayout>
    </scrollView>
  );
}