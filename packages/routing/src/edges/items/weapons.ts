import { Item } from "@workspace/data/items";
import { Location } from "@workspace/data/locations";

import { EdgeData } from "#types";

export const weaponLocations: EdgeData[] = [
  {
    from: Location.MOUNTAINTOPS_OF_THE_GIANTS,
    to: Item.RIVERS_OF_BLOOD,
    metadata: {
      description:
        "Defeat Bloody Finger Okina when he invades in the Church of Repose",
      requirements: [],
    },
  },
  {
    from: Location.LEYNDELL_ERDTREE_SANCTUARY,
    to: Item.BOLT_OF_GRANSAX,
    metadata: {
      description:
        "This weapon is found on the giant spear lodged into the building",
      requirements: [],
    },
  },
];
