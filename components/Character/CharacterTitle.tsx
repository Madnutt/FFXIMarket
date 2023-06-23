import { useContext } from 'react';
import { Image, Text, View } from 'react-native';
import { StyleContext } from '../StyleContext';

interface Props {
    name: string;
    lvl: number;
    jobIcon: string;
}

function CharacterTitle({ name, lvl, jobIcon }: Props): JSX.Element {
    const styleContext = useContext(StyleContext);
    return (
        <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Image
                source={{
                    uri: jobIcon,
                }}
                style={{ width: 70, height: 70, margin: 5 }}
            />
            <View style={{ marginLeft: 16 }}>
                <Text
                    style={{
                        lineHeight: 24,
                        fontSize: 16,
                        color: styleContext.colors.compliment,
                        marginTop: 16,
                    }}
                >
                    {name}
                </Text>
                <Text
                    style={{
                        lineHeight: 24,
                        fontSize: 16,
                        color: styleContext.colors.compliment,
                    }}
                >
                    Lv {lvl}
                </Text>
            </View>
        </View>
    );
}

export default CharacterTitle;
