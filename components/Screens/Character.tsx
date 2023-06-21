import { useContext } from 'react';
import { Image, Text, View } from 'react-native';
import { StyleContext, ScreenStackList } from '../StyleContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CharacterTitleLoader from '../Loaders/CharacterTitleLoader';
import { Dimensions } from 'react-native';
import IconLoader from '../Loaders/IconLoader';

type Props = NativeStackScreenProps<ScreenStackList, 'Character'>;

function Character({ navigation }: Props): JSX.Element {
    const styleContext = useContext(StyleContext);
    const dimensions = Dimensions.get('window');
    const imageHeight = dimensions.width / 0.73;
    const topMargin = imageHeight / 2 - 217;

    return (
        <>
            <CharacterTitleLoader />
            <View style={{ position: 'relative' }}>
                {/* TODO: skończyć później */}
                <Image
                    source={{
                        uri: 'https://img2.finalfantasyxiv.com/f/0d04044e35f77172e501a3b7ea34e310_feaf0a2e88ff164813fbc9b85876fa48fl0_640x873.jpg?1687361326',
                    }}
                    style={{
                        resizeMode: 'contain',
                        aspectRatio: 0.73,
                    }}
                />
                <View
                    style={{
                        position: 'absolute',
                        width: 64,
                        height: 434,
                        rowGap: 10,
                        left: 16,
                        top: topMargin,
                        backgroundColor: styleContext.colors.secondary,
                    }}
                >
                    <IconLoader />
                    <IconLoader />
                    <IconLoader />
                    <IconLoader />
                    <IconLoader />
                    <IconLoader />
                </View>
                <View
                    style={{
                        position: 'absolute',
                        width: 64,
                        height: 434,
                        rowGap: 10,
                        right: 16,
                        top: topMargin,
                        backgroundColor: styleContext.colors.secondary,
                    }}
                >
                    <IconLoader />
                    <IconLoader />
                    <IconLoader />
                    <IconLoader />
                    <IconLoader />
                    <IconLoader />
                </View>
            </View>
        </>
    );
}

export default Character;
