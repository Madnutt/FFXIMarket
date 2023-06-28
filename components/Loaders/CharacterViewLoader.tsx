import CharacterTitleLoader from '../Loaders/CharacterTitleLoader';
import { View } from 'react-native';
import CharacterItemsLoader from './CharacterItemsLoader';

function CharacterViewLoader(): JSX.Element {
    return (
        <>
            <CharacterTitleLoader />
            <View style={{ position: 'relative' }}>
                <View
                    style={{
                        aspectRatio: 0.73,
                    }}
                />
                <CharacterItemsLoader left />
                <CharacterItemsLoader right />
            </View>
        </>
    );
}

export default CharacterViewLoader;
