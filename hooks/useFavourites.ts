import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useCallback } from 'react';

function useFavourites(): [
    number[],
    React.Dispatch<React.SetStateAction<number>>
] {
    const [favourites, setFavourites] = useState<number[]>([]);
    const [favourite, setFavourite] = useState<number>(-1);

    useEffect(() => {
        (async () => {
            const storage = await AsyncStorage.getItem('favourites');
            if (storage) {
                setFavourites(JSON.parse(storage).items);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (favourite !== -1) {
                const index = favourites.findIndex((value) => {
                    return value === favourite;
                });
                if (index !== -1) {
                    const filteredOut = favourites;
                    filteredOut.splice(index, 1);
                    setFavourites(filteredOut);
                } else {
                    const added = favourites;
                    added.push(favourite);
                    setFavourites(added);
                }

                await AsyncStorage.setItem(
                    'favourites',
                    JSON.stringify({ items: favourites })
                );
            }
        })();
    }, [favourite, favourites]);

    return [favourites, setFavourite];
}

export default useFavourites;
