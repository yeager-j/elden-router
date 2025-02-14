import { Item } from "@workspace/data/items";
import { Location } from "@workspace/data/locations";

import { EdgeData } from "#types";
import { convertItemLocationsToEdges } from "#utils/edge-utils";

export const somberSmithingStone4Locations: EdgeData[] =
  convertItemLocationsToEdges({
    item: Item.SOMBER_SMITHING_STONE_4,
    locations: [
      {
        location: Location.CAELID_SELLIA_CRYSTAL_TUNNEL,
        metadata: {
          requirements: {},
        },
      },
      {
        location: Location.CAELID,
        metadata: {
          requirements: {},
        },
      },
      {
        location: Location.NOKRON_ETERNAL_CITY,
        metadata: {
          requirements: {},
        },
      },
    ],
  });

export const somberSmithingStone7Locations: EdgeData[] =
  convertItemLocationsToEdges({
    item: Item.SOMBER_SMITHING_STONE_7,
    locations: [
      {
        location: Location.MT_GELMIR_VOLCANO_MANOR_POST_EIGLAY,
        metadata: {
          requirements: {},
        },
      },
      {
        location: Location.FARUM_AZULA_POST_GODSKIN_DUO,
        metadata: {
          requirements: {},
        },
      },
      {
        location: Location.DEEPROOT_DEPTHS,
        metadata: {
          requirements: {},
        },
      },
    ],
  });

export const consumableLocations: EdgeData[] = [
  ...somberSmithingStone4Locations,
  ...somberSmithingStone7Locations,
];
