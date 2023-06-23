import { useEffect, useState } from 'react';
import {
    CharacterDataResponse,
    GearSet,
    getCharacterData,
    getJobIcon,
} from '../../utils/ffxivapiData';
import CharacterTitleLoader from '../Loaders/CharacterTitleLoader';
import { Image, View } from 'react-native';
import CharacterItems from '../ItemList/CharacterItems';
import CharacterTitle from './CharacterTitle';

interface Props {
    characterId: number;
}

function CharacterView({ characterId }: Props): JSX.Element {
    const [result, setResult] = useState<CharacterDataResponse>();
    const [gearSet, setGearSet] = useState<GearSet>();

    useEffect(() => {
        (async () => {
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
            {!result && <CharacterTitleLoader />}
            {result && (
                <CharacterTitle
                    lvl={result.Character.ActiveClassJob.Level}
                    name={result.Character.Name}
                    jobIcon={
                        'https://xivapi.com' +
                        result.Character.ActiveClassJob.JobIcon
                    }
                />
            )}
            {/* <CharacterTitleLoader /> */}
            {result && (
                <View style={{ position: 'relative' }}>
                    <Image
                        source={{
                            uri: decodeURIComponent(result?.Character.Portrait),
                        }}
                        style={{
                            resizeMode: 'contain',
                            aspectRatio: 0.73,
                        }}
                    />
                    <CharacterItems
                        itemIds={[
                            gearSet!.MainHand.ID,
                            gearSet!.Head.ID,
                            gearSet!.Body.ID,
                            gearSet!.Hands.ID,
                            gearSet!.Legs.ID,
                            gearSet!.Feet.ID,
                        ]}
                        left
                    />
                    <CharacterItems
                        itemIds={[
                            gearSet!.OffHand.ID,
                            gearSet!.Earrings.ID,
                            gearSet!.Necklace.ID,
                            gearSet!.Bracelets.ID,
                            gearSet!.Ring1.ID,
                            gearSet!.Ring2.ID,
                        ]}
                        right
                    />
                </View>
            )}
        </>
    );
}

export default CharacterView;
