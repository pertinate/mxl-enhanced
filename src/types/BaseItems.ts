export const tiers = [1, 2, 3, 4, 'Sacred'];
export const quality = {
    normal: 'Normal',
    magic: 'Magic',
    rare: 'Rare',
    unique: 'Unique',
    runeword: "Runeword"
};

export const BaseItems = {
    "One-Handed Swords": [
        ...[
            "Short Sword",
            "Scimitar",
            "Saber",
            "Falchion",
            "Broad Sword",
            "Long Sword",
            "War Sword"
        ].map(item => ({ baseName: item, tiers, requiredClass: "" }))
    ],
    "Two-Handed Swords": [
        ...[
            "Two-Handed Sword",
            "Claymore",
            "Giant Sword",
            "Bastard Sword",
            "Flamberge",
            "Great Sword",
        ].map(item => ({ baseName: item, tiers, requiredClass: "" }))
    ],
    "Crystal Swords": [
        ...[
            "Crystal Sword"
        ].map(item => ({ baseName: item, tiers, requiredClass: "" }))
    ],
    "One-Handed Axes": [
        ...[
            "Hand Axe",
            "Axe",
            "Dobule Axe",
            "Military Pick",
            "War Axe"
        ].map(item => ({ baseName: item, tiers, requiredClass: "" }))
    ],
    "Two-Handed Axes": [
        ...[
            "Large Axe",
            "Broad Axe",
            "Battle Axe",
            "Great Axe",
            "Giant Axe"
        ].map(item => ({ baseName: item, tiers, requiredClass: "" }))
    ],
    "Maces": [
        ...[
            "Club",
            "Spiked Club",
            "Mace",
            "Morning Star",
            "Flail"
        ].map(item => ({ baseName: item, tiers, requiredClass: "" }))
    ],
    "Hammers": [
        ...[
            "War Hammer",
            "Maul",
            "Great Maul"
        ].map(item => ({ baseName: item, tiers, requiredClass: "" }))
    ],
    "Scepters": [
        ...[
            "Scepter",
            "Grand Scepter",
            "War Scepter"
        ].map(item => ({ baseName: item, tiers, requiredClass: "" }))
    ],
    "Javelins": [
        ...[
            "Javelin",
            "Pilum",
            "Short Spear",
            "Glaive",
            "Throwing Spear"
        ].map(item => ({ baseName: item, tiers, requiredClass: "" }))
    ],
    "Spears": [
        ...[
            "Spear",
            "Trident",
            "Brandistock",
            "Spetum",
            "Pike"
        ].map(item => ({ baseName: item, tiers, requiredClass: "" }))
    ],
    "Scythes": [
        ...[
            "Scythe"
        ].map(item => ({ baseName: item, tiers, requiredClass: "" }))
    ],
    "Daggers": [
        ...[
            "Dagger",
            "Dirk",
            "Kriss",
            "Blade"
        ].map(item => ({ baseName: item, tiers, requiredClass: "" }))
    ],
    "Throwing Knives": [
        ...[
            "Throwing Knife",
            "Flying Knife",
            "Balanced Knife"
        ].map(item => ({ baseName: item, tiers, requiredClass: "" }))
    ],
    "Throwing Axes": [
        ...[
            "Throwing Axe",
            "Balanced Axe"
        ].map(item => ({ baseName: item, tiers, requiredClass: "" }))
    ],
    "Staves": [
        ...[
            "Short Staff",
            "Long Staff",
            "Gnarled Staff",
            "Battle Staff",
            "War Staff"
        ].map(item => ({ baseName: item, tiers, requiredClass: "" }))
    ],
    "Bows": [
        ...[
            "Short Bow",
            "Hunter's Bow",
            "Long Bow",
            "Composite Bow",
            "Short Battle Bow",
            "Long Battle Bow",
            "Short War Bow",
            "Long War Bow"
        ].map(item => ({ baseName: item, tiers, requiredClass: "" }))
    ],
    "Crossbows": [
        ...[
            "Light Crossbow",
            "Crossbow",
            "Heavy Crossbow",
            "Repeating Crossbow"
        ].map(item => ({ baseName: item, tiers, requiredClass: "" }))
    ],
    "Amazon Bows": [
        ...[
            "Stag Bow",
            "Reflex Bow"
        ].map(item => ({ baseName: item, tiers, requiredClass: "Amazon" }))
    ],
    "Amazon Spears": [
        ...[
            "Maiden Spear",
            "Maiden Pike"
        ].map(item => ({ baseName: item, tiers, requiredClass: "Amazon" }))
    ],
    "Amazon Javelins": [
        ...[
            "Maiden Javelin"
        ].map(item => ({ baseName: item, tiers, requiredClass: "Amazon" }))
    ],
    "Assassin Claws": [
        ...[
            "Katar",
            "Wrist Blade",
            "Hatchet Hands",
            "Cestus",
            "Claws",
            "Blade Talons",
            "Scissors Katar"
        ].map(item => ({ baseName: item, tiers, requiredClass: "Assassin" }))
    ],
    "Assassin Naginatas": [
        ...[
            "Halberd",
            "Naginata"
        ].map(item => ({ baseName: item, tiers, requiredClass: "Assassin" }))
    ],
    "Barbarian Swords": [
        ...[
            "Spatha",
            "Backsword",
            "Ida",
            "Bronze Sword",
            "Kriegsmesser"
        ].map(item => ({ baseName: item, tiers, requiredClass: "Barbarian" }))
    ],
    "Barbarian One-Handed Axes": [
        ...[
            "Mammen Axe",
            "Hammerhead Axe"
        ].map(item => ({ baseName: item, tiers, requiredClass: "Barbarian" }))
    ],
    "Barbarian Two-Handed Axes": [
        ...[
            "Ono",
            "Valaska",
            "Labrys"
        ].map(item => ({ baseName: item, tiers, requiredClass: "Barbarian" }))
    ],
    "Druid Bows": [
        ...[
            "Compound Bow",
            "Serpent Bow",
            "Maple Bow",
            "Viper Bow",
            "Recurve Bow"
        ].map(item => ({ baseName: item, tiers, requiredClass: "Druid" }))
    ],
    "Druid Staves": [
        ...[
            "Flamen Staff"
        ].map(item => ({ baseName: item, tiers, requiredClass: "Druid" }))
    ],
    "Necromancer Scythes": [
        ...[
            "Raptor Scythe",
            "Bonesplitter"
        ].map(item => ({ baseName: item, tiers, requiredClass: "Necromancer" }))
    ],
    "Necromancer Staves": [
        ...[
            "Marrow Staff"
        ].map(item => ({ baseName: item, tiers, requiredClass: "Necromancer" }))
    ],
    "Necromancer Daggers": [
        ...[
            "Hexblade",
            "Spirit Edge"
        ].map(item => ({ baseName: item, tiers, requiredClass: "Necromancer" }))
    ],
    "Necromancer Crossbows": [
        ...[
            "Needle Crossbow",
            "Dart Thrower",
            "Stinger Crossbow",
            "Trebuchet"
        ].map(item => ({ baseName: item, tiers, requiredClass: "Necromancer" }))
    ],
    "Necromancer Wands": [
        ...[
            "Wand",
            "Yew Wand",
            "Bone Wand",
            "Grim Wand"
        ].map(item => ({ baseName: item, tiers, requiredClass: "Necromancer" }))
    ],
    "Paladin Clubs": [
        ...[
            "Bonebreaker"
        ].map(item => ({ baseName: item, tiers, requiredClass: "Paladin" }))
    ],
    "Paladin Maces": [
        ...[
            "Goedendag",
            "Angel Star"
        ].map(item => ({ baseName: item, tiers, requiredClass: "Paladin" }))
    ],
    "Paladin Hammers": [
        ...[
            "Hand of God"
        ].map(item => ({ baseName: item, tiers, requiredClass: "Paladin" }))
    ],
    "Paladin Spears": [
        ...[
            "Holy Lance",
            "Tepoztopilli"
        ].map(item => ({ baseName: item, tiers, requiredClass: "Paladin" }))
    ],
    "Sorceress Orbs": [
        ...[
            "Eagle Orb",
            "Sacred Globe",
            "Smoked Sphere",
            "Clasped Orb",
            "Jared's Stone"
        ].map(item => ({ baseName: item, tiers, requiredClass: "Sorceress" }))
    ],
    "Sorceress Crystal Swords": [
        ...[
            "Warp Blade"
        ].map(item => ({ baseName: item, tiers, requiredClass: "Sorceress" }))
    ],
    "Body Armors": [
        ...[
            "Quilted Armor",
            "Leather Armor",
            "Hard Leather Armor",
            "Studded Leather",
            "Ring Mail",
            "Scale Mail",
            "Chain Mail",
            "Breast Plate",
            "Splint Mail",
            "Plate Mail",
            "Field Plate",
            "Light Plate",
            "Gothic Plate",
            "Full Plate Mail",
            "Ancient Armor"
        ].map(item => ({ baseName: item, tiers, requiredClass: "" }))
    ],
    "Helms": [
        ...[
            "Cap",
            "Skull Cap",
            "Helm",
            "Full Helm",
            "Great Helm",
            "Crown"
        ].map(item => ({ baseName: item, tiers, requiredClass: "" }))
    ],
    "Circlets": [
        ...[
            "Circlet",
            "Coronet",
            "Tiara",
            "Diadem"
        ].map(item => ({ baseName: item, tiers, requiredClass: "" }))
    ],
    "Special Helms": [
        ...[
            "Mask",
            "Bone Helm"
        ].map(item => ({ baseName: item, tiers, requiredClass: "" }))
    ],
    "Shields": [
        ...[
            "Buckler",
            "Small Shield",
            "Large Shield",
            "Kite Shield",
            "Tower Shield",
            "Gothic Shield"
        ].map(item => ({ baseName: item, tiers, requiredClass: "" }))
    ],
    "Special Shields": [
        ...[
            "Bone Shield",
            "Spiked Shield"
        ].map(item => ({ baseName: item, tiers, requiredClass: "" }))
    ],
    "Belts": [
        ...[
            "Sash",
            "Light Belt",
            "Belt",
            "Heavy Belt",
            "Plated Belt"
        ].map(item => ({ baseName: item, tiers, requiredClass: "" }))
    ],
    "Gloves": [
        ...[
            "Leather Gloves",
            "Heavy Gloves",
            "Chain Gloves",
            "Light Gauntlets",
            "Gauntlets"
        ].map(item => ({ baseName: item, tiers, requiredClass: "" }))
    ],
    "Boots": [
        ...[
            "Boots",
            "Heavy Boots",
            "Chain Boots",
            "Light Plated Boots",
            "Greaves"
        ].map(item => ({ baseName: item, tiers, requiredClass: "" }))
    ],
    "Amazon Helms": [
        ...[
            "Morion",
            "Cervelliere",
            "Einherjar Helm",
            "Spangenhelm"
        ].map(item => ({ baseName: item, tiers, requiredClass: "Amazon" }))
    ],
    "Amazon Shields": [
        ...[
            "Athulua's Hand",
            "Phoenix Shield",
            "Setzchild"
        ].map(item => ({ baseName: item, tiers, requiredClass: "Amazon" }))
    ],
    "Assassin Shields": [
        ...[
            "Parma",
            "Aspis",
            "Totem Shield",
            "Bladed Shield"
        ].map(item => ({ baseName: item, tiers, requiredClass: "Assassin" }))
    ],
    "Barbarian Helms": [
        ...[
            "Jawbone Cap",
            "Fanged Helm",
            "Horned Helm",
            "Assault Helmet",
            "Avenger Guard"
        ].map(item => ({ baseName: item, tiers, requiredClass: "Barbarian" }))
    ],
    "Barbarian Shields": [
        ...[
            "Bull Shield",
            "Bronze Shield",
            "Gilded Shield"
        ].map(item => ({ baseName: item, tiers, requiredClass: "Barbarian" }))
    ],
    "Druid Helms": [
        ...[
            "Wolf Head",
            "Hawk Helm",
            "Antlers",
            "Falcon Mask",
            "Spirit Mask"
        ].map(item => ({ baseName: item, tiers, requiredClass: "Druid" }))
    ],
    "Necromancer Shields": [
        ...[
            "Preserved Head",
            "Zombie Head",
            "Unraveller Head",
            "Gargoyle Head",
            "Demon Head"
        ].map(item => ({ baseName: item, tiers, requiredClass: "Necromancer" }))
    ],
    "Paladin Helms": [
        ...[
            "Hundsgugel",
            "Blackguard Helm"
        ].map(item => ({ baseName: item, tiers, requiredClass: "Paladin" }))
    ],
    "Paladin Shields": [
        ...[
            "Targe",
            "Rondache",
            "Heraldic Shield",
            "Aerin Shield",
            "Crown Shield"
        ].map(item => ({ baseName: item, tiers, requiredClass: "Paladin" }))
    ],
    "Sorceress Body Armors": [
        ...[
            "Gambeson",
            "Kazarghand",
            "Lamellar Armor",
            "Banded Plate",
            "Ceremonial Armor"
        ].map(item => ({ baseName: item, tiers, requiredClass: "Sorceress" }))
    ],
    "Jewellry": [
        ...[
            "Amulet",
            "Ring"
        ].map(item => ({ baseName: item, tiers, requiredClass: '' }))
    ]
};

// export const uniques = [
//     {
//         name: "The Xiphos",
//         ...((item = BaseItems["One-Handed Swords"].find(sword => sword.baseName === 'Short Sword')) => {
//             return ({
//                 tier: item.tiers[4],
//                 baseItem: item
//             });
//         })(),
//         modRolls:[
//             {
//                 name: 'Orb Effects Applied to this item are Doubled',
//                 min: '',
//                 max: ''
//             },
//             {
//                 name: '2% Chance to cast level 5 Shatterblade on Striking',
//                 min: '',
//                 max: ''
//             },
//             {
//                 name: '#% Attack Speed',
//                 min: '',
//                 max: ''
//             },
//             {
//                 name: '+#% Enhanced Damage',
//                 min: '',
//                 max: ''
//             },
//             {
//                 name: '+# to Maximum Damage',
//                 min: '',
//                 max: ''
//             },
//             {
//                 name: '0.125% Chance of Crushing Blow (Based on Character Level)',
//                 min: '',
//                 max: ''
//             },
//             {
//                 name: 'Physical Resist 5%',
//                 min: '',
//                 max: ''
//             }
//         ]
//     }
// ];
