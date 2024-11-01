import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../store/userSlice';

export function Profile({ navigation }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleSignOut = () => {
    dispatch(signOut());
    navigation.navigate('Home');
  };

  return (
    <scrollView className="bg-gray-100">
      <stackLayout className="p-4">
        {/* Profile Header */}
        <stackLayout className="bg-white p-4 rounded-lg mb-4">
          <label className="text-2xl font-bold mb-2" text={user?.email} />
          <button
            className="bg-red-500 text-white p-2 rounded"
            text="Sign Out"
            onTap={handleSignOut}
          />
        </stackLayout>

        {/* Favorite Repairs */}
        <label className="text-xl font-bold mb-2">Favorite Repairs</label>
        <stackLayout className="bg-white p-4 rounded-lg">
          <label className="text-gray-600" text="Your favorite repairs will appear here" />
        </stackLayout>

        {/* Settings */}
        <label className="text-xl font-bold mt-4 mb-2">Settings</label>
        <stackLayout className="bg-white p-4 rounded-lg">
          <gridLayout columns="*, auto" className="mb-2">
            <label col="0" text="Dark Mode" />
            <switch col="1" />
          </gridLayout>
          <gridLayout columns="*, auto">
            <label col="0" text="Notifications" />
            <switch col="1" checked={true} />
          </gridLayout>
        </stackLayout>
      </stackLayout>
    </scrollView>
  );
}