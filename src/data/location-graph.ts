import { MultiDirectedGraph } from "graphology";
import { Attributes } from "react";
import { Locations } from "./locations";
import { Enemies } from "./enemies";
import { Glitches } from "./glitches";
import { dijkstra } from "graphology-shortest-path";
import { Item, items } from "./items";

interface RouteAttributes {
  boss_required?: Enemies;
  glitch_required?: Glitches;
  items_required?: (keyof typeof items)[];
  description?: string;
}

interface PathStep {
  from: string;
  to: string;
  metadata: RouteAttributes[];
}

function includesAll<T>(arrayA: T[], arrayB: T[]): boolean {
  return arrayB.every((item) => arrayA.includes(item));
}

export const graph = new MultiDirectedGraph<Attributes, RouteAttributes>();

for (const region of Object.keys(Locations)) {
  for (const location of Object.values(Locations[region as keyof Locations])) {
    graph.addNode(location);
  }
}

export function getPathToItem(
  item: Item,
  allowBosses: boolean,
  allowGlitches: boolean,
  acquiredItems: (keyof typeof items)[],
): PathStep[] | null {
  // Clone the graph to preserve the original
  const filteredGraph = graph.copy();

  // Remove edges that do not meet the conditions
  filteredGraph.forEachEdge((edge, attributes) => {
    // If a boss is required, but allowBosses is false, drop the edge
    if (attributes.boss_required && !allowBosses) {
      filteredGraph.dropEdge(edge);
    }

    // If a glitch is required, but allowGlitches is false, drop the edge
    if (attributes.glitch_required && !allowGlitches) {
      filteredGraph.dropEdge(edge);
    }

    // If an item is required, but the user does not have the item, drop the edge
    if (
      attributes.items_required &&
      !includesAll(acquiredItems, attributes.items_required)
    ) {
      filteredGraph.dropEdge(edge);
    }
  });

  const paths = dijkstra.singleSource(
    filteredGraph,
    Locations.Limgrave.LIMGRAVE,
  );
  const path = paths[item.location];

  if (!path) return null; // No path found

  const pathSteps: PathStep[] = [];

  for (let i = 0; i < path.length - 1; i++) {
    const fromNode = path[i];
    const toNode = path[i + 1];
    const edgeKeys = graph.edges(fromNode, toNode);
    const metadata = edgeKeys.map(
      (key) => graph.getEdgeAttributes(key) as RouteAttributes,
    );

    pathSteps.push({
      from: fromNode,
      to: toNode,
      metadata: metadata, // Array of all edges and their data between fromNode and toNode
    });
  }

  return pathSteps;
}
