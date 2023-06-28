import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import ItemSearchLoading from '../ItemList/ItemSearchLoading';
import { ItemData, getItemsData } from '../../utils/ffxivapiData';
import FavouriteItem from '../ItemList/FavouriteItem';

function Favourites(): JSX.Element {
    const [result, setResult] = useState<ItemData[]>();

    useEffect(() => {
        //TODO: wziąć te idki z jakiegoś storaga po zapisaniu z wyszukiwania
        const favouriteIds = [27162, 27204, 27202];

        (async () => {
            if (favouriteIds.length > 0) {
                const response = await getItemsData(favouriteIds);
                if (response.ok) {
                    setResult((await response.json()).Results as ItemData[]);
                } else {
                    console.error((await response.json()).Message);
                }
            }
        })();
    }, []);
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
                                key={i}
                            />
                        );
                    })}
            </ScrollView>
        </View>
    );
}

export default Favourites;
