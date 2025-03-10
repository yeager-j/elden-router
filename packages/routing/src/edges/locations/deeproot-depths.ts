import { Enemy } from "@workspace/data/enemies";
import { Location } from "@workspace/data/locations";

import { EdgeData } from "#types";

export const deeprootEdges: EdgeData[] = [
  // Access points to Deeproot Depths
  {
    from: Location.LEYNDELL_FRENZIED_FLAME_PROSCRIPTION,
    to: Location.DEEPROOT_DEPTHS,
    directed: true,
    metadata: {
      description:
        "Via a hidden path behind an illusory wall opposite the Site of Grace",
      requirements: {},
    },
  },
  {
    from: Location.NOKRON_SIOFRA_AQUEDUCT,
    to: Location.DEEPROOT_DEPTHS,
    directed: true,
    metadata: {
      description: "Access via defeating the Valiant Gargoyles",
      requirements: {
        requiredBosses: [Enemy.VALIANT_GARGOYLES],
      },
    },
  },

  // Deeproot Depths progression
  {
    from: Location.DEEPROOT_DEPTHS,
    to: Location.DEEPROOT_DEPTHS_NAMELESS_ETERNAL_CITY,
    metadata: {
      requirements: {},
    },
  },
  {
    from: Location.DEEPROOT_DEPTHS_NAMELESS_ETERNAL_CITY,
    to: Location.DEEPROOT_DEPTHS_FORTISSAX_ARENA,
    metadata: {
      requirements: {},
    },
  },
];
