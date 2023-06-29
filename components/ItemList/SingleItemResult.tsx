import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { StyleContext } from '../StyleContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
    iconUrl: string;
    name: string;
    iconColor?: string;
    IconElement?: FunctionComponent<{ color?: string }>;
    iconCallback?: CallableFunction;
}

function SingleItemResult({
    iconUrl,
    name,
    IconElement,
    iconColor,
    iconCallback,
}: Props): JSX.Element {
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
                <Pressable
                    onPress={() => {
                        if (iconCallback !== undefined) {
                            iconCallback();
                        }
                    }}
                >
                    {IconElement !== undefined && (
                        <IconElement color={iconColor} />
                    )}
                </Pressable>
            </View>
        </View>
    );
}

export default SingleItemResult;
