import { useContext, useEffect, useState } from 'react';
import { Dimensions, Image, View } from 'react-native';
import { StyleContext } from '../../context/StyleContext';
import { ItemData, getItemsData } from '../../utils/ffxivapiData';

type Props = {
    left?: boolean;
    right?: boolean;
    itemIds: [number, number, number, number, number, number];
};

function CharacterItems({
    itemIds,
    left = false,
    right = false,
}: Props): JSX.Element {
    const [result, setResult] = useState<Record<number, ItemData>>();
    const styleContext = useContext(StyleContext);
    const dimensions = Dimensions.get('window');
    const imageHeight = dimensions.width / 0.73;
    const topMargin = imageHeight / 2 - 217;
    const noItems = {} as Record<number, ItemData>;

    const orderedItems = {} as Record<number, number>;

    // Save indexes to preserve default sort
    itemIds.forEach((val, i) => {
        orderedItems[i] = val;
        if (val === -1) {
            noItems[i] = {
                Icon: '',
                ID: -1,
                Name: '',
            };
        }
    });

    useEffect(() => {
        (async () => {
            const response = await getItemsData(itemIds);
            if (response.ok) {
                const results = (await response.json()).Results as ItemData[];
                const ordered = {} as Record<number, ItemData>;

                let lastItem = 0;

                results.forEach((val) => {
                    let index = Number(
                        Object.keys(orderedItems).find(
                            (key) => orderedItems[Number(key)] === val.ID
                        )
                    );

                    // Only rings can be duplicated in inventory so we're just adding one after the other
                    if (val.ID === lastItem) {
                        ordered[index! + 1] = val;
                    } else {
                        ordered[index!] = val;
                    }

                    lastItem = val.ID;
                });

                const allSlots = {
                    ...ordered,
                    ...noItems,
                };
                setResult(allSlots);
            } else {
                console.error((await response.json()).Message);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemIds]);

    return (
        <View
            style={{
                position: 'absolute',
                width: 64,
                height: 434,
                rowGap: 10,
                top: topMargin,
                backgroundColor: styleContext.colors.secondary,
                ...(left && { left: 16 }),
                ...(right && { right: 16 }),
            }}
        >
            {result &&
                Object.keys(result).map((value, index) => {
                    const val = result[Number(value)];
                    if (val.ID === -1) {
                        return (
                            <View
                                key={value + ' - ' + index}
                                style={{
                                    height: 64,
                                }}
                            />
                        );
                    }
                    return (
                        <Image
                            key={value}
                            source={{ uri: 'https://xivapi.com' + val.Icon }}
                            style={{ width: 64, height: 64 }}
                        />
                    );
                })}
        </View>
    );
}

export default CharacterItems;
