import { useContext } from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { StyleContext } from '../Context/StyleContext';

function IconLoader(): JSX.Element {
    const styleContext = useContext(StyleContext);
    return (
        <ContentLoader
            speed={1.2}
            width={64}
            height={64}
            viewBox="0 0 64 64"
            backgroundColor={styleContext.colors.secondaryAccent}
            foregroundColor={styleContext.colors.secondary}
        >
            <Rect x="0" y="0" rx="4" ry="4" width="64" height="64" />
        </ContentLoader>
    );
}

export default IconLoader;
