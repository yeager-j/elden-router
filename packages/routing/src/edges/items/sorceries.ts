import { Item } from "@workspace/data/items";
import { Location } from "@workspace/data/locations";

import { EdgeData } from "#types";

export const sorceryLocations: EdgeData[] = [
  {
    from: Location.CAELID_WAR_DEAD_CATACOMBS,
    to: Item.COLLAPSING_STARS,
    metadata: {
      description:
        "In the center of the floor of the West-most wall in the Scarlet Rot area",
      requirements: [],
    },
  },
];
