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

/**
 * Converts item locations into graph edges representation.
 * Each location of the multi-item is transformed into an edge containing
 * source, destination, and metadata.
 *
 * @param {MultiLocationItem} multiItem - The data object containing an item and its associated locations.
 * @return {EdgeData[]} An array of edge objects representing the connections from the item to its locations.
 */
export function convertItemLocationsToEdges(
  multiItem: MultiLocationItem,
): EdgeData[] {
  return multiItem.locations.map((location) => ({
    from: location.location,
    to: formatItemNode(multiItem.item, location.location),
    metadata: location.metadata,
  }));
}

/**
 * Extracts and returns the item and location from a multi-location item node.
 *
 * @param {MultiLocationItemNode} multiLocationItem - The node representing an item with a location in a multi-location format.
 * @return {[Item, Location]} A tuple containing the extracted item and location.
 */
export function getPartsFromMultiLocationItem(
  multiLocationItem: MultiLocationItemNode,
): [Item, Location] {
  const [possibleItem, possibleLocation] = multiLocationItem.split(" - ");

  return [possibleItem, possibleLocation] as [Item, Location];
}

/**
 * Determines if the given node is a MultiLocationItemNode.
 * This method checks if the provided node contains a specific substring.
 *
 * @param {string} node - The node to be evaluated.
 * @return {boolean} Returns true if the node qualifies as a MultiLocationItemNode, otherwise false.
 */
export function isMultiLocationItemNode(
  node: string,
): node is MultiLocationItemNode {
  return node.toString().includes(" - ");
}

/**
 * Formats an `Item` into a `MultiLocationItemNode` by appending its associated `Location`.
 *
 * @param {Item} item - The item to be formatted.
 * @param {Location} location - The location to be associated with the item.
 * @return {MultiLocationItemNode} The formatted item node combining the item and location.
 */
export function formatItemNode(
  item: Item,
  location: Location,
): MultiLocationItemNode {
  return `${item} - ${location}` as MultiLocationItemNode;
}
