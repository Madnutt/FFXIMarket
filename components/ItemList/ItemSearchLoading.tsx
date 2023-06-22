import { View } from 'react-native';
import ListItemLoader from '../Loaders/ListItemLoader';
import Divider from '../Divider';

function ItemSearchLoading(): JSX.Element {
    return (
        <View>
            <ListItemLoader />
            <Divider />
            <ListItemLoader />
            <Divider />
            <ListItemLoader />
        </View>
    );
}

export default ItemSearchLoading;
