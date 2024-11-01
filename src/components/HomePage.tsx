import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { useSelector, useDispatch } from 'react-redux';
import { fetchRepairs } from '../store/repairSlice';
import { getRandomWikiArticle } from '../store/wikiSlice';

export function HomePage({ navigation }) {
  const dispatch = useDispatch();
  const { repairs, loading } = useSelector((state) => state.repairs);
  const { user } = useSelector((state) => state.user);
  const { currentArticle } = useSelector((state) => state.wiki);

  React.useEffect(() => {
    dispatch(fetchRepairs());
    dispatch(getRandomWikiArticle());
  }, [dispatch]);

  const navigateToRepair = (repairId) => {
    navigation.navigate('RepairDetails', { repairId });
  };

  return (
    <scrollView className="bg-gray-100">
      <stackLayout className="p-4">
        {/* Header */}
        <gridLayout columns="*, auto" className="mb-4">
          <searchBar 
            col="0"
            hint="Search repairs..."
            className="mr-2"
            onSubmit={() => navigation.navigate('Search')}
          />
          <button 
            col="1"
            className="bg-blue-500 text-white p-2 rounded"
            text={user ? "Profile" : "Sign In"}
            onTap={() => navigation.navigate('Profile')}
          />
        </gridLayout>

        {/* WikiHow Integration */}
        <stackLayout className="bg-white p-4 rounded-lg mb-4">
          <gridLayout columns="*,auto" className="mb-2">
            <label col="0" className="text-xl font-bold" text="WikiHow Guides" />
            <button
              col="1"
              className="text-blue-500"
              text="View All"
              onTap={() => navigation.navigate('WikiSearch')}
            />
          </gridLayout>
          {currentArticle && (
            <stackLayout
              className="border-l-4 border-blue-500 p-2"
              onTap={() => navigation.navigate('WikiArticle', { pageId: currentArticle.pageid })}
            >
              <label className="font-semibold" text={currentArticle.title} />
              <label className="text-gray-600 text-sm" text="Featured Article" />
            </stackLayout>
          )}
        </stackLayout>

        {/* Categories */}
        <label className="text-xl font-bold mb-2">Categories</label>
        <wrapLayout>
          {['Automotive', 'Home', 'Electronics'].map((category) => (
            <button 
              key={category}
              className="bg-blue-500 text-white p-2 m-1 rounded"
              text={category}
              onTap={() => navigation.navigate('Categories')}
            />
          ))}
        </wrapLayout>

        {/* Popular Repairs */}
        <label className="text-xl font-bold mt-4 mb-2">Popular Repairs</label>
        {loading ? (
          <activityIndicator busy={true} />
        ) : (
          <listView
            items={repairs.slice(0, 5)}
            itemTemplate={(item) => (
              <gridLayout 
                columns="*, auto" 
                className="p-2 bg-white rounded mb-2"
                onTap={() => navigateToRepair(item.id)}
              >
                <label col="0" text={item.title} className="text-lg" />
                <label col="1" text="→" className="text-lg" />
              </gridLayout>
            )}
          />
        )}
      </stackLayout>
    </scrollView>
  );
}