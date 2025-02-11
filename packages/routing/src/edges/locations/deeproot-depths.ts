import { Enemy, Location } from "@workspace/data";

import { EdgeData } from "@/types";

export const deeprootEdges: EdgeData[] = [
  // Access points to Deeproot Depths
  {
    from: Location.LEYNDELL_FRENZIED_FLAME_PROSCRIPTION,
    to: Location.DEEPROOT_DEPTHS,
    directed: true,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.NOKRON_SIOFRA_AQUEDUCT,
    to: Location.DEEPROOT_DEPTHS,
    directed: true,
    metadata: {
      description: "Access via defeating the Valiant Gargoyles",
      requirements: [{ type: "boss", value: Enemy.VALIANT_GARGOYLES }],
    },
  },

  // Deeproot Depths progression
  {
    from: Location.DEEPROOT_DEPTHS,
    to: Location.DEEPROOT_DEPTHS_NAMELESS_ETERNAL_CITY,
    metadata: {
      requirements: [],
    },
  },
  {
    from: Location.DEEPROOT_DEPTHS_NAMELESS_ETERNAL_CITY,
    to: Location.DEEPROOT_DEPTHS_FORTISSAX_ARENA,
    metadata: {
      requirements: [],
    },
  },
];
