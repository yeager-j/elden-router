import { Enemy } from "@workspace/data/enemies";
import { Flag } from "@workspace/data/flags";
import { ProgressionItem } from "@workspace/data/items";
import { Location } from "@workspace/data/locations";

import { EdgeData } from "#types";

export const siofraRiverEdges: EdgeData[] = [
  // Main entry points to underground
  {
    from: Location.LIMGRAVE,
    to: Location.SIOFRA_RIVER_WELL,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.DEEP_SIOFRA_WELL,
    to: Location.DRAGONBARROW_SIOFRA_WELL,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.LIMGRAVE,
    to: Location.NOKRON_ETERNAL_CITY,
    metadata: {
      description: "Access after stars fall",
      requirements: [{ type: "flag", value: Flag.RADAHN_DEFEATED }],
    },
  },

  // Nokron areas
  {
    from: Location.LIURNIA_FOUR_BELFRIES,
    to: Location.NOKRON_SUB_AREA,
    metadata: {
      description: "Return to the starting area via portal",
      requirements: [], // Might need Imbued Sword Key requirement
    },
  },
  {
    from: Location.NOKRON_ETERNAL_CITY,
    to: Location.NOKRON_ANCESTRAL_WOODS,
    metadata: {
      requirements: [{ type: "boss", value: Enemy.MIMIC_TEAR }],
    },
  },
  {
    from: Location.NOKRON_ANCESTRAL_WOODS,
    to: Location.NOKRON_NIGHTS_SACRED_GROUND,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.NOKRON_ANCESTRAL_WOODS,
    to: Location.NOKRON_SIOFRA_AQUEDUCT,
    metadata: {
      requirements: [],
    },
  },

  // Siofra River areas
  {
    from: Location.SIOFRA_RIVER_WELL,
    to: Location.SIOFRA_RIVER_BANK,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.SIOFRA_RIVER_BANK,
    to: Location.DEEP_SIOFRA_WELL,
    metadata: {
      requirements: [],
    },
  },

  // Mohgwyn Palace access points
  {
    from: Location.LIMGRAVE,
    to: Location.MOHGWYN_PALACE,
    directed: true,
    metadata: {
      description: "Teleport using Pureblood Knight's Medal",
      requirements: [
        {
          type: "item",
          value: ProgressionItem.PUREBLOOD_KNIGHTS_MEDAL,
        },
      ],
    },
  },
  {
    from: Location.CONSECRATED_SNOWFIELD,
    to: Location.MOHGWYN_PALACE,
    directed: true,
    metadata: {
      description: "Portal near blood lake",
      requirements: [],
    },
  },
  {
    from: Location.MOHGWYN_PALACE,
    to: Location.MOHGWYN_DYNASTY_MAUSOLEUM,
    metadata: {
      requirements: [],
    },
  },
];
