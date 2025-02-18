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
      requirements: {
        requiredItems: [ProgressionItem.ROLD_MEDALLION],
      },
    },
  },

  // Castle Sol
  {
    from: Location.MOUNTAINTOPS_OF_THE_GIANTS,
    to: Location.MOUNTAINTOPS_CASTLE_SOL,
    metadata: {
      requirements: {},
    },
  },

  // Dungeons
  {
    from: Location.MOUNTAINTOPS_OF_THE_GIANTS,
    to: Location.MOUNTAINTOPS_GIANTS_MOUNTAINTOP_CATACOMBS,
    metadata: {
      requirements: {},
    },
  },
  {
    from: Location.MOUNTAINTOPS_OF_THE_GIANTS,
    to: Location.MOUNTAINTOPS_GIANT_CONQUERING_HEROS_GRAVE,
    metadata: {
      requirements: {},
    },
  },

  // Caves
  {
    from: Location.MOUNTAINTOPS_OF_THE_GIANTS,
    to: Location.MOUNTAINTOPS_SPIRITCALLERS_CAVE,
    metadata: {
      requirements: {},
    },
  },
];

// Farum Azula edges
export const farumAzulaEdges: EdgeData[] = [
  // Main access to Farum Azula
  {
    from: Location.MOUNTAINTOPS_OF_THE_GIANTS,
    to: Location.FARUM_AZULA,
    directed: true,
    metadata: {
      description: "Transported to Farum Azula after burning the Erdtree",
      requirements: {
        requiredBosses: [Enemy.FIRE_GIANT],
      },
    },
  },
  {
    from: Location.LIURNIA_FOUR_BELFRIES,
    to: Location.FARUM_AZULA_SUB_AREA,
    metadata: {
      description: "Use an Imbued Sword Key on the Crumbling Lands portal",
      requirements: {},
    },
  },
  {
    from: Location.FARUM_AZULA_SUB_AREA,
    to: Location.FARUM_AZULA,
    directed: true,
    metadata: {
      requirements: {
        requiredGlitch: {
          glitch: Glitch.WRONGWARP,
          description:
            "Warp to the Roundtable Hold and Alt+F4 immediately before the loading bar finishes loading",
        },
      },
    },
  },
  {
    from: Location.FARUM_AZULA,
    to: Location.FARUM_AZULA_POST_GODSKIN_DUO,
    metadata: {
      requirements: {
        requiredBosses: [Enemy.GODSKIN_DUO],
      },
    },
  },
  {
    from: Location.FARUM_AZULA,
    to: Location.FARUM_AZULA_POST_GODSKIN_DUO,
    metadata: {
      requirements: {
        requiredGlitch: {
          glitch: Glitch.ZIP,
          description:
            "Past the Dragon Temple Site of Grace, zip across the large gap between where you pick up a Stonesword Key and the Great Bridge",
        },
      },
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
      requirements: {
        requiredItems: [ProgressionItem.HALIGTREE_MEDALLION],
      },
    },
  },
  {
    from: Location.MOUNTAINTOPS_OF_THE_GIANTS,
    to: Location.CONSECRATED_SNOWFIELD_HIDDEN_PATH_TO_THE_HALIGTREE,
    metadata: {
      description:
        "Access via secret path at Grand Lift of Rold (Mountaintops side)",
      requirements: {
        requiredItems: [ProgressionItem.HALIGTREE_MEDALLION],
      },
    },
  },
  {
    from: Location.CONSECRATED_SNOWFIELD_HIDDEN_PATH_TO_THE_HALIGTREE,
    to: Location.CONSECRATED_SNOWFIELD,
    metadata: {
      requirements: {},
    },
  },
  {
    from: Location.CONSECRATED_SNOWFIELD_HIDDEN_PATH_TO_THE_HALIGTREE,
    to: Location.MOUNTAINTOPS_OF_THE_GIANTS,
    directed: true,
    metadata: {
      requirements: {
        requiredGlitch: {
          glitch: Glitch.WRONGWARP,
          description:
            "Warp to the Roundtable Hold and Alt+F4 immediately before the loading bar finishes loading",
        },
      },
    },
  },
  {
    from: Location.ALTUS_PLATEAU_LEYNDELL_OUTSKIRTS,
    to: Location.CONSECRATED_SNOWFIELD,
    directed: true,
    metadata: {
      requirements: {
        requiredGlitch: {
          glitch: Glitch.ZIP,
          description:
            "The setup for this zip is a little complicated, so watching a YouTube video is advised",
        },
      },
    },
  },

  // Snowfield Dungeons
  {
    from: Location.CONSECRATED_SNOWFIELD,
    to: Location.CONSECRATED_SNOWFIELD_CAVE_OF_THE_FORLORN,
    metadata: {
      requirements: {},
    },
  },
  {
    from: Location.CONSECRATED_SNOWFIELD,
    to: Location.CONSECRATED_SNOWFIELD_CATACOMBS,
    metadata: {
      requirements: {},
    },
  },
  {
    from: Location.CONSECRATED_SNOWFIELD,
    to: Location.CONSECRATED_SNOWFIELD_YELOUGH_ANIX_TUNNEL,
    metadata: {
      requirements: {},
    },
  },

  // Path to Haligtree
  {
    from: Location.CONSECRATED_SNOWFIELD,
    to: Location.CONSECRATED_SNOWFIELD_ORDINA_LITURGICAL_TOWN,
    metadata: {
      requirements: {},
    },
  },
  {
    from: Location.CONSECRATED_SNOWFIELD_ORDINA_LITURGICAL_TOWN,
    to: Location.MIQUELLAS_HALIGTREE,
    metadata: {
      description:
        "Complete the Evergaol seal puzzle to access the portal. The Sentry's Torch can be used to see hidden enemies",
      requirements: {},
    },
  },

  // Haligtree Areas
  {
    from: Location.MIQUELLAS_HALIGTREE,
    to: Location.ELPHAEL_BRACE_OF_THE_HALIGTREE,
    metadata: {
      requirements: {
        requiredBosses: [Enemy.LORETTA_KNIGHT_OF_THE_HALIGTREE],
      },
    },
  },
];
