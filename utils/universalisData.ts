export interface UniversalisSaleHistory {
    stackSizeHistogramNQ: Record<string, number>;
    stackSizeHistogramHQ: Record<string, number>;
    entries: ItemSaleEntry[];
}

export interface ItemSaleEntry {
    hq: boolean;
    pricePerUnit: number;
}

export interface DividedItems {
    hqItems: {
        y: number;
    }[];
    nqItems: {
        y: number;
    }[];
}

// TODO: Podawać serwer zamiast używać domyśnego
export async function getSaleHistory(itemId: number, server = 'Spriggan') {
    return await fetch(
        'https://universalis.app/api/v2/history/' + server + '/' + itemId
    );
}

export function divideQuality(data: UniversalisSaleHistory) {
    const noHq = Object.keys(data.stackSizeHistogramHQ).length === 0;
    const noNq = Object.keys(data.stackSizeHistogramNQ).length === 0;

    if (noHq && noNq) {
        return null;
    }

    const hqItems = data.entries.filter((value) => {
        return value.hq;
    });

    const nqItems = data.entries.filter((value) => {
        return !value.hq;
    });

    return { hqItems: formatToGraph(hqItems), nqItems: formatToGraph(nqItems) };
}

function formatToGraph(items: ItemSaleEntry[]) {
    const startIndex = items.length >= 20 ? items.length - 20 : 0;

    const limited = items.splice(startIndex, 20);

    return limited.map((value) => {
        return { y: value.pricePerUnit };
    });
}
