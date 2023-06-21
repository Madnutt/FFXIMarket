import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
function CharacterIcon({ color = '#FFF' }): JSX.Element {
    return (
        <Svg width={24} height={24} fill="none">
            <Path
                fill={color}
                fillOpacity={0.74}
                d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm6 10a1 1 0 0 0 1-1 7 7 0 1 0-14 0 1 1 0 0 0 1 1h12Z"
            />
        </Svg>
    );
}
export default CharacterIcon;
