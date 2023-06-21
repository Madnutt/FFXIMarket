import { useState } from 'react';
import { ScreenStackList } from '../StyleContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import SearchInput from '../SearchInput';
import ItemList from '../ItemList';
import { Text } from 'react-native';
import CharacterList from '../CharacterList';

export enum SearchTypes {
    CHARACTER = 'character',
    ITEM = 'item',
}

function Search(): JSX.Element {
    const [searchType, setSearchType] = useState(SearchTypes.CHARACTER);
    return (
        <>
            <SearchInput typeState={searchType} typeSetState={setSearchType} />
            {searchType === SearchTypes.ITEM && <ItemList />}
            {searchType === SearchTypes.CHARACTER && <CharacterList />}
        </>
    );
}

export default Search;
