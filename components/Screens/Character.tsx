import { ScrollView, Text } from 'react-native';
import CharacterView from '../Character/CharacterView';
import { useContext } from 'react';
import { ScreenStackList, StyleContext } from '../StyleContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<ScreenStackList, 'Character'>;

function Character({ route }: Props): JSX.Element {
    const styleContext = useContext(StyleContext);

    if (route.params === undefined) {
        return (
            <Text
                style={{
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    height: '100%',
                    fontSize: 20,
                    marginTop: -20,
                    color: styleContext.colors.compliment,
                }}
            >
                No character selected
            </Text>
        );
    } else {
        return (
            <ScrollView>
                <CharacterView characterId={route.params.characterId} />
            </ScrollView>
        );
    }
}

export default Character;
