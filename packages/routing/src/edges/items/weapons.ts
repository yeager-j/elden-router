import { Enemy } from "@workspace/data/enemies";
import { Item } from "@workspace/data/items";
import { Location } from "@workspace/data/locations";
import { QuestlineStage } from "@workspace/data/quests";

import { EdgeData } from "#types";
import { convertItemLocationsToEdges } from "#utils/edge-utils";

const testWeaponLocations: EdgeData[] = [
  {
    from: Location.MOUNTAINTOPS_OF_THE_GIANTS,
    to: Item.RIVERS_OF_BLOOD,
    metadata: {
      description:
        "Defeat Bloody Finger Okina when he invades in the Church of Repose",
      requirements: {},
    },
  },
  {
    from: Location.LEYNDELL_ERDTREE_SANCTUARY,
    to: Item.BOLT_OF_GRANSAX,
    metadata: {
      description:
        "This weapon is found on the giant spear lodged into the building",
      requirements: {},
    },
  },
  {
    from: Location.MT_GELMIR_VOLCANO_MANOR_POST_EIGLAY,
    to: Item.BLASPHEMOUS_BLADE,
    metadata: {
      description:
        "Trade Remembrance of the Blasphemous with Enia at Roundtable Hold.",
      requirements: {
        requiredBosses: [Enemy.RYKARD_LORD_OF_BLASPHEMY],
      },
    },
  },
];

const daggerLocations: EdgeData[] = convertItemLocationsToEdges({
  item: Item.DAGGER,
  locations: [
    {
      location: Location.ROUNDTABLE_HOLD,
      metadata: {
        description:
          "Can be purchased from Twin Maiden Husks at the Roundtable Hold for 400 Runes.",
        requirements: {},
      },
    },
    {
      location: Location.LIMGRAVE,
      metadata: {
        description: "Drops from Foot Soldiers",
        requirements: {},
      },
    },
    {
      location: Location.LIMGRAVE_MURKWATER_CAVE,
      metadata: {
        description: "Drops from Highwaymen",
        requirements: {},
      },
    },
  ],
});

const parryingDaggerLocations: EdgeData[] = convertItemLocationsToEdges({
  item: Item.PARRYING_DAGGER,
  locations: [
    {
      location: Location.LIMGRAVE_MURKWATER_CAVE,
      metadata: {
        description: "Sold by Patches the Untethered",
        requirements: {},
      },
    },
  ],
});

const misericordeLocations: EdgeData[] = convertItemLocationsToEdges({
  item: Item.MISERICORDE,
  locations: [
    {
      location: Location.LIMGRAVE_STORMVEIL_CASTLE,
      metadata: {
        description: "Past the Stonesword Key imp statue",
        requirements: {},
      },
    },
  ],
});

const greatKnifeLocations: EdgeData[] = convertItemLocationsToEdges({
  item: Item.GREAT_KNIFE,
  locations: [
    {
      location: Location.LIMGRAVE,
      metadata: {
        description: "Can be farmed from Demi-Humans near the Craftman's Shack",
        requirements: {},
      },
    },
  ],
});

const bloodstainedDaggerLocations: EdgeData[] = convertItemLocationsToEdges({
  item: Item.BLOODSTAINED_DAGGER,
  locations: [
    {
      location: Location.LIMGRAVE_WEEPING_PENINSULA,
      metadata: {
        description:
          "Can be farmed from a Demi-Human Chief sleeping before the wooden bridge leading to the Minor Erdtree",
        requirements: {},
      },
    },
  ],
});

const erdsteelDaggerLocations: EdgeData[] = convertItemLocationsToEdges({
  item: Item.ERDSTEEL_DAGGER,
  locations: [
    {
      location: Location.LEYNDELL_ROYAL_CAPITAL,
      metadata: {
        description:
          "Found NW of the Avenue Balcony site of Leyndell, Royal Capital. Drop down a pit with a Broken Statue and it will be on a corpse.",
        requirements: {},
      },
    },
  ],
});

const wakizashiLocations: EdgeData[] = convertItemLocationsToEdges({
  item: Item.WAKIZASHI,
  locations: [
    {
      location: Location.CAELID_GAOL_CAVE,
      metadata: {
        description: "Inside one of the locked cells",
        requirements: {},
      },
    },
  ],
});

