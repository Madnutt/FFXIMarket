import { createContext } from 'react';

const AppDataContext = createContext({
    favourites: [] as number[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setFavourite: (itemId: number) => {},
    characterId: -1,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setCharacterId: (itemId: number) => {},
});

export default AppDataContext;
