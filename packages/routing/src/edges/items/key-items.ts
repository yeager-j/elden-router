import { Item } from "@workspace/data/items";
import { Location } from "@workspace/data/locations";

import { EdgeData } from "#types";

export const keyItemLocations: EdgeData[] = [
  {
    from: Location.FARUM_AZULA_POST_GODSKIN_DUO,
    to: Item.SOMBERSTONE_MINERS_BELL_BEARING_5,
    metadata: {
      description:
        "Down the elevator from the 'Beside the Great Bridge' Site of Grace in the small church",
      requirements: [],
    },
  },
];
