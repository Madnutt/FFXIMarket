/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import Search from './components/Screens/Search';
import {
    StyleContext,
    ScreenStackList,
} from './components/Context/StyleContext';
import Favourites from './components/Screens/Favourites';
import Character from './components/Screens/Character';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'react-native';
import SpyGlassIcon from './components/Svg/SpyGlassIcon';
import HeartIcon from './components/Svg/HeartIcon';
import CharacterIcon from './components/Svg/CharacterIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppDataContext from './components/Context/FavouritesContext';

const RootStack = createBottomTabNavigator<ScreenStackList>();

function App(): JSX.Element {
    const [favourites, setFavourites] = useState<number[]>([]);
    const [characterId, setCharacterState] = useState<number>(-1);

    useEffect(() => {
        (async () => {
            const favouritesStorage = await AsyncStorage.getItem('favourites');
            if (favouritesStorage) {
                setFavourites(JSON.parse(favouritesStorage).items);
            }

            const characterStorage = await AsyncStorage.getItem('character');
            if (characterStorage) {
                setCharacterState(Number(characterStorage));
            }
        })();
    }, []);

    const setCharacterId = async (character: number) => {
        setCharacterState(character);
        await AsyncStorage.setItem('character', String(character));
    };

    const setFavourite = async (favourite: number) => {
        // console.log(favourite);
        // console.log(favourites);
        const index = favourites.findIndex((value) => {
            return value === favourite;
        });
        if (index !== -1) {
            const filteredOut = favourites;
            filteredOut.splice(index, 1);
            setFavourites([...filteredOut]);
        } else {
            const added = favourites;
            added.push(favourite);
            setFavourites([...added]);
        }

        await AsyncStorage.setItem(
            'favourites',
            JSON.stringify({ items: favourites })
        );
    };

    const styles = useContext(StyleContext);

    return (
        <NavigationContainer>
            <AppDataContext.Provider
                value={{
                    favourites,
                    setFavourite,
                    characterId,
                    setCharacterId,
                }}
            >
                <StyleContext.Provider value={styles}>
                    <StatusBar backgroundColor={styles.colors.primary} />
                    <RootStack.Navigator
                        screenOptions={{
                            tabBarInactiveBackgroundColor:
                                styles.colors.primary,
                            tabBarActiveBackgroundColor:
                                styles.colors.primaryAccent,
                            tabBarInactiveTintColor:
                                styles.colors.complimentAccent,
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
            </AppDataContext.Provider>
        </NavigationContainer>
    );
}

export default App;
