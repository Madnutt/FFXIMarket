import { useContext } from 'react';
import { Dimensions, View } from 'react-native';
import { StyleContext } from '../Context/StyleContext';
import IconLoader from '../Loaders/IconLoader';

type Props = {
    left?: boolean;
    right?: boolean;
};

function CharacterItemsLoader({
    left = false,
    right = false,
}: Props): JSX.Element {
    const styleContext = useContext(StyleContext);
    const dimensions = Dimensions.get('window');
    const imageHeight = dimensions.width / 0.73;
    const topMargin = imageHeight / 2 - 217;

    return (
        <View
            style={{
                position: 'absolute',
                width: 64,
                height: 434,
                rowGap: 10,
                top: topMargin,
                backgroundColor: styleContext.colors.secondary,
                ...(left && { left: 16 }),
                ...(right && { right: 16 }),
            }}
        >
            <IconLoader />
            <IconLoader />
            <IconLoader />
            <IconLoader />
            <IconLoader />
            <IconLoader />
        </View>
    );
}

export default CharacterItemsLoader;
