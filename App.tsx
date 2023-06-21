/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import Search from './components/Screens/Search';
import { StyleContext, ScreenStackList } from './components/StyleContext';
import Favourites from './components/Screens/Favourites';
import Character from './components/Screens/Character';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'react-native';
import SpyGlassIcon from './components/Svg/SpyGlassIcon';
import HeartIcon from './components/Svg/HeartIcon';
import CharacterIcon from './components/Svg/CharacterIcon';

const RootStack = createBottomTabNavigator<ScreenStackList>();

function App(): JSX.Element {
    const styles = useContext(StyleContext);

    return (
        <NavigationContainer>
            <StyleContext.Provider value={styles}>
                <StatusBar backgroundColor={styles.colors.primary} />
                <RootStack.Navigator
                    screenOptions={{
                        tabBarInactiveBackgroundColor: styles.colors.primary,
                        tabBarActiveBackgroundColor:
                            styles.colors.primaryAccent,
                        tabBarInactiveTintColor: styles.colors.complimentAccent,
                        tabBarActiveTintColor: styles.colors.compliment,
                        headerShown: false,
                    }}
                    sceneContainerStyle={{
                        backgroundColor: styles.colors.secondary,
                    }}
                    initialRouteName="Favourites"
                >
                    <RootStack.Screen
                        options={{ tabBarIcon: HeartIcon }}
                        name="Favourites"
                        component={Favourites}
                    />
                    <RootStack.Screen
                        options={{ tabBarIcon: SpyGlassIcon }}
                        name="Search"
                        component={Search}
                    />
                    <RootStack.Screen
                        options={{ tabBarIcon: CharacterIcon }}
                        name="Character"
                        component={Character}
                    />
                </RootStack.Navigator>
            </StyleContext.Provider>
        </NavigationContainer>
    );
}

export default App;
