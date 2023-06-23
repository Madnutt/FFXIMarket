import { Text, View } from 'react-native';
import CharacterView from '../Character/CharacterView';
import { useContext } from 'react';
import { StyleContext } from '../StyleContext';

interface Props {
    characterId: number;
}

function Character({ characterId }: Props): JSX.Element {
    const styleContext = useContext(StyleContext);

    if (characterId === undefined) {
        return (
            // <Text
            //     style={{
            //         textAlign: 'center',
            //         textAlignVertical: 'center',
            //         height: '100%',
            //         fontSize: 20,
            //         marginTop: -20,
            //         color: styleContext.colors.compliment,
            //     }}
            // >
            //     No character selected
            // </Text>
            <CharacterView characterId={29287954} />
        );
    } else {
        return <CharacterView characterId={characterId} />;
    }
}

export default Character;
