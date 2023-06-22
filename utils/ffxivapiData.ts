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

export async function getCharacterData(id: number) {
    return await fetch('https://xivapi.com/character/' + id);
}
