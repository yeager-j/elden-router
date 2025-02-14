import { Item } from "@workspace/data/items";
import { Location } from "@workspace/data/locations";

import { EdgeData, EdgeMetadata, MultiLocationItemNode } from "#types";

export interface ItemLocation {
  location: Location;
  metadata: EdgeMetadata;
}

export interface MultiLocationItem {
  item: Item;
  locations: ItemLocation[];
}

export function convertItemLocationsToEdges(
  multiItem: MultiLocationItem,
): EdgeData[] {
  return multiItem.locations.map((location) => ({
    from: location.location,
    to: formatItemNode(multiItem.item, location.location),
    metadata: location.metadata,
  }));
}

export function getPartsFromMultiLocationItem(
  multiLocationItem: MultiLocationItemNode,
): [Item, Location] {
  const [possibleItem, possibleLocation] = multiLocationItem.split(" - ");

  return [possibleItem, possibleLocation] as [Item, Location];
}

export function isMultiLocationItemNode(
  node: string,
): node is MultiLocationItemNode {
  return node.toString().includes(" - ");
}

export function formatItemNode(
  item: Item,
  location: Location,
): MultiLocationItemNode {
  return `${item} - ${location}` as MultiLocationItemNode;
}
