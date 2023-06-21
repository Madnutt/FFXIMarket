import { useContext } from 'react';
import { View } from 'react-native';
import { StyleContext } from './StyleContext';
import ListItemLoader from './Loaders/ListItemLoader';
import HeartIcon from './Svg/HeartIcon';

function ItemList(): JSX.Element {
    return (
        <View
            style={{
                paddingHorizontal: 16,
                paddingVertical: 20,
            }}
        >
            <View style={{ position: 'relative' }}>
                <ListItemLoader />
                <View
                    style={{
                        position: 'absolute',
                        top: '50%',
                        right: 10,
                        transform: [{ translateY: -24 }],
                    }}
                >
                    <HeartIcon />
                </View>
            </View>
        </View>
    );
}

export default ItemList;
