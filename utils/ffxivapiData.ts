export type CharacterDataResponse = {
    Character: {
        Portrait: string;
        ActiveClassJob: {
            ClassID: number;
            JobID: number;
            Level: number;
            UnlockedState: {
                Name: string;
            };
            JobIcon: string;
        };
        GearSet: {
            Gear: GearSet;
        };
        Name: string;
    };
};

export type GearSet = {
    Body: { ID: number };
    Bracelets: { ID: number };
    Earrings: { ID: number };
    Feet: { ID: number };
    Hands: { ID: number };
    Head: { ID: number };
    Legs: { ID: number };
    MainHand: { ID: number };
    Necklace: { ID: number };
    OffHand: { ID: number };
    Ring1: { ID: number };
    Ring2: { ID: number };
};

// TODO: Podawać serwer zamiast używać domyśnego
export async function searchCharacter(search: string, server = 'Spriggan') {
    return await fetch(
        'https://xivapi.com/character/search?' +
            new URLSearchParams({
                name: encodeURIComponent(search),
                limit: '20',
                server,
            })
    );
}

export async function searchItem(search: string) {
    return await fetch(
        'https://xivapi.com/search?' +
            new URLSearchParams({
                string: encodeURIComponent(search),
                limit: '20',
                indexes: 'Item',
            })
    );
}

export async function getJobIcon(id: number) {
    return await fetch('https://xivapi.com/ClassJob/' + id);
}

export async function getCharacterData(id: number) {
    return await fetch('https://xivapi.com/character/' + id);
}
