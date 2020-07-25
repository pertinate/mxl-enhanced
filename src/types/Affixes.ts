import sacredUniques from '../JSON/uniques.json';
import tieredUniques from '../JSON/tiereduniques.json';
import sets from '../JSON/sets.json';
import rare from '../JSON/rare-affixes.json';

export const getAffixes = () => {
    return [
        ...sacredUniques.map(affix => affix.name),
        ...tieredUniques.map(affix => affix.name),
        ...sets.map(affix => affix.name),
        ...rare
    ];
};

export {
    sacredUniques,
    tieredUniques,
    sets,
    rare
};
