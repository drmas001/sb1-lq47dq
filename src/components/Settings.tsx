import * as React from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleDarkMode,
  toggleNotifications,
  setLanguage,
} from '../store/settingsSlice';

export function Settings({ navigation }) {
  const dispatch = useDispatch();
  const { darkMode, notifications, language } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.user);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
  ];

  if (!user) {
    return (
      <stackLayout className="p-4">
        <label className="text-center text-gray-600" text="Please sign in to access settings" />
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
        <label className="text-2xl font-bold mb-4" text="Settings" />

        {/* Appearance */}
        <stackLayout className="bg-white p-4 rounded-lg mb-4">
          <label className="text-lg font-semibold mb-2" text="Appearance" />
          <gridLayout columns="*,auto" className="mb-2">
            <label col="0" text="Dark Mode" className="text-gray-700" />
            <switch
              col="1"
              checked={darkMode}
              onCheckedChange={() => dispatch(toggleDarkMode())}
            />
          </gridLayout>
        </stackLayout>

        {/* Notifications */}
        <stackLayout className="bg-white p-4 rounded-lg mb-4">
          <label className="text-lg font-semibold mb-2" text="Notifications" />
          <gridLayout columns="*,auto" className="mb-2">
            <label col="0" text="Enable Notifications" className="text-gray-700" />
            <switch
              col="1"
              checked={notifications}
              onCheckedChange={() => dispatch(toggleNotifications())}
            />
          </gridLayout>
        </stackLayout>

        {/* Language */}
        <stackLayout className="bg-white p-4 rounded-lg mb-4">
          <label className="text-lg font-semibold mb-2" text="Language" />
          <listView
            items={languages}
            className="mb-2"
            itemTemplate={(lang) => (
              <gridLayout
                columns="*,auto"
                className={`p-2 ${language === lang.code ? 'bg-blue-100' : ''}`}
                onTap={() => dispatch(setLanguage(lang.code))}
              >
                <label col="0" text={lang.name} className="text-gray-700" />
                {language === lang.code && (
                  <label col="1" text="✓" className="text-blue-500" />
                )}
              </gridLayout>
            )}
          />
        </stackLayout>

        {/* Account */}
        <stackLayout className="bg-white p-4 rounded-lg">
          <label className="text-lg font-semibold mb-2" text="Account" />
          <button
            className="bg-red-500 text-white p-2 rounded"
            text="Delete Account"
            onTap={() => {
              // Implement account deletion logic
            }}
          />
        </stackLayout>
      </stackLayout>
    </scrollView>
  );
}