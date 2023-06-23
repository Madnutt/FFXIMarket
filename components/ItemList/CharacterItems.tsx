import { useContext, useEffect } from 'react';
import { Dimensions, View } from 'react-native';
import { StyleContext } from '../StyleContext';
import IconLoader from '../Loaders/IconLoader';

type Props = {
    left?: boolean;
    right?: boolean;
    itemIds: [number, number, number, number, number, number];
};

function CharacterItems({ left = false, right = false }: Props): JSX.Element {
    const styleContext = useContext(StyleContext);
    const dimensions = Dimensions.get('window');
    const imageHeight = dimensions.width / 0.73;
    const topMargin = imageHeight / 2 - 217;

    //TODO: zamienić zupełnie na pobieranie itemów grupowym zapytaniem
    useEffect(() => {
        (async () => {
            if (searchString.length > 0) {
                setSearching(true);
                const response = await searchCharacter(searchString);
                if (response.ok) {
                    setResult((await response.json()).Results);
                } else {
                    console.error((await response.json()).Message);
                }
                setSearching(false);
            }
        })();
    }, [searchString]);

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

export default CharacterItems;
