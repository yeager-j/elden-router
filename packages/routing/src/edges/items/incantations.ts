import { Item, Location } from "@workspace/data";

import { EdgeData } from "@/types";

export const incantationLocations: EdgeData[] = [
  {
    from: Location.ELPHAEL_BRACE_OF_THE_HALIGTREE,
    to: Item.TRIPLE_RINGS_OF_LIGHT,
    metadata: {
      description:
        "In a sealed treasure room just under the Prayer Room that requires a Stonesword Key to unlock.",
      requirements: [],
    },
  },
];
