import { Pressable, View } from 'react-native';
import SingleItemResult from './SingleItemResult';
import TrashIcon from '../Svg/TrashIcon';
import { useState, useContext } from 'react';
import PriceGraph from './PriceGraph';
import AppDataContext from '../Context/FavouritesContext';

interface Props {
    iconUrl: string;
    name: string;
    itemId: number;
}

function FavouriteItem({ iconUrl, name, itemId }: Props): JSX.Element {
    const [visible, setVisible] = useState(false);
    const { setFavourite } = useContext(AppDataContext);

    return (
        <>
            <Pressable onPress={() => setVisible(!visible)}>
                <SingleItemResult
                    name={name}
                    iconUrl={iconUrl}
                    IconElement={TrashIcon}
                    iconCallback={() => setFavourite(itemId)}
                />
            </Pressable>
            <View style={{ height: visible ? 300 : 0, overflow: 'hidden' }}>
                <PriceGraph itemId={itemId} />
            </View>
        </>
    );
}

export default FavouriteItem;
