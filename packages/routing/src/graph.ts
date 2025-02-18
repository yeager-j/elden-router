import { MultiGraph } from "graphology";
import { dijkstra } from "graphology-shortest-path";

import { Item } from "@workspace/data/items";
import { Location } from "@workspace/data/locations";

import { allEdges } from "#edges";
import {
  BossPreference,
  EldenGraph,
  GetPathResult,
  PathSettings,
  PathStep,
} from "#types";
import {
  getPartsFromMultiLocationItem,
  isMultiLocationItemNode,
} from "#utils/edge-utils";
import { checkEdgeMeetsSettings, getBestEdge } from "#utils/graph-utils";

type Destination = Item | Location;

/**
 * Retrieves a list of possible destination items by analyzing a graph and identifying specific nodes.
 *
 * @return {Item[]} An array of unique items that represent possible destinations extracted from the graph.
 */
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

/**
 * Determines the optimal path to a specified destination based on the provided settings.
 *
 * @param {Destination} destination - The destination to which the path is being calculated.
 * @param {PathSettings} settings - The configuration settings that influence path calculation, such as preferences and constraints.
 * @return {GetPathResult} Returns the result of the pathfinding operation, which includes the calculated path or an error reason if no suitable path exists.
 */
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

  const bestPath = findShortestPathToLocation(
    filteredGraph,
    destination,
    settings.bossPreference,
  );

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

/**
 * Constructs and returns a graph based on a set of edges, adding nodes and edges appropriately.
 *
 * This method initializes a new graph and processes a collection of edges to determine the
 * nodes and connections between them. Nodes are added to the graph, and edges are created
 * as directed or undirected based on the edge metadata.
 *
 * @return {EldenGraph} A graph containing all nodes and edges as specified by the input data.
 */
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

/**
 * Finds the shortest path to a specified destination node within the given graph.
 *
 * @param {EldenGraph} graph - The graph representing the interconnected locations and paths.
 * @param {Destination} destination - The target destination to which the shortest path is to be found.
 * @param {BossPreference} bossPreference - The preferred boss-related criteria to influence the pathfinding cost calculation.
 * @return {string[] | null} - The shortest path as an array of node names, or null if no path exists.
 */
function findShortestPathToLocation(
  graph: EldenGraph,
  destination: Destination,
  bossPreference: BossPreference,
): string[] | null {
  const destinationNodes = graph.nodes().filter((node) => {
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
      graph,
      Location.LIMGRAVE,
      destinationNode,
      (_, attributes) => {
        if (bossPreference === BossPreference.ANY) {
          return 0;
        }

        return (attributes.requirements.requiredBosses?.length ?? 0) * 100;
      },
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

/**
 * Constructs a path object containing steps and metadata based on the provided path and graph.
 *
 * @param {string[]} path - An array of strings representing the ordered nodes in the path.
 * @param {EldenGraph} filteredGraph - The graph object containing nodes and edges with associated attributes.
 * @return {GetPathResult} An object containing the constructed path steps, an error flag, and a list of reasons for errors if any.
 */
function constructPath(
  path: string[],
  filteredGraph: EldenGraph,
): GetPathResult {
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

/**
 * Constructs an error reason based on the provided graph, filtered graph, removal reasons, and destination.
 * It identifies why a path cannot be constructed, highlighting restrictions or missing connections.
 *
 * @param {EldenGraph} graph The complete graph containing all nodes and edges.
 * @param {EldenGraph} filteredGraph The graph with certain edges or nodes removed due to constraints.
 * @param {Map<string, string>} removalReasons A map of edges to their associated removal reasons (e.g., restrictions or requirements).
 * @param {Location | Item} destination The target destination for which the path is to be calculated.
 * @return {GetPathResult} An object containing the error state, an optional path (null in error state),
 *                          and a list of reasons explaining why no path exists or is valid.
 */
function constructErrorReason(
  graph: EldenGraph,
  filteredGraph: EldenGraph,
  removalReasons: Map<string, string>,
  destination: Location | Item,
): GetPathResult {
  const unfilteredPath = findShortestPathToLocation(
    graph,
    destination,
    BossPreference.ANY,
  );

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
