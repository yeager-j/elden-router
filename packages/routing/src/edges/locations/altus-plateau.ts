import {
  Enemy,
  Flag,
  Glitch,
  Location,
  ProgressionItem,
} from "@workspace/data";

import { EdgeData } from "@/types";

export const altusPlateauEdges: EdgeData[] = [
  // Main Altus Plateau access points
  {
    from: Location.LIURNIA,
    to: Location.ALTUS_PLATEAU,
    metadata: {
      description: "Access via Grand Lift of Dectus",
      requirements: [
        {
          type: "item",
          value: ProgressionItem.DECTUS_MEDALLION,
        },
      ],
    },
  },
  {
    from: Location.LIURNIA_RUIN_STREWN_PRECIPICE,
    to: Location.ALTUS_PLATEAU,
    metadata: {
      description: "Alternative path through Ruin-Strewn Precipice",
      requirements: [
        {
          type: "boss",
          value: Enemy.MAGMA_WYRM_MAKAR,
        },
      ],
    },
  },

  // Altus Plateau Dungeons
  {
    from: Location.ALTUS_PLATEAU,
    to: Location.ALTUS_PLATEAU_UNSIGHTLY_CATACOMBS,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.ALTUS_PLATEAU,
    to: Location.ALTUS_PLATEAU_SAINTED_HEROS_GRAVE,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.ALTUS_PLATEAU,
    to: Location.ALTUS_PLATEAU_AURIZA_HEROS_GRAVE,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.ALTUS_PLATEAU,
    to: Location.ALTUS_PLATEAU_AURIZA_SIDE_TOMB,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.ALTUS_PLATEAU,
    to: Location.ALTUS_PLATEAU_WYNDHAM_CATACOMBS,
    metadata: {
      requirements: [],
    },
  },

  // Caves
  {
    from: Location.ALTUS_PLATEAU,
    to: Location.ALTUS_PLATEAU_SAGES_CAVE,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.ALTUS_PLATEAU,
    to: Location.ALTUS_PLATEAU_PERFUMERS_GROTTO,
    metadata: {
      requirements: [],
    },
  },

  // Mines/Tunnels
  {
    from: Location.ALTUS_PLATEAU,
    to: Location.ALTUS_PLATEAU_OLD_ALTUS_TUNNEL,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.ALTUS_PLATEAU,
    to: Location.ALTUS_PLATEAU_ALTUS_TUNNEL,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.ALTUS_PLATEAU,
    to: Location.ALTUS_PLATEAU_SEALED_TUNNEL,
    metadata: {
      requirements: [],
    },
  },

  // Other Locations
  {
    from: Location.ALTUS_PLATEAU,
    to: Location.ALTUS_PLATEAU_SHADED_CASTLE,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.ALTUS_PLATEAU,
    to: Location.ALTUS_PLATEAU_LEYNDELL_OUTSKIRTS,
    metadata: {
      requirements: [],
    },
  },
  // Mt. Gelmir Connections
  {
    from: Location.LIURNIA_ACADEMY_OF_RAYA_LUCARIA,
    to: Location.MT_GELMIR_VOLCANO_MANOR_INQUISITION_CHAMBER,
    directed: true,
    metadata: {
      description: "Abducted by the Abductor Virgin in Raya Lucaria",
      requirements: [],
    },
  },
  {
    from: Location.MT_GELMIR_VOLCANO_MANOR_INQUISITION_CHAMBER,
    to: Location.MT_GELMIR,
    metadata: {
      requirements: [{ type: "boss", value: Enemy.ABDUCTOR_VIRGINS }],
    },
  },
  {
    from: Location.ALTUS_PLATEAU,
    to: Location.MT_GELMIR,
    metadata: {
      requirements: [],
    },
  },

  // Mt. Gelmir Locations
  {
    from: Location.MT_GELMIR,
    to: Location.MT_GELMIR_VOLCANO_MANOR,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.MT_GELMIR_VOLCANO_MANOR,
    to: Location.MT_GELMIR_VOLCANO_MANOR_POST_EIGLAY,
    metadata: {
      description: "Area after Temple of Eiglay",
      requirements: [{ type: "boss", value: Enemy.GODSKIN_NOBLE }],
    },
  },

  // Mt. Gelmir Dungeons
  {
    from: Location.MT_GELMIR,
    to: Location.MT_GELMIR_HEROS_GRAVE,
    metadata: {
      requirements: [],
    },
  },

  // Mt. Gelmir Caves
  {
    from: Location.MT_GELMIR,
    to: Location.MT_GELMIR_SEETHEWATER_CAVE,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.MT_GELMIR,
    to: Location.MT_GELMIR_VOLCANO_CAVE,
    metadata: {
      requirements: [],
    },
  },
  // Leyndell Royal Capital Access
  {
    from: Location.ALTUS_PLATEAU_LEYNDELL_OUTSKIRTS,
    to: Location.LEYNDELL_ROYAL_CAPITAL,
    metadata: {
      description: "Enter Leyndell after defeating two Shardbearers",
      requirements: [
        { type: "boss", value: Enemy.DRACONIC_TREE_SENTINEL },
        { type: "boss", value: Enemy.SHARDBEARERS },
        { type: "flag", value: Flag.LEYNDELL_CAPITAL_ASHEN, not: true },
      ],
    },
  },

  // Leyndell Main Progression
  {
    from: Location.LEYNDELL_ROYAL_CAPITAL,
    to: Location.LEYNDELL_ERDTREE_SANCTUARY,
    metadata: {
      requirements: [{ type: "boss", value: Enemy.GODFREY_GOLDEN_SHADE }],
    },
  },
  {
    from: Location.LEYNDELL_ERDTREE_SANCTUARY,
    to: Location.LEYNDELL_ELDEN_THRONE,
    metadata: {
      requirements: [{ type: "boss", value: Enemy.MORGOTT_THE_OMEN_KING }],
    },
  },

  // Leyndell Dungeons and Sub-areas
  {
    from: Location.LEYNDELL_ROYAL_CAPITAL,
    to: Location.LEYNDELL_SUBTERRANEAN_SHUNNING_GROUNDS,
    metadata: {
      requirements: [
        { type: "flag", value: Flag.LEYNDELL_CAPITAL_ASHEN, not: true },
      ],
    },
  },
  {
    from: Location.LEYNDELL_SUBTERRANEAN_SHUNNING_GROUNDS,
    to: Location.LEYNDELL_FRENZIED_FLAME_PROSCRIPTION,
    directed: true,
    metadata: {
      requirements: [{ type: "boss", value: Enemy.MOHG_THE_OMEN }],
    },
  },
  {
    from: Location.LEYNDELL_SUBTERRANEAN_SHUNNING_GROUNDS,
    to: Location.LEYNDELL_CATACOMBS,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.LEYNDELL_ROYAL_CAPITAL,
    to: Location.ALTUS_PLATEAU_FORBIDDEN_LANDS,
    metadata: {
      requirements: [
        { type: "flag", value: Flag.LEYNDELL_CAPITAL_ASHEN, not: true },
      ],
    },
  },
  {
    from: Location.LIMGRAVE_WEEPING_PENINSULA,
    to: Location.LEYNDELL_CAPITAL_SUB_AREA,
    directed: true,
    metadata: {
      description: "Use the Teleporter Chest atop the Tower of Return",
      requirements: [],
    },
  },
  {
    from: Location.LEYNDELL_CAPITAL_SUB_AREA,
    to: Location.LEYNDELL_ROYAL_CAPITAL,
    directed: true,
    metadata: {
      requirements: [
        { type: "glitch", value: Glitch.ZIP, description: "" },
        { type: "flag", value: Flag.LEYNDELL_CAPITAL_ASHEN, not: true },
      ],
    },
  },

  // Ashen Capital
  {
    from: Location.ALTUS_PLATEAU_LEYNDELL_OUTSKIRTS,
    to: Location.LEYNDELL_ASHEN_CAPITAL,
    metadata: {
      description: "Capital turns to ash after defeating Maliketh",
      requirements: [{ type: "flag", value: Flag.LEYNDELL_CAPITAL_ASHEN }],
    },
  },
  {
    from: Location.LEYNDELL_ASHEN_CAPITAL,
    to: Location.ALTUS_PLATEAU_FORBIDDEN_LANDS,
    metadata: {
      requirements: [{ type: "flag", value: Flag.LEYNDELL_CAPITAL_ASHEN }],
    },
  },
  {
    from: Location.LEYNDELL_ASHEN_CAPITAL,
    to: Location.LEYNDELL_ASHEN_ELDEN_THRONE,
    metadata: {
      requirements: [
        { type: "boss", value: Enemy.SIR_GIDEON_OFNIR_THE_ALL_KNOWING },
      ],
    },
  },
  {
    from: Location.LEYNDELL_ASHEN_ELDEN_THRONE,
    to: Location.LEYNDELL_FRACTURED_MARIKA,
    metadata: {
      requirements: [{ type: "boss", value: Enemy.GODFREY_HOARAH_LOUX }],
    },
  },
];
