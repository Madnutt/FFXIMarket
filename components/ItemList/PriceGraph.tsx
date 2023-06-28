import { useEffect, useState } from 'react';
import { ColorValue, ProcessedColorValue, processColor } from 'react-native';
import { LineChart } from 'react-native-charts-wrapper';
import {
    DividedItems,
    UniversalisSaleHistory,
    divideQuality,
    getSaleHistory,
} from '../../utils/universalisData';
import { Text } from 'react-native-svg';

interface Props {
    itemId: number;
}

function PriceGraph({ itemId }: Props): JSX.Element {
    const green = processColor('rgb(0,255,0)');
    const white = processColor('rgb(255,255,255)');
    const [result, setResult] = useState<DividedItems>();

    useEffect(() => {
        (async () => {
            const response = await getSaleHistory(itemId);
            if (response.ok) {
                const res = (await response.json()) as UniversalisSaleHistory;
                const divided = divideQuality(res);
                if (divided) {
                    setResult(divided);
                }
            } else {
                console.error((await response.json()).title);
            }
        })();
    }, [itemId]);

    if (result !== null && result !== undefined) {
        return (
            <LineChart
                style={{ flex: 1 }}
                legend={{ textColor: white }}
                xAxis={{ enabled: false }}
                yAxis={{
                    left: { textColor: white },
                    right: { enabled: false },
                }}
                chartDescription={{ text: '' }}
                marker={{ enabled: true }}
                data={{
                    dataSets: [
                        {
                            label: 'Price NQ',
                            values: result.nqItems,
                            config: {
                                valueTextColor: white,
                                drawValues: false,
                            },
                        },
                        {
                            label: 'Price HQ',
                            values: result.hqItems,
                            config: {
                                color: green,
                                circleColor: green,
                                valueTextColor: white,
                                drawValues: false,
                            },
                        },
                    ],
                }}
            />
        );
    } else if (result !== undefined) {
        return <Text>No sale history for this item</Text>;
    } else {
        return <Text>Loading</Text>;
    }
}

export default PriceGraph;
