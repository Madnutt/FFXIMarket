import { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { StyleContext, ScreenStackList } from '../StyleContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ListItemLoader from '../Loaders/ListItemLoader';
import TrashIcon from '../Svg/TrashIcon';
import ItemSearchLoading from '../ItemList/ItemSearchLoading';
import CharacterSearchLoading from '../Character/CharacterSearchLoading';
import { ItemData, getItemsData } from '../../utils/ffxivapiData';
import SingleItemResult from '../ItemList/SingleItemResult';
import Divider from '../Divider';
import FavouriteItem from '../ItemList/FavouriteItem';

type Props = NativeStackScreenProps<ScreenStackList, 'Favourites'>;

function Favourites({ navigation }: Props): JSX.Element {
    const [result, setResult] = useState<ItemData[]>();

    const styleContext = useContext(StyleContext);

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
                paddingVertical: 20,
            }}
        >
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
        </View>
        //     <View
        //     style={{
        //         position: 'absolute',
        //         top: '50%',
        //         right: 10,
        //         transform: [{ translateY: -24 }],
        //     }}
        // >
        //     <TrashIcon />
        // </View>
    );
}

export default Favourites;
