import { Item } from "@workspace/data/items";
import { Location } from "@workspace/data/locations";

import { EdgeData } from "#types";

export const talismanLocations: EdgeData[] = [
  {
    from: Location.LEYNDELL_ASHEN_CAPITAL,
    to: Item.ERDTREE_FAVOR_2,
    metadata: {
      requirements: [],
    },
  },
];
