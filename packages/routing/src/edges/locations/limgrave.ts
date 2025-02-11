import { Enemy, Location } from "@workspace/data";

import { EdgeData } from "@/types";

export const limgraveEdges: EdgeData[] = [
  {
    from: Location.LIMGRAVE,
    to: Location.ROUNDTABLE_HOLD,
    metadata: {
      description: "Warp to the Roundtable Hold",
      requirements: [],
    },
  },

  // Main Limgrave connections
  {
    from: Location.LIMGRAVE,
    to: Location.LIMGRAVE_STORMVEIL_CASTLE,
    metadata: {
      description: "Enter Stormveil Castle through the main gate",
      requirements: [{ type: "boss", value: Enemy.MARGIT_THE_FELL_OMEN }],
    },
  },
  {
    from: Location.LIMGRAVE,
    to: Location.LIMGRAVE_WEEPING_PENINSULA,
    metadata: {
      requirements: [],
    },
  },

  // Stormveil Castle sub-locations
  {
    from: Location.LIMGRAVE_STORMVEIL_CASTLE,
    to: Location.LIMGRAVE_STORMVEIL_CASTLE_THRONE_ROOM,
    metadata: {
      description: "Access throne room after navigating castle",
      requirements: [{ type: "boss", value: Enemy.GODRICK_THE_GRAFTED }],
    },
  },
  {
    from: Location.LIMGRAVE_STORMVEIL_CASTLE,
    to: Location.LIMGRAVE_DIVINE_TOWER,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.LIURNIA,
    to: Location.LIMGRAVE_STORMVEIL_CASTLE_THRONE_ROOM,
    metadata: {
      description: "Backtrack from Liurnia",
      requirements: [],
    },
  },

  // Limgrave Dungeons
  {
    from: Location.LIMGRAVE,
    to: Location.LIMGRAVE_STORMFOOT_CATACOMBS,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.LIMGRAVE,
    to: Location.LIMGRAVE_MURKWATER_CATACOMBS,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.LIMGRAVE,
    to: Location.LIMGRAVE_DEATHTOUCHED_CATACOMBS,
    metadata: {
      requirements: [],
    },
  },

  // Limgrave Caves
  {
    from: Location.LIMGRAVE,
    to: Location.LIMGRAVE_GROVESIDE_CAVE,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.LIMGRAVE,
    to: Location.LIMGRAVE_COASTAL_CAVE,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.LIMGRAVE,
    to: Location.LIMGRAVE_MURKWATER_CAVE,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.LIMGRAVE,
    to: Location.LIMGRAVE_HIGHROAD_CAVE,
    metadata: {
      requirements: [],
    },
  },

  // Limgrave Mines
  {
    from: Location.LIMGRAVE,
    to: Location.LIMGRAVE_LIMGRAVE_TUNNELS,
    metadata: {
      requirements: [],
    },
  },

  // Special Locations
  {
    from: Location.LIMGRAVE,
    to: Location.LIMGRAVE_WAYPOINT_RUINS,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.LIMGRAVE_WAYPOINT_RUINS,
    to: Location.LIMGRAVE_WAYPOINT_RUINS_SELLEN_ROOM,
    metadata: {
      description: "Access Sellen's underground study",
      requirements: [{ type: "boss", value: Enemy.MAD_PUMPKIN_HEAD }],
    },
  },
  {
    from: Location.LIMGRAVE,
    to: Location.LIMGRAVE_FRINGEFOLK_HEROS_GRAVE,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.LIMGRAVE_COASTAL_CAVE,
    to: Location.LIMGRAVE_CHURCH_OF_DRAGON_COMMUNION,
    metadata: {
      requirements: [{ type: "boss", value: Enemy.DEMI_HUMAN_CHIEF }],
    },
  },
  {
    from: Location.LIURNIA_FOUR_BELFRIES,
    to: Location.CHAPEL_OF_ANTICIPATION,
    metadata: {
      requirements: [],
    },
  },

  // Weeping Peninsula sub-locations
  {
    from: Location.LIMGRAVE_WEEPING_PENINSULA,
    to: Location.LIMGRAVE_CASTLE_MORNE,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.LIMGRAVE_WEEPING_PENINSULA,
    to: Location.LIMGRAVE_MORNE_TUNNEL,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.LIMGRAVE_WEEPING_PENINSULA,
    to: Location.LIMGRAVE_EARTHBORE_CAVE,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.LIMGRAVE_WEEPING_PENINSULA,
    to: Location.LIMGRAVE_IMPALERS_CATACOMBS,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.LIMGRAVE_WEEPING_PENINSULA,
    to: Location.LIMGRAVE_TOMBSWARD_CATACOMBS,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.LIMGRAVE_WEEPING_PENINSULA,
    to: Location.LIMGRAVE_TOMBSWARD_CAVE,
    metadata: {
      requirements: [],
    },
  },
];
