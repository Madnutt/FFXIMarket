import { useState } from 'react';
import { ScreenStackList } from '../StyleContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import SearchInput from '../SearchInput';
import ItemList from '../ItemList';
import { Text } from 'react-native';
import CharacterList from '../CharacterList';
import { useDebouncedCallback } from 'use-debounce';

export enum SearchTypes {
    CHARACTER = 'character',
    ITEM = 'item',
}

function Search(): JSX.Element {
    const [searchType, setSearchType] = useState(SearchTypes.CHARACTER);
    const [searchInput, setSearchInput] = useState('');

    const setDebounced = useDebouncedCallback((string: string) => {
        setSearchInput(string);
    }, 1200);

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
                <CharacterList searchString={searchInput} />
            )}
        </>
    );
}

export default Search;
