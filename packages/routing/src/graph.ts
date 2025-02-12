import { MultiGraph } from "graphology";
import { dijkstra } from "graphology-shortest-path";

import { Item } from "@workspace/data/items";
import { Location } from "@workspace/data/locations";

import { allEdges } from "#edges";
import { EdgeMetadata, GetPathResult, PathSettings, PathStep } from "#types";
import { checkEdgeMeetsSettings, getBestEdge } from "#utils";

export function buildGraph(): MultiGraph<object, EdgeMetadata> {
  const graph: MultiGraph<object, EdgeMetadata> = new MultiGraph();

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

export function getPathToDestination(
  destination: Location | Item,
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

  // Attempt to find a path in the filtered graph
  const paths = dijkstra.singleSource(filteredGraph, Location.LIMGRAVE);
  const path = paths[destination];

  if (!path) {
    // No path in the filtered graph.
    // Check if there's a path in the unfiltered graph.
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

  // If we have a path in the filtered graph, build the path steps
  const pathSteps: PathStep[] = [];

  for (let i = 0; i < path.length - 1; i++) {
    const fromNode = path[i]! as Location;
    const toNode = path[i + 1]! as Location | Item;
    const edgeKeys = filteredGraph.edges(fromNode, toNode);

    const metadata = graph.getEdgeAttributes(getBestEdge(graph, edgeKeys));

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
