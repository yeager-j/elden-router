import { MultiGraph } from "graphology";
import { dijkstra } from "graphology-shortest-path";

import { Item } from "@workspace/data/items";
import { Location } from "@workspace/data/locations";

import { allEdges } from "#edges";
import { EldenGraph, GetPathResult, PathSettings, PathStep } from "#types";
import {
  getPartsFromMultiLocationItem,
  isMultiLocationItemNode,
} from "#utils/edge-utils";
import { checkEdgeMeetsSettings, getBestEdge } from "#utils/graph-utils";

type Destination = Item | Location;

// Returns items that have been placed into the graph
export function getPossibleDestinations(): Item[] {
  const graph = buildGraph();

  const items = new Set<Item>();

  graph.nodes().forEach((node) => {
    if (isMultiLocationItemNode(node)) {
      const [item] = getPartsFromMultiLocationItem(node);

      if (Object.values(Item).includes(item)) {
        items.add(item);
      }
    }

    if (Object.values(Item).includes(node as Item)) {
      items.add(node as Item);
    }
  });

  return Array.from(items);
}

export function getPathToDestination(
  destination: Destination,
  settings: PathSettings,
): GetPathResult {
  const graph = buildGraph();
  // Copy the graph so we can filter edges
  const filteredGraph = graph.copy();

  // Keep track of why each edge was removed
  const removalReasons = new Map<string, string>();

  // Filter edges based on settings
  filteredGraph.forEachEdge((edge, attributes) => {
    const { valid, reason } = checkEdgeMeetsSettings(settings, attributes);

    if (!valid) {
      if (reason) {
        removalReasons.set(edge, reason);
      }

      filteredGraph.dropEdge(edge);
    }
  });

  const bestPath = findShortestPathToLocation(filteredGraph, destination);

  if (!bestPath) {
    // Path doesn't exist
    return constructErrorReason(
      graph,
      filteredGraph,
      removalReasons,
      destination,
    );
  }

  // If we have a path in the filtered graph, build the path steps
  return constructPath(bestPath, filteredGraph);
}

function buildGraph(): EldenGraph {
  const graph: EldenGraph = new MultiGraph();

  const nodes = new Set<string>();
  allEdges.forEach((edge) => {
    nodes.add(edge.from);
    nodes.add(edge.to);
  });

  // Add all nodes to the graph
  nodes.forEach((node) => {
    graph.addNode(node);
  });

  // Add edges
  allEdges.forEach((edge) => {
    const { from, to, directed, metadata } = edge;

    if (directed) {
      graph.addDirectedEdge(from, to, metadata);
    } else {
      graph.addUndirectedEdge(from, to, metadata);
    }
  });

  return graph;
}

function findShortestPathToLocation(
  filteredGraph: EldenGraph,
  destination: Destination,
): string[] | null {
  const destinationNodes = filteredGraph.nodes().filter((node) => {
    if (isMultiLocationItemNode(node)) {
      const [item] = getPartsFromMultiLocationItem(node);
      return item === destination;
    }

    return node === destination;
  });

  let bestPath: string[] | null = null;
  let bestCost = Infinity;

  for (const destinationNode of destinationNodes) {
    const path = dijkstra.bidirectional(
      filteredGraph,
      Location.LIMGRAVE,
      destinationNode,
    );

    if (path) {
      const cost = path.reduce((sum, node, i) => {
        if (i === 0) return sum;
        return sum + 1;
      }, 0);

      if (cost < bestCost) {
        bestCost = cost;
        bestPath = path;
      }
    }
  }

  return bestPath;
}

function constructPath(path: string[], filteredGraph: EldenGraph) {
  const pathSteps: PathStep[] = [];

  for (let i = 0; i < path.length - 1; i++) {
    const fromNode = path[i]! as Location;
    const toNode = path[i + 1]! as Location | Item;
    const edgeKeys = filteredGraph.edges(fromNode, toNode);

    const metadata = filteredGraph.getEdgeAttributes(
      getBestEdge(filteredGraph, edgeKeys),
    );

    pathSteps.push({
      from: fromNode,
      to: toNode,
      metadata,
    });
  }

  return {
    pathSteps,
    isError: false,
    reasons: [],
  };
}

function constructErrorReason(
  graph: EldenGraph,
  filteredGraph: EldenGraph,
  removalReasons: Map<string, string>,
  destination: Location | Item,
) {
  const unfilteredPaths = dijkstra.singleSource(graph, Location.LIMGRAVE);
  const unfilteredPath = unfilteredPaths[destination];

  if (!unfilteredPath) {
    // There's no path in the unfiltered graph either.
    return {
      pathSteps: null,
      isError: true,
      reasons: ["No route exists, even ignoring requirements."],
    };
  } else {
    // The unfiltered path exists, so let's see which edges were removed.
    const reasonsSet = new Set<string>();

    for (let i = 0; i < unfilteredPath.length - 1; i++) {
      const fromNode = unfilteredPath[i] as string;
      const toNode = unfilteredPath[i + 1] as string;
      const edgeKeys = graph.edges(fromNode, toNode);

      if (!edgeKeys.length) continue;

      edgeKeys.forEach((key) => {
        // If the edge was removed, add its removal reason
        if (!filteredGraph.hasEdge(key) && removalReasons.has(key)) {
          reasonsSet.add(removalReasons.get(key)!);
        }
      });
    }

    if (reasonsSet.size === 0) {
      // If no specific reasons found, fallback message
      reasonsSet.add(
        "No path found, but a route exists if you remove some restrictions.",
      );
    }

    return {
      pathSteps: null,
      isError: true,
      reasons: Array.from(reasonsSet),
    };
  }
}
