import { useEffect, useState } from 'react';
import {
    CharacterDataResponse,
    GearSet,
    getCharacterData,
    getJobIcon,
} from '../../utils/ffxivapiData';
import { Image, View } from 'react-native';
import CharacterItems from '../ItemList/CharacterItems';
import CharacterTitle from './CharacterTitle';
import CharacterViewLoader from '../Loaders/CharacterViewLoader';

interface Props {
    characterId: number;
}

function CharacterView({ characterId }: Props): JSX.Element {
    const [result, setResult] = useState<CharacterDataResponse>();
    const [gearSet, setGearSet] = useState<GearSet>();

    useEffect(() => {
        (async () => {
            setResult(undefined);
            const response = await getCharacterData(characterId);
            if (response.ok) {
                const res = (await response.json()) as CharacterDataResponse;
                const icon = await getJobIcon(
                    res.Character.ActiveClassJob.ClassID
                );
                // console.log((await icon.json()).Icon);
                res.Character.ActiveClassJob.JobIcon = (await icon.json()).Icon;
                setResult(res);
                setGearSet(res.Character.GearSet.Gear);
            } else {
                console.error((await response.json()).Message);
            }
        })();
    }, [characterId]);

    return (
        <>
            {!result && <CharacterViewLoader />}
            {result && gearSet && (
                <>
                    <CharacterTitle
                        lvl={result.Character.ActiveClassJob.Level}
                        name={result.Character.Name}
                        jobIcon={
                            'https://xivapi.com' +
                            result.Character.ActiveClassJob.JobIcon
                        }
                    />
                    <View style={{ position: 'relative' }}>
                        <Image
                            source={{
                                uri: decodeURIComponent(
                                    result?.Character.Portrait
                                ),
                            }}
                            style={{
                                resizeMode: 'contain',
                                aspectRatio: 0.73,
                            }}
                        />
                        <CharacterItems
                            itemIds={[
                                gearSet!.MainHand ? gearSet!.MainHand.ID : -1,
                                gearSet!.Head ? gearSet!.Head.ID : -1,
                                gearSet!.Body ? gearSet!.Body.ID : -1,
                                gearSet!.Hands ? gearSet!.Hands.ID : -1,
                                gearSet!.Legs ? gearSet!.Legs.ID : -1,
                                gearSet!.Feet ? gearSet!.Feet.ID : -1,
                            ]}
                            left
                        />
                        <CharacterItems
                            itemIds={[
                                gearSet!.OffHand ? gearSet!.OffHand.ID : -1,
                                gearSet!.Earrings ? gearSet!.Earrings.ID : -1,
                                gearSet!.Necklace ? gearSet!.Necklace.ID : -1,
                                gearSet!.Bracelets ? gearSet!.Bracelets.ID : -1,
                                gearSet!.Ring1 ? gearSet!.Ring1.ID : -1,
                                gearSet!.Ring2 ? gearSet!.Ring2.ID : -1,
                            ]}
                            right
                        />
                    </View>
                </>
            )}
        </>
    );
}

export default CharacterView;
