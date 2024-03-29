import { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { StyleContext } from '../context/StyleContext';
import Divider from './Divider';
import ItemSearchLoading from './ItemList/ItemSearchLoading';
import { searchItem } from '../utils/ffxivapiData';
import HeartIcon from './Svg/HeartIcon';
import SingleItemResult from './ItemList/SingleItemResult';
import AppDataContext from '../context/AppDataContext';

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
    const { favourites, setFavourite } = useContext(AppDataContext);

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
                paddingTop: 20,
                paddingBottom: 80,
            }}
        >
            {foundResults && (
                <ScrollView>
                    {results.map((result, index) => {
                        const isFavourite =
                            favourites.findIndex((value) => {
                                return value === result.ID;
                            }) !== -1;

                        return (
                            <View key={result.ID}>
                                <SingleItemResult
                                    key={'resultContent-' + index}
                                    iconUrl={
                                        'https://xivapi.com' +
                                        decodeURIComponent(result.Icon)
                                    }
                                    name={result.Name}
                                    IconElement={HeartIcon}
                                    iconColor={isFavourite ? '#F00' : undefined}
                                    iconCallback={() => setFavourite(result.ID)}
                                />
                                {index < results.length - 1 && <Divider />}
                            </View>
                        );
                    })}
                </ScrollView>
            )}
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
