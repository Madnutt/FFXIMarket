import { useContext } from 'react';
import { Image, Text, View } from 'react-native';
import { StyleContext } from '../StyleContext';

interface Props {
    iconUrl: string;
    name: string;
    IconElement: JSX.Element | undefined;
}

function SingleItemResult({ iconUrl, name, IconElement }: Props): JSX.Element {
    const styleContext = useContext(StyleContext);

    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                position: 'relative',
            }}
        >
            <View
                style={{
                    padding: 5,
                    borderRadius: 4,
                }}
            >
                <Image
                    style={{ width: 70, height: 70 }}
                    source={{
                        uri: iconUrl,
                    }}
                />
            </View>
            <View
                style={{
                    marginLeft: 20,
                    marginTop: 23,
                    marginRight: 140,
                    height: 32,
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <Text
                    style={{
                        fontSize: 14,
                        lineHeight: 16,
                        height: 32,
                        color: styleContext.colors.compliment,
                        verticalAlign: 'middle',
                    }}
                >
                    {name}
                </Text>
            </View>
            <View
                style={{
                    position: 'absolute',
                    top: 26,
                    right: 12,
                }}
            >
                {IconElement !== undefined && IconElement}
            </View>
        </View>
    );
}

export default SingleItemResult;
