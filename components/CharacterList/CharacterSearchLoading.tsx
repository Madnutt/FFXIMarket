import { View } from 'react-native';
import CharacterTitleLoader from '../Loaders/CharacterTitleLoader';
import { useContext } from 'react';
import { StyleContext } from '../StyleContext';
import Divider from '../Divider';

function CharacterSearchLoading(): JSX.Element {
    return (
        <View>
            <CharacterTitleLoader />
            <Divider />
            <CharacterTitleLoader />
            <Divider />
            <CharacterTitleLoader />
        </View>
    );
}

export default CharacterSearchLoading;
