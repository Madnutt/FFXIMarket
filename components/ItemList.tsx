import { useContext, useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { StyleContext } from './StyleContext';
import ListItemLoader from './Loaders/ListItemLoader';
import CharacterTitleLoader from './Loaders/CharacterTitleLoader';
import Divider from './Divider';
import ItemSearchLoading from './ItemList/ItemSearchLoading';
import { searchItem } from '../utils/ffxivapiData';
import HeartIcon from './Svg/HeartIcon';

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
            {results &&
                !searching &&
                searchString &&
                results.map((result, index) => {
                    return (
                        <View key={'result-' + index}>
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
                                            uri:
                                                'https://xivapi.com' +
                                                decodeURIComponent(result.Icon),
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
                                            color: styleContext.colors
                                                .compliment,
                                            verticalAlign: 'middle',
                                        }}
                                    >
                                        {result.Name}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        position: 'absolute',
                                        top: 26,
                                        right: 12,
                                    }}
                                >
                                    <HeartIcon />
                                </View>
                            </View>
                            {index < results.length - 1 && <Divider />}
                        </View>
                    );
                })}

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
