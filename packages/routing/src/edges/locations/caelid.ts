import { Enemy } from "@workspace/data/enemies";
import { Flag } from "@workspace/data/flags";
import { Location } from "@workspace/data/locations";

import { EdgeData } from "#types";

export const caelidEdges: EdgeData[] = [
  // Main access to Caelid
  {
    from: Location.LIMGRAVE,
    to: Location.CAELID,
    metadata: {
      requirements: {},
    },
  },

  // Main Caelid connections
  {
    from: Location.CAELID,
    to: Location.CAELID_REDMANE_CASTLE,
    metadata: {
      requirements: {},
    },
  },
  {
    from: Location.CAELID,
    to: Location.CAELID_REDMANE_CASTLE_FESTIVAL,
    metadata: {
      description: "Castle transforms into festival grounds",
      requirements: {
        requiredEnabledFlags: [Flag.RADAHN_FESTIVAL_ENABLED],
      },
    },
  },
  {
    from: Location.CAELID,
    to: Location.DRAGONBARROW,
    metadata: {
      requirements: {},
    },
  },

  // Festival and Radahn's arena
  {
    from: Location.CAELID_REDMANE_CASTLE_FESTIVAL,
    to: Location.CAELID_WAILING_DUNES,
    metadata: {
      description: "Arena where you fight Radahn",
      requirements: {},
    },
  },
  {
    from: Location.CAELID_WAILING_DUNES,
    to: Location.CAELID_WAR_DEAD_CATACOMBS,
    metadata: {
      description: "Only accessible after defeating Radahn",
      requirements: {
        requiredBosses: [Enemy.STARSCOURGE_RADAHN],
      },
    },
  },

  // Dungeons
  {
    from: Location.CAELID,
    to: Location.CAELID_MINOR_ERDTREE_CATACOMBS,
    metadata: {
      requirements: {},
    },
  },
  {
    from: Location.CAELID,
    to: Location.CAELID_CAELID_CATACOMBS,
    metadata: {
      requirements: {},
    },
  },

  // Caves
  {
    from: Location.CAELID,
    to: Location.CAELID_ABANDONED_CAVE,
    metadata: {
      requirements: {},
    },
  },
  {
    from: Location.CAELID,
    to: Location.CAELID_GAOL_CAVE,
    metadata: {
      requirements: {},
    },
  },

  // Tunnels
  {
    from: Location.CAELID,
    to: Location.CAELID_GAEL_TUNNEL,
    metadata: {
      requirements: {},
    },
  },
  {
    from: Location.CAELID,
    to: Location.CAELID_SELLIA_CRYSTAL_TUNNEL,
    metadata: {
      requirements: {},
    },
  },

  // Special Areas
  {
    from: Location.DRAGONBARROW,
    to: Location.CAELID_SELLIA_HIDEAWAY,
    metadata: {
      description: "Access via a Spiritspring in Dragonbarrow",
      requirements: {},
    },
  },

  // Dragonbarrow sub-locations
  {
    from: Location.DRAGONBARROW,
    to: Location.DRAGONBARROW_CAVE,
    metadata: {
      requirements: {},
    },
  },
  {
    from: Location.DRAGONBARROW,
    to: Location.DRAGONBARROW_DIVINE_TOWER_OF_CAELID,
    metadata: {
      requirements: {},
    },
  },
];
