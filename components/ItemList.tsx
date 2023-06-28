import { useContext, useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { StyleContext } from './StyleContext';
import Divider from './Divider';
import ItemSearchLoading from './ItemList/ItemSearchLoading';
import { searchItem } from '../utils/ffxivapiData';
import HeartIcon from './Svg/HeartIcon';
import SingleItemResult from './ItemList/SingleItemResult';

interface Props {
    searchString: string;
}

interface FfxivApiResponse {
    ID: number;
    Icon: string;
    Name: string;
}

function ItemList({ searchString }: Props): JSX.Element {
    const [results, setResult] = useState<FfxivApiResponse[]>();
    const styleContext = useContext(StyleContext);
    const [searching, setSearching] = useState(false);

    const foundResults =
        results && results.length > 0 && !searching && searchString;

    const noResults =
        results && results.length === 0 && !searching && searchString;

    useEffect(() => {
        (async () => {
            if (searchString.length > 0) {
                setSearching(true);
                const response = await searchItem(searchString);
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
                paddingHorizontal: 16,
                paddingVertical: 20,
            }}
        >
            {foundResults &&
                results.map((result, index) => {
                    return (
                        <View key={'result-' + index}>
                            <SingleItemResult
                                iconUrl={
                                    'https://xivapi.com' +
                                    decodeURIComponent(result.Icon)
                                }
                                name={result.Name}
                                IconElement={<HeartIcon />}
                            />
                            {index < results.length - 1 && <Divider />}
                        </View>
                    );
                })}

            {noResults && (
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
                    No results found
                </Text>
            )}

            {searching && <ItemSearchLoading />}

            {!searchString && (
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
                    Please fill in the text field to search
                </Text>
            )}
        </View>
    );
}

export default ItemList;