const celebrantsSickleLocations: EdgeData[] = convertItemLocationsToEdges({
  item: Item.CELEBRANTS_SICKLE,
  locations: [
    {
      location: Location.ALTUS_PLATEAU,
      metadata: {
        description:
          "Rare drop from the Celebrants wielding it at the Windmill Village.",
        requirements: {},
      },
    },
  ],
});

const ivorySickleLocations: EdgeData[] = convertItemLocationsToEdges({
  item: Item.IVORY_SICKLE,
  locations: [
    {
      location: Location.LIURNIA_VILLAGE_OF_THE_ALBINAURICS,
      metadata: {
        description: "Up a small hill past the grace in a stone coffin.",
        requirements: {},
      },
    },
  ],
});

const crystalKnifeLocations: EdgeData[] = convertItemLocationsToEdges({
  item: Item.CRYSTAL_KNIFE,
  locations: [
    {
      location: Location.LIURNIA_RAYA_LUCARIA_CRYSTAL_TUNNEL,
      metadata: {
        description:
          "In a storage area three levels down, guarded by Marionettes.",
        requirements: {},
      },
    },
  ],
});

const scorpionsStingerLocations: EdgeData[] = convertItemLocationsToEdges({
  item: Item.SCORPIONS_STINGER,
  locations: [
    {
      location: Location.AINSEL_RIVER_GRAND_CLOISTER,
      metadata: {
        description:
          "Use the ledges to drop down to the bottom, and head straight ahead (westward) and you'll find the dagger in a chest.",
        requirements: {},
      },
    },
  ],
});

const cinqudeaLocations: EdgeData[] = convertItemLocationsToEdges({
  item: Item.CINQUEDEA,
  locations: [
    {
      location: Location.DRAGONBARROW,
      metadata: {
        description:
          "Can be found at the bottom of the exterior structure of the Bestial Sanctum, near a broken rat corpse statue.",
        requirements: {},
      },
    },
  ],
});

const glinstoneKrisLocations: EdgeData[] = convertItemLocationsToEdges({
  item: Item.GLINTSTONE_KRIS,
  locations: [
    {
      location: Location.LIURNIA_RAYA_LUCARIA_GRAND_LIBRARY,
      metadata: {
        description:
          "Given by Sorceress Sellen after siding with her against Jerren",
        requirements: {
          requiredBosses: [Enemy.RENNALA_QUEEN_OF_THE_FULL_MOON],
          requiredQuests: [QuestlineStage.SELLEN_STAGE_8_A],
        },
      },
    },
  ],
});

const reduviaLocations: EdgeData[] = convertItemLocationsToEdges({
  item: Item.REDUVIA,
  locations: [
    {
      location: Location.LIMGRAVE,
      metadata: {
        description:
          "Dropped by Bloody Finger Nerijus, who invades near Murkwater Cave",
        requirements: {},
      },
    },
  ],
});

const bladeOfCallingLocations: EdgeData[] = convertItemLocationsToEdges({
  item: Item.BLADE_OF_CALLING,
  locations: [
    {
      location: Location.ALTUS_PLATEAU_FORBIDDEN_LANDS,
      metadata: {
        description:
          "From the site of grace, turn back and head towards the elevator. Face west-southwest, then activate the elevator and watch for an opening to jump off into. It is on the table in the room at the end of this hall.",
        requirements: {},
      },
    },
  ],
});

const blackKnifeLocations: EdgeData[] = convertItemLocationsToEdges({
  item: Item.BLACK_KNIFE,
  locations: [
    {
      location: Location.ALTUS_PLATEAU_SAINTED_HEROS_GRAVE,
      metadata: {
        description:
          "Dropped by the Black Knife Assassin at the entrance of Sainted Hero's Grave",
        requirements: {},
      },
    },
  ],
});

const daggerWeaponLocations = [
  ...daggerLocations,
  ...parryingDaggerLocations,
  ...misericordeLocations,
  ...greatKnifeLocations,
  ...bloodstainedDaggerLocations,
  ...erdsteelDaggerLocations,
  ...wakizashiLocations,
  ...celebrantsSickleLocations,
  ...ivorySickleLocations,
  ...crystalKnifeLocations,
  ...scorpionsStingerLocations,
  ...cinqudeaLocations,
  ...glinstoneKrisLocations,
  ...reduviaLocations,
  ...bladeOfCallingLocations,
  ...blackKnifeLocations,
];

