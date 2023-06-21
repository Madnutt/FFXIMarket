import { useContext } from 'react';
import { Text, View } from 'react-native';
import { StyleContext, ScreenStackList } from '../StyleContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ListItemLoader from '../Loaders/ListItemLoader';
import TrashIcon from '../Svg/TrashIcon';

type Props = NativeStackScreenProps<ScreenStackList, 'Favourites'>;

function Favourites({ navigation }: Props): JSX.Element {
    const styleContext = useContext(StyleContext);
    return (
        <View style={{ padding: 10 }}>
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
                    <TrashIcon />
                </View>
            </View>
        </View>
    );
}

export default Favourites;
