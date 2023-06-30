import { useContext } from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { StyleContext } from '../../context/StyleContext';

function CharacterTitleLoader(): JSX.Element {
    const styleContext = useContext(StyleContext);
    return (
        <ContentLoader
            speed={1.2}
            width={280}
            height={70}
            viewBox="0 0 280 70"
            backgroundColor={styleContext.colors.secondaryAccent}
            foregroundColor={styleContext.colors.secondary}
        >
            <Rect x="5" y="5" rx="4" ry="4" width="70" height="70" />
            <Rect x="86" y="18" rx="8" ry="8" width="180" height="16" />
            <Rect x="86" y="42" rx="8" ry="8" width="180" height="16" />
        </ContentLoader>
    );
}

export default CharacterTitleLoader;
