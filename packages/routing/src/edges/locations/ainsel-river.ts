import { Enemy, Glitch, Location } from "@workspace/data";

import { EdgeData } from "@/types";

export const ainselRiverEdges: EdgeData[] = [
  // Ainsel Well path
  {
    from: Location.LIURNIA,
    to: Location.AINSEL_RIVER_WELL_DEPTHS,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.AINSEL_RIVER_WELL_DEPTHS,
    to: Location.AINSEL_RIVER_UHL_PALACE_RUINS,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.AINSEL_RIVER_UHL_PALACE_RUINS,
    to: Location.AINSEL_RIVER_DRAGONKIN_ARENA,
    metadata: {
      requirements: [],
    },
  },

  // Ranni's questline path
  {
    from: Location.LIURNIA_THREE_SISTERS,
    to: Location.AINSEL_RIVER_MAIN,
    directed: true,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.LIURNIA_THREE_SISTERS,
    to: Location.AINSEL_RIVER_MAIN,
    directed: true,
    metadata: {
      requirements: [{ type: "glitch", value: Glitch.ZIP, description: "" }],
    },
  },
  {
    from: Location.AINSEL_RIVER_MAIN,
    to: Location.AINSEL_RIVER_NOKSTELLA_ETERNAL_CITY,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.AINSEL_RIVER_NOKSTELLA_ETERNAL_CITY,
    to: Location.AINSEL_RIVER_LAKE_OF_ROT,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.AINSEL_RIVER_LAKE_OF_ROT,
    to: Location.AINSEL_RIVER_GRAND_CLOISTER,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.AINSEL_RIVER_GRAND_CLOISTER,
    to: Location.LIURNIA_MOONLIGHT_ALTAR,
    directed: true,
    metadata: {
      description: "Access via defeating Astel and using the coffin",
      requirements: [
        { type: "boss", value: Enemy.ASTEL_NATURALBORN_OF_THE_VOID },
      ],
    },
  },
];
