import { useContext, useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { StyleContext } from './StyleContext';
import ListItemLoader from './Loaders/ListItemLoader';
import CharacterTitleLoader from './Loaders/CharacterTitleLoader';
import { searchCharacter } from '../utils/ffxivapiData';
import CharacterSearchLoading from './CharacterList/CharacterSearchLoading';
import Divider from './Divider';

interface Props {
    searchString: string;
}

interface FfxivApiResponse {
    Avatar: string;
    ID: number;
    Name: string;
    Server: string;
}

function CharacterList({ searchString }: Props): JSX.Element {
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
                paddingHorizontal: 16,
                paddingVertical: 20,
            }}
        >
            {foundResults &&
                results.map((result, index) => {
                    return (
                        <View key={'result-' + index}>
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
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
                                        source={{ uri: result.Avatar }}
                                    />
                                </View>
                                <View style={{ marginLeft: 20, marginTop: 6 }}>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            lineHeight: 24,
                                            color: styleContext.colors
                                                .compliment,
                                            marginBottom: 10,
                                        }}
                                    >
                                        {result.Name}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            lineHeight: 24,
                                            color: styleContext.colors
                                                .compliment,
                                        }}
                                    >
                                        {result.Server}
                                    </Text>
                                </View>
                            </View>
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

            {searching && <CharacterSearchLoading />}

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

export default CharacterList;
