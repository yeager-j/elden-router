"use server";

import { Item, Location } from "@workspace/data";

import { getPathToDestination, PathSettings } from "@workspace/routing";

export async function getRoute(
  destination: Location | Item,
  settings: PathSettings,
) {
  return getPathToDestination(destination, settings);
}
