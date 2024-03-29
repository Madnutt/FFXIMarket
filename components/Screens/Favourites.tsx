import { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import ItemSearchLoading from '../ItemList/ItemSearchLoading';
import { ItemData, getItemsData } from '../../utils/ffxivapiData';
import FavouriteItem from '../ItemList/FavouriteItem';
import AppDataContext from '../../context/AppDataContext';
import { StyleContext } from '../../context/StyleContext';

function Favourites(): JSX.Element {
    const [result, setResult] = useState<ItemData[]>();
    const { favourites } = useContext(AppDataContext);
    const styleContext = useContext(StyleContext);

    console.log(favourites.length);

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
            {favourites.length === 0 && (
                <Text
                    style={{
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        height: '100%',
                        fontSize: 20,
                        color: styleContext.colors.compliment,
                    }}
                >
                    Add some items to favourites first
                </Text>
            )}
            {!result && favourites.length > 0 && <ItemSearchLoading />}
            {result && (
                <ScrollView>
                    {result.map((value) => {
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
            )}
        </View>
    );
}

export default Favourites;
