import { useContext } from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { StyleContext } from '../Context/StyleContext';

function ListItemLoader(): JSX.Element {
    const styleContext = useContext(StyleContext);
    return (
        <ContentLoader
            speed={1.2}
            width={321}
            height={66}
            viewBox="0 0 321 66"
            backgroundColor={styleContext.colors.secondaryAccent}
            foregroundColor={styleContext.colors.secondary}
        >
            <Rect x="0" y="0" rx="4" ry="4" width="66" height="66" />
            <Rect x="86" y="25" rx="8" ry="8" width="180" height="16" />
        </ContentLoader>
    );
}

export default ListItemLoader;
