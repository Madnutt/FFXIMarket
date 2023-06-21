import { useContext } from 'react';
import { View } from 'react-native';
import { StyleContext } from './StyleContext';
import ListItemLoader from './Loaders/ListItemLoader';
import CharacterTitleLoader from './Loaders/CharacterTitleLoader';

function CharacterList(): JSX.Element {
    return (
        <View
            style={{
                paddingHorizontal: 16,
                paddingVertical: 20,
            }}
        >
            <CharacterTitleLoader />
        </View>
    );
}

export default CharacterList;
