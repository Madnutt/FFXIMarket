import { useContext } from 'react';
import { StyleContext } from './StyleContext';
import { View } from 'react-native';

function Divider(): JSX.Element {
    const styleContext = useContext(StyleContext);
    return (
        <View
            style={{
                height: 1,
                marginHorizontal: 15,
                marginVertical: 10,
                backgroundColor: styleContext.colors.complimentAccent,
            }}
        />
    );
}

export default Divider;
