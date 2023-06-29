import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import ItemSearchLoading from '../ItemList/ItemSearchLoading';
import { ItemData, getItemsData } from '../../utils/ffxivapiData';
import FavouriteItem from '../ItemList/FavouriteItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useFavourites from '../../hooks/useFavourites';

function Favourites(): JSX.Element {
    const [result, setResult] = useState<ItemData[]>();
    const [favourites] = useFavourites();

    // TODO: zarządzać ulubionymi na wyższym poziomie żeby nie duplikowac kodu
    useEffect(() => {
        (async () => {
            if (favourites.length > 0) {
                const response = await getItemsData(favourites);
                if (response.ok) {
                    setResult((await response.json()).Results as ItemData[]);
                } else {
                    console.error((await response.json()).Message);
                }
            }
        })();
    }, [favourites]);
    return (
        <View
            style={{
                paddingHorizontal: 16,
                paddingTop: 20,
                paddingBottom: 80,
            }}
        >
            <ScrollView>
                {!result && <ItemSearchLoading />}
                {result &&
                    result.map((value, i) => {
                        return (
                            <FavouriteItem
                                name={value.Name}
                                iconUrl={
                                    'https://xivapi.com' +
                                    decodeURIComponent(value.Icon)
                                }
                                itemId={value.ID}
                                key={value.ID}
                            />
                        );
                    })}
            </ScrollView>
        </View>
    );
}

export default Favourites;
