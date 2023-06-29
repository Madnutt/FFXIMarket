import { Pressable, View } from 'react-native';
import SingleItemResult from './SingleItemResult';
import TrashIcon from '../Svg/TrashIcon';
import { useState } from 'react';
import PriceGraph from './PriceGraph';

interface Props {
    iconUrl: string;
    name: string;
    itemId: number;
}

function FavouriteItem({ iconUrl, name, itemId }: Props): JSX.Element {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <Pressable onPress={() => setVisible(!visible)}>
                <SingleItemResult
                    name={name}
                    iconUrl={iconUrl}
                    IconElement={TrashIcon}
                />
            </Pressable>
            <View style={{ height: visible ? 300 : 0, overflow: 'hidden' }}>
                <PriceGraph itemId={itemId} />
            </View>
        </>
    );
}

export default FavouriteItem;
