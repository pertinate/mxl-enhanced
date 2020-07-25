import dungeonCharms from '../JSON/dungeon-charms.json';
import riftCharms from '../JSON/rift-charms.json';
import effigy from '../JSON/effigy.json';
import sacredUniques from '../JSON/sacreduniquenames.json';
import tieredUniques from '../JSON/tiereduniquenames.json';

export const allNames = () => {
    return [
        ...dungeonCharms,
        ...riftCharms,
        ...effigy,
        ...sacredUniques,
        ...tieredUniques
    ];
};

export {
    dungeonCharms,
    riftCharms,
    effigy,
    sacredUniques,
    tieredUniques
};
