import { Enemy } from "@workspace/data/enemies";
import { Glitch } from "@workspace/data/glitches";
import { ProgressionItem } from "@workspace/data/items";
import { Location } from "@workspace/data/locations";

import { EdgeData } from "#types";

export const mountaintopsEdges: EdgeData[] = [
  // Main access to Mountaintops
  {
    from: Location.ALTUS_PLATEAU_FORBIDDEN_LANDS,
    to: Location.MOUNTAINTOPS_OF_THE_GIANTS,
    metadata: {
      description: "Access via Grand Lift of Rold",
      requirements: [
        {
          type: "item",
          value: ProgressionItem.ROLD_MEDALLION,
        },
      ],
    },
  },

  // Castle Sol
  {
    from: Location.MOUNTAINTOPS_OF_THE_GIANTS,
    to: Location.MOUNTAINTOPS_CASTLE_SOL,
    metadata: {
      requirements: [],
    },
  },

  // Dungeons
  {
    from: Location.MOUNTAINTOPS_OF_THE_GIANTS,
    to: Location.MOUNTAINTOPS_GIANTS_MOUNTAINTOP_CATACOMBS,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.MOUNTAINTOPS_OF_THE_GIANTS,
    to: Location.MOUNTAINTOPS_GIANT_CONQUERING_HEROS_GRAVE,
    metadata: {
      requirements: [],
    },
  },

  // Caves
  {
    from: Location.MOUNTAINTOPS_OF_THE_GIANTS,
    to: Location.MOUNTAINTOPS_SPIRITCALLERS_CAVE,
    metadata: {
      requirements: [],
    },
  },
];

// Farum Azula edges
export const farumAzulaEdges: EdgeData[] = [
  // Main access to Farum Azula
  {
    from: Location.MOUNTAINTOPS_OF_THE_GIANTS,
    to: Location.FARUM_AZULA,
    metadata: {
      description: "Transported to Farum Azula after burning the Erdtree",
      requirements: [{ type: "boss", value: Enemy.FIRE_GIANT }],
    },
  },
  {
    from: Location.LIURNIA_FOUR_BELFRIES,
    to: Location.FARUM_AZULA_SUB_AREA,
    metadata: {
      description: "Use an Imbued Sword Key on the Crumbling Lands portal",
      requirements: [], // Might need a requirement for the specific Belfry key
    },
  },
  {
    from: Location.FARUM_AZULA_SUB_AREA,
    to: Location.FARUM_AZULA,
    directed: true,
    metadata: {
      requirements: [
        { type: "glitch", value: Glitch.WRONGWARP, description: "" },
      ],
    },
  },
  {
    from: Location.FARUM_AZULA,
    to: Location.FARUM_AZULA_POST_GODSKIN_DUO,
    metadata: {
      requirements: [{ type: "boss", value: Enemy.GODSKIN_DUO }],
    },
  },
  {
    from: Location.FARUM_AZULA,
    to: Location.FARUM_AZULA_POST_GODSKIN_DUO,
    metadata: {
      requirements: [{ type: "glitch", value: Glitch.ZIP, description: "" }],
    },
  },
];

// Consecrated Snowfield and Haligtree edges
export const snowfieldHaligtreeEdges: EdgeData[] = [
  // Hidden Path to the Haligtree access points
  {
    from: Location.ALTUS_PLATEAU_FORBIDDEN_LANDS,
    to: Location.CONSECRATED_SNOWFIELD_HIDDEN_PATH_TO_THE_HALIGTREE,
    metadata: {
      description:
        "Access via secret path at Grand Lift of Rold (Leyndell side)",
      requirements: [
        {
          type: "item",
          value: ProgressionItem.HALIGTREE_MEDALLION,
        },
      ],
    },
  },
  {
    from: Location.MOUNTAINTOPS_OF_THE_GIANTS,
    to: Location.CONSECRATED_SNOWFIELD_HIDDEN_PATH_TO_THE_HALIGTREE,
    metadata: {
      description:
        "Access via secret path at Grand Lift of Rold (Mountaintops side)",
      requirements: [
        {
          type: "item",
          value: ProgressionItem.HALIGTREE_MEDALLION,
        },
      ],
    },
  },
  {
    from: Location.CONSECRATED_SNOWFIELD_HIDDEN_PATH_TO_THE_HALIGTREE,
    to: Location.CONSECRATED_SNOWFIELD,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.CONSECRATED_SNOWFIELD_HIDDEN_PATH_TO_THE_HALIGTREE,
    to: Location.MOUNTAINTOPS_OF_THE_GIANTS,
    directed: true,
    metadata: {
      requirements: [
        { type: "glitch", value: Glitch.WRONGWARP, description: "" },
      ],
    },
  },
  {
    from: Location.ALTUS_PLATEAU_LEYNDELL_OUTSKIRTS,
    to: Location.CONSECRATED_SNOWFIELD,
    directed: true,
    metadata: {
      requirements: [{ type: "glitch", value: Glitch.ZIP, description: "" }],
    },
  },

  // Snowfield Dungeons
  {
    from: Location.CONSECRATED_SNOWFIELD,
    to: Location.CONSECRATED_SNOWFIELD_CAVE_OF_THE_FORLORN,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.CONSECRATED_SNOWFIELD,
    to: Location.CONSECRATED_SNOWFIELD_CATACOMBS,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.CONSECRATED_SNOWFIELD,
    to: Location.CONSECRATED_SNOWFIELD_YELOUGH_ANIX_TUNNEL,
    metadata: {
      requirements: [],
    },
  },

  // Path to Haligtree
  {
    from: Location.CONSECRATED_SNOWFIELD,
    to: Location.CONSECRATED_SNOWFIELD_ORDINA_LITURGICAL_TOWN,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.CONSECRATED_SNOWFIELD_ORDINA_LITURGICAL_TOWN,
    to: Location.MIQUELLAS_HALIGTREE,
    metadata: {
      description: "Complete the evergaol seal puzzle to access the portal",
      requirements: [],
    },
  },

  // Haligtree Areas
  {
    from: Location.MIQUELLAS_HALIGTREE,
    to: Location.ELPHAEL_BRACE_OF_THE_HALIGTREE,
    metadata: {
      requirements: [
        { type: "boss", value: Enemy.LORETTA_KNIGHT_OF_THE_HALIGTREE },
      ],
    },
  },
];