const shortSwordLocations: EdgeData[] = convertItemLocationsToEdges({
  item: Item.SHORT_SWORD,
  locations: [
    {
      location: Location.LIMGRAVE,
      metadata: {
        description:
          "Can be purchased from the Nomadic Merchant in North Limgrave for 600 Runes",
        requirements: {},
      },
    },
    {
      location: Location.LIMGRAVE_MURKWATER_CAVE,
      metadata: {
        description: "Dropped by Highwaymen",
        requirements: {},
      },
    },
  ],
});

const longswordLocations: EdgeData[] = convertItemLocationsToEdges({
  item: Item.LONGSWORD,
  locations: [
    {
      location: Location.ROUNDTABLE_HOLD,
      metadata: {
        description:
          "Can be purchased from Twin Maiden Husks at the Roundtable Hold for 1,000 Runes.",
        requirements: {},
      },
    },
  ],
});

const broadswordLocations: EdgeData[] = convertItemLocationsToEdges({
  item: Item.BROADSWORD,
  locations: [
    {
      location: Location.LIMGRAVE,
      metadata: {
        description:
          "Can be bought from the Nomadic Merchant (south-east of Coastal Cave) for 1800 Runes.",
        requirements: {},
      },
    },
  ],
});

const weatheredStraightSwordLocations: EdgeData[] = convertItemLocationsToEdges(
  {
    item: Item.WEATHERED_STRAIGHT_SWORD,
    locations: [
      {
        location: Location.LIMGRAVE,
        metadata: {
          description: "Dropped from Commoner enemies in any area",
          requirements: {},
        },
      },
    ],
  },
);

const lordswornsStraightSwordLocations: EdgeData[] =
  convertItemLocationsToEdges({
    item: Item.LORDSWORNS_STRAIGHT_SWORD,
    locations: [
      {
        location: Location.LIMGRAVE,
        metadata: {
          description: "May be dropped by Godrick Soldiers in Gatefront Ruins.",
          requirements: {},
        },
      },
    ],
  });

const noblesSenderSwordLocations: EdgeData[] = convertItemLocationsToEdges({
  item: Item.NOBLES_SLENDER_SWORD,
  locations: [
    {
      location: Location.LIMGRAVE,
      metadata: {
        description: "Dropped by Wandering Nobles",
        requirements: {},
      },
    },
  ],
});

const caneSwordLocations: EdgeData[] = convertItemLocationsToEdges({
  item: Item.CANE_SWORD,
  locations: [
    {
      location: Location.LEYNDELL_ROYAL_CAPITAL,
      metadata: {
        description:
          "West Capital Rampart Site of Grace: Go south out of the room with the site of grace and down the flight of stairs to the floor underneath, make a complete U-turn in the room with the stairs to find a corpse with the sword.",
        requirements: {},
      },
    },
    {
      location: Location.LEYNDELL_ASHEN_CAPITAL,
      metadata: {
        description:
          "From the Leyndell, Capital of Ash Site of Grace, head west towards the dragon corpse's wing. Behind the wing, climb inside the broken wall, climb the ladder and keep going until you meet the same flight of stairs. Make a U-turn in the room down the stairs and the sword can be looted from the corpse at the end of the room.",
        requirements: {},
      },
    },
  ],
});

const warhawksTalonLocations: EdgeData[] = convertItemLocationsToEdges({
  item: Item.WARHAWKS_TALON,
  locations: [
    {
      location: Location.LIMGRAVE_STORMVEIL_CASTLE,
      metadata: {
        description: "Dropped by Warhawks",
        requirements: {},
      },
    },
  ],
});

const lazuliGlintstoneSwordLocations: EdgeData[] = convertItemLocationsToEdges({
  item: Item.LAZULI_GLINTSTONE_SWORD,
  locations: [
    {
      location: Location.LIURNIA_ACADEMY_OF_RAYA_LUCARIA,
      metadata: {
        description: "Dropped by Lazuli Sorcerers",
        requirements: {},
      },
    },
    {
      location: Location.LIURNIA_CARIA_MANOR,
      metadata: {
        description: "Dropped by Lazuli Sorcerers",
        requirements: {},
      },
    },
  ],
});

const carianKnightsSwordLocations: EdgeData[] = convertItemLocationsToEdges({
  item: Item.CARIAN_KNIGHTS_SWORD,
  locations: [
    {
      location: Location.LIURNIA,
      metadata: {
        description:
          "Found in a chest in the back of a Carriage being pulled by two Trolls in northern Liurnia",
        requirements: {},
      },
    },
  ],
});

