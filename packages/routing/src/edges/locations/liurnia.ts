import { Enemy } from "@workspace/data/enemies";
import { Glitch } from "@workspace/data/glitches";
import { ProgressionItem } from "@workspace/data/items";
import { Location } from "@workspace/data/locations";

import { EdgeData } from "#types";

export const liurniaEdges: EdgeData[] = [
  // Main access to Liurnia
  {
    from: Location.LIMGRAVE,
    to: Location.LIURNIA,
    metadata: {
      description: "Take the shortcut near Stormveil Castle",
      requirements: [],
    },
  },

  // Main Liurnia connections
  {
    from: Location.LIURNIA,
    to: Location.LIURNIA_ACADEMY_OF_RAYA_LUCARIA,
    metadata: {
      description:
        "Enter through the Academy Main Gate using the Glintstone Key",
      requirements: [
        {
          type: "item",
          value: ProgressionItem.ACADEMY_GLINTSTONE_KEY,
        },
      ],
    },
  },
  {
    from: Location.LIURNIA,
    to: Location.LIURNIA_CARIA_MANOR,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.LIURNIA,
    to: Location.LIURNIA_FOUR_BELFRIES,
    metadata: {
      requirements: [],
    },
  },

  // Raya Lucaria Academy sub-locations
  {
    from: Location.LIURNIA_ACADEMY_OF_RAYA_LUCARIA,
    to: Location.LIURNIA_RAYA_LUCARIA_ROOFTOPS,
    metadata: {
      requirements: [{ type: "boss", value: Enemy.RED_WOLF_OF_RADAGON }],
    },
  },
  {
    from: Location.LIURNIA_RAYA_LUCARIA_ROOFTOPS,
    to: Location.LIURNIA_RAYA_LUCARIA_GRAND_LIBRARY,
    metadata: {
      requirements: [],
    },
  },

  // Three Sisters area (accessed through Caria Manor)
  {
    from: Location.LIURNIA_CARIA_MANOR,
    to: Location.LIURNIA_THREE_SISTERS,
    metadata: {
      description: "Access through Caria Manor's upper level",
      requirements: [{ type: "boss", value: Enemy.ROYAL_KNIGHT_LORETTA }],
    },
  },
  {
    from: Location.LIURNIA_CARIA_MANOR,
    to: Location.LIURNIA_THREE_SISTERS,
    metadata: {
      requirements: [{ type: "glitch", value: Glitch.ZIP, description: "" }],
    },
  },

  // Carian Study Hall and Divine Tower
  {
    from: Location.LIURNIA,
    to: Location.LIURNIA_CARIAN_STUDY_HALL,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.LIURNIA,
    to: Location.LIURNIA_CARIAN_STUDY_HALL_INVERTED,
    metadata: {
      description: "Use the Carian Inverted Statue to flip the study hall",
      requirements: [
        {
          type: "item",
          value: ProgressionItem.CARIAN_INVERTED_STATUE,
        },
      ],
    },
  },
  {
    from: Location.LIURNIA_CARIAN_STUDY_HALL_INVERTED,
    to: Location.LIURNIA_DIVINE_TOWER,
    metadata: {
      requirements: [{ type: "boss", value: Enemy.GODSKIN_NOBLE }],
    },
  },

  // Dungeons
  {
    from: Location.LIURNIA,
    to: Location.LIURNIA_CLIFFBOTTOM_CATACOMBS,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.LIURNIA,
    to: Location.LIURNIA_ROADS_END_CATACOMBS,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.LIURNIA,
    to: Location.LIURNIA_BLACK_KNIFE_CATACOMBS,
    metadata: {
      requirements: [],
    },
  },

  // Caves
  {
    from: Location.LIURNIA,
    to: Location.LIURNIA_STILLWATER_CAVE,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.LIURNIA,
    to: Location.LIURNIA_LAKESIDE_CRYSTAL_CAVE,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.LIURNIA_LAKESIDE_CRYSTAL_CAVE,
    to: Location.LIURNIA_SLUMBERING_WOLFS_SHACK,
    metadata: {
      requirements: [{ type: "boss", value: Enemy.BLOODHOUND_KNIGHT }],
    },
  },
  {
    from: Location.LIURNIA,
    to: Location.LIURNIA_ACADEMY_CRYSTAL_CAVE,
    metadata: {
      requirements: [],
    },
  },

  // Other locations
  {
    from: Location.LIURNIA,
    to: Location.LIURNIA_RAYA_LUCARIA_CRYSTAL_TUNNEL,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.LIURNIA,
    to: Location.LIURNIA_RUIN_STREWN_PRECIPICE,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.LIURNIA,
    to: Location.LIURNIA_MOONLIGHT_ALTAR,
    metadata: {
      requirements: [{ type: "glitch", value: Glitch.ZIP, description: "" }],
    },
  },
];
