import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { Provider } from 'react-redux';
import { store } from '../store/store';

import { HomePage } from "./HomePage";
import { Search } from "./Search";
import { Categories } from "./Categories";
import { CategoryRepairs } from "./CategoryRepairs";
import { RepairDetails } from "./RepairDetails";
import { Favorites } from "./Favorites";
import { Profile } from "./Profile";
import { Settings } from "./Settings";
import { Tools } from "./Tools";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
    <Provider store={store}>
        <BaseNavigationContainer>
            <StackNavigator.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#65adf1",
                    },
                    headerTintColor: "white",
                    headerShown: true,
                }}
            >
                <StackNavigator.Screen
                    name="Home"
                    component={HomePage}
                    options={{
                        title: "Repair Guide",
                        headerRight: ({ navigation }) => (
                            <gridLayout columns="auto,auto" className="mr-2">
                                <button
                                    col="0"
                                    className="text-white mr-2"
                                    text="⚙️"
                                    onTap={() => navigation.navigate('Settings')}
                                />
                                <button
                                    col="1"
                                    className="text-white"
                                    text="👤"
                                    onTap={() => navigation.navigate('Profile')}
                                />
                            </gridLayout>
                        ),
                    }}
                />
                <StackNavigator.Screen
                    name="Search"
                    component={Search}
                    options={{ title: "Search Repairs" }}
                />
                <StackNavigator.Screen
                    name="Categories"
                    component={Categories}
                    options={{ title: "Categories" }}
                />
                <StackNavigator.Screen
                    name="CategoryRepairs"
                    component={CategoryRepairs}
                    options={({ route }) => ({ 
                        title: route.params?.categoryName || "Repairs" 
                    })}
                />
                <StackNavigator.Screen
                    name="RepairDetails"
                    component={RepairDetails}
                    options={({ route }) => ({ 
                        title: route.params?.repairName || "Repair Details",
                        headerRight: ({ navigation }) => (
                            <button
                                className="text-white mr-4"
                                text="♥"
                                onTap={() => navigation.navigate('Favorites')}
                            />
                        ),
                    })}
                />
                <StackNavigator.Screen
                    name="Favorites"
                    component={Favorites}
                    options={{ title: "My Favorites" }}
                />
                <StackNavigator.Screen
                    name="Profile"
                    component={Profile}
                    options={{ title: "My Profile" }}
                />
                <StackNavigator.Screen
                    name="Settings"
                    component={Settings}
                    options={{ title: "Settings" }}
                />
                <StackNavigator.Screen
                    name="Tools"
                    component={Tools}
                    options={{ title: "Required Tools" }}
                />
            </StackNavigator.Navigator>
        </BaseNavigationContainer>
    </Provider>
);