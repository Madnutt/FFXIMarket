import { useState } from 'react';
import { ScreenStackList } from '../StyleContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import SearchInput from '../SearchInput';
import ItemList from '../ItemList';
import CharacterList from '../CharacterList';
import { useDebouncedCallback } from 'use-debounce';

export enum SearchTypes {
    CHARACTER = 'character',
    ITEM = 'item',
}

type Props = NativeStackScreenProps<ScreenStackList, 'Search'>;

function Search({ navigation }: Props): JSX.Element {
    const [searchType, setSearchType] = useState(SearchTypes.CHARACTER);
    const [searchInput, setSearchInput] = useState('');

    const setDebounced = useDebouncedCallback((string: string) => {
        setSearchInput(string);
    }, 1200);

    // TODO: Ujednolicić listy wyszukiwania bo jest dużo powtarzalnych elementów

    return (
        <>
            <SearchInput
                setSearchInput={setDebounced}
                typeState={searchType}
                typeSetState={setSearchType}
            />
            {searchType === SearchTypes.ITEM && (
                <ItemList searchString={searchInput} />
            )}
            {searchType === SearchTypes.CHARACTER && (
                <CharacterList
                    searchString={searchInput}
                    navigation={navigation}
                />
            )}
        </>
    );
}

export default Search;