const crystalSwordLocations: EdgeData[] = convertItemLocationsToEdges({
  item: Item.CRYSTAL_SWORD,
  locations: [
    {
      location: Location.LIURNIA_VILLAGE_OF_THE_ALBINAURICS,
      metadata: {
        description:
          "Past the well and across the wooden bridge, on a body near the edge.",
        requirements: {},
      },
    },
  ],
});

const rottenCrystalSwordLocations: EdgeData[] = convertItemLocationsToEdges({
  item: Item.ROTTEN_CRYSTAL_SWORD,
  locations: [
    {
      location: Location.ELPHAEL_BRACE_OF_THE_HALIGTREE,
      metadata: {
        description:
          "Found in a chest by the inner wall guarded by 3 Lesser Crystallians.",
        requirements: {},
      },
    },
  ],
});

const miquellanKnightsSwordLocations: EdgeData[] = convertItemLocationsToEdges({
  item: Item.MIQUELLAN_KNIGHTS_SWORD,
  locations: [
    {
      location: Location.ELPHAEL_BRACE_OF_THE_HALIGTREE,
      metadata: {
        description: "Found atop a bell tower.",
        requirements: {},
      },
    },
  ],
});

const ornamentalStraightSwordLocations: EdgeData[] =
  convertItemLocationsToEdges({
    item: Item.ORNAMENTAL_STRAIGHT_SWORD,
    locations: [
      {
        location: Location.CHAPEL_OF_ANTICIPATION,
        metadata: {
          description: "Dropped by the Grafted Scion",
          requirements: {},
        },
      },
    ],
  });

const goldenEpitaphLocations: EdgeData[] = convertItemLocationsToEdges({
  item: Item.GOLDEN_EPITAPH,
  locations: [
    {
      location: Location.ALTUS_PLATEAU_AURIZA_HEROS_GRAVE,
      metadata: {
        description:
          "Found on a corpse in a room locked behind an Imp Statue Seal just past the Site of Grace near the entrance",
        requirements: {},
      },
    },
  ],
});

const swordOfStTrinaLocations: EdgeData[] = convertItemLocationsToEdges({
  item: Item.SWORD_OF_ST_TRINA,
  locations: [
    {
      location: Location.CAELID,
      metadata: {
        description:
          "In the Forsaken Ruins, near the Rotview Balcony Site of Grace, behind an Imp Seal requiring one Stonesword Key.",
        requirements: {},
      },
    },
  ],
});

const regaliaOfEochaidLocations: EdgeData[] = convertItemLocationsToEdges({
  item: Item.REGALIA_OF_EOCHAID,
  locations: [
    {
      location: Location.CAELID_GAOL_CAVE,
      metadata: {
        description: "At the end of the dungeon, keep going past the boss door",
        requirements: {},
      },
    },
  ],
});

const codedSwordLocations: EdgeData[] = convertItemLocationsToEdges({
  item: Item.CODED_SWORD,
  locations: [
    {
      location: Location.LEYNDELL_ROYAL_CAPITAL,
      metadata: {
        description: "Found in upstairs throne room of Fortified Manor,",
        requirements: {},
      },
    },
  ],
});

const swordOfNightAndFlameLocations: EdgeData[] = convertItemLocationsToEdges({
  item: Item.SWORD_OF_NIGHT_AND_FLAME,
  locations: [
    {
      location: Location.LIURNIA_CARIA_MANOR,
      metadata: {
        description:
          "In a locked room behind the gardens in the east side of the manor",
        requirements: {},
      },
    },
  ],
});

const straightSwordWeaponLocations = [
  ...shortSwordLocations,
  ...longswordLocations,
  ...broadswordLocations,
  ...weatheredStraightSwordLocations,
  ...lordswornsStraightSwordLocations,
  ...noblesSenderSwordLocations,
  ...caneSwordLocations,
  ...warhawksTalonLocations,
  ...lazuliGlintstoneSwordLocations,
  ...carianKnightsSwordLocations,
  ...crystalSwordLocations,
  ...rottenCrystalSwordLocations,
  ...miquellanKnightsSwordLocations,
  ...ornamentalStraightSwordLocations,
  ...goldenEpitaphLocations,
  ...swordOfStTrinaLocations,
  ...regaliaOfEochaidLocations,
  ...codedSwordLocations,
  ...swordOfNightAndFlameLocations,
];

export const weaponLocations = [
  ...daggerWeaponLocations,
  ...straightSwordWeaponLocations,
  ...testWeaponLocations,
];
