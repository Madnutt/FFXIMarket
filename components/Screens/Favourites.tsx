import { useContext } from 'react';
import { Text, View } from 'react-native';
import { StyleContext, ScreenStackList } from '../StyleContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ListItemLoader from '../Loaders/ListItemLoader';

type Props = NativeStackScreenProps<ScreenStackList, 'Favourites'>;

function Favourites({ navigation }: Props): JSX.Element {
    const styleContext = useContext(StyleContext);
    return (
        <View style={{ padding: 10 }}>
            <ListItemLoader />
        </View>
    );
}

export default Favourites;
