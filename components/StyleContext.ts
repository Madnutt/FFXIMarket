import { createContext } from 'react';

export enum Screen {
    Favourites,
    Search,
    Character,
}

export type ScreenStackList = {
    Character: { characterId: number };
    Search: undefined;
    Favourites: undefined;
};

export const StyleContext = createContext({
    colors: {
        primary: 'rgb(0, 196, 255)',
        primaryAccent: 'rgb(51, 208, 255)',
        secondary: 'rgb(50, 50, 50)',
        secondaryAccent: 'rgb(71, 71, 71)',
        compliment: 'rgb(255, 255, 255)',
        complimentAccent: 'rgb(235, 235, 235)',
        text: 'rgb(0, 0, 0)',
    },
});
