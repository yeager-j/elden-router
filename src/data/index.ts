import "./location-connections/liurnia";
import "./location-connections/limgrave";
import "./location-connections/altus-plateau";
import "./location-connections/mountaintops-of-the-giants";
import "./location-connections/inter-region-connections";

import { getPathToItem } from "./location-graph";
import { items } from "./items";

console.log(
  JSON.stringify(
    getPathToItem(items.RIVERS_OF_BLOOD, false, true, [
      "DECTUS_MEDALLION_1",
      "DECTUS_MEDALLION_2",
    ]),
    null,
    4,
  ),
);
