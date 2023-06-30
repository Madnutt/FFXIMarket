import { createContext } from 'react';

const CharacterContext = createContext({
    characterId: -1,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setCharacterId: (characterId: number) => {},
});

export default CharacterContext;
