"use server";

import {
  getPathToDestination,
  getPossibleDestinations,
} from "@workspace/routing/graph";
import { PathSettings } from "@workspace/routing/types";
import { Item } from "@workspace/data/items";
import { Location } from "@workspace/data/locations";

export async function getDestinations() {
  return getPossibleDestinations();
}

export async function getRoute(
  destination: Location | Item,
  settings: PathSettings,
) {
  return getPathToDestination(destination, settings);
}
