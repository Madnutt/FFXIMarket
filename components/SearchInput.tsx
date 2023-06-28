import { useContext } from 'react';
import { TextInput, View } from 'react-native';
import { StyleContext } from './StyleContext';
import { Picker } from '@react-native-picker/picker';
import SpyGlassIcon from './Svg/SpyGlassIcon';
import { SearchTypes } from './Screens/Search';
import type { DebouncedState } from 'use-debounce';

interface Props {
    typeState: SearchTypes;
    typeSetState: React.Dispatch<React.SetStateAction<SearchTypes>>;
    setSearchInput: DebouncedState<(string: string) => void>;
}

function SearchInput({
    typeState,
    typeSetState,
    setSearchInput,
}: Props): JSX.Element {
    const styleContext = useContext(StyleContext);

    return (
        <View style={{ position: 'relative', margin: 16, marginBottom: 0 }}>
            <TextInput
                style={{
                    borderRadius: 4,
                    backgroundColor: styleContext.colors.compliment,
                    textAlignVertical: 'center',
                    paddingLeft: 56,
                    paddingRight: 150,
                }}
                placeholder="Label"
                onChangeText={(value) => {
                    setSearchInput(value);
                }}
            />
            <View style={{ position: 'absolute', top: 13, left: 13 }}>
                <SpyGlassIcon />
            </View>
            <View
                style={{
                    position: 'absolute',
                    height: '100%',
                    right: 0,
                    width: 143,
                    borderLeftWidth: 2,
                    borderColor: styleContext.colors.secondary,
                }}
            >
                <Picker
                    itemStyle={{
                        textAlign: 'center',
                        textAlignVertical: 'center',
                    }}
                    style={{
                        marginTop: -1,
                    }}
                    selectedValue={typeState}
                    onValueChange={(itemValue) => {
                        typeSetState(itemValue);
                    }}
                >
                    <Picker.Item
                        style={{ fontSize: 14 }}
                        label="Character"
                        value={SearchTypes.CHARACTER}
                    />
                    <Picker.Item
                        style={{ fontSize: 14 }}
                        label="Item"
                        value={SearchTypes.ITEM}
                    />
                </Picker>
            </View>
        </View>
    );
}

export default SearchInput;
