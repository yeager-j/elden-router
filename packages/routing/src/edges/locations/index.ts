import { ainselRiverEdges } from "#edges/locations/ainsel-river";
import { altusPlateauEdges } from "#edges/locations/altus-plateau";
import { caelidEdges } from "#edges/locations/caelid";
import { deeprootEdges } from "#edges/locations/deeproot-depths";
import { limgraveEdges } from "#edges/locations/limgrave";
import { liurniaEdges } from "#edges/locations/liurnia";
import {
  farumAzulaEdges,
  mountaintopsEdges,
  snowfieldHaligtreeEdges,
} from "#edges/locations/mountaintops";
import { siofraRiverEdges } from "#edges/locations/siofra-river";

export const allLocations = [
  ...limgraveEdges,
  ...liurniaEdges,
  ...caelidEdges,
  ...altusPlateauEdges,
  ...mountaintopsEdges,
  ...farumAzulaEdges,
  ...snowfieldHaligtreeEdges,
  ...siofraRiverEdges,
  ...ainselRiverEdges,
  ...deeprootEdges,
];
