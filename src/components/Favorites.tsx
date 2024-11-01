import * as React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchFavorites } from '../store/favoriteSlice';

export function Favorites({ navigation }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { favorites, loading } = useSelector((state) => state.favorites);

  React.useEffect(() => {
    if (user) {
      dispatch(fetchFavorites(user.id));
    }
  }, [dispatch, user]);

  if (!user) {
    return (
      <stackLayout className="p-4">
        <label className="text-center text-gray-600" text="Please sign in to view your favorites" />
        <button
          className="bg-blue-500 text-white p-2 rounded mt-2"
          text="Sign In"
          onTap={() => navigation.navigate('Profile')}
        />
      </stackLayout>
    );
  }

  return (
    <scrollView className="bg-gray-100">
      <stackLayout className="p-4">
        <label className="text-2xl font-bold mb-4" text="Your Favorite Repairs" />
        
        {loading ? (
          <activityIndicator busy={true} />
        ) : favorites.length === 0 ? (
          <label className="text-center text-gray-600" text="No favorites yet" />
        ) : (
          <listView
            items={favorites}
            className="gap-2"
            itemTemplate={(favorite) => (
              <stackLayout
                className="p-4 bg-white rounded-lg"
                onTap={() => navigation.navigate('RepairDetails', { repairId: favorite.repair_id })}
              >
                <label className="text-lg font-semibold" text={favorite.repairs.title} />
                <label className="text-gray-600" text={favorite.repairs.description} />
                <gridLayout columns="auto,*" className="mt-2">
                  <label col="0" className="text-blue-500" text={`${favorite.repairs.difficulty} • `} />
                  <label col="1" className="text-blue-500" text={`${favorite.repairs.estimated_time} min`} />
                </gridLayout>
              </stackLayout>
            )}
          />
        )}
      </stackLayout>
    </scrollView>
  );
}