import { MultiDirectedGraph } from "graphology";
import { describe, expect, test } from "vitest";

import { Enemy } from "@workspace/data/enemies";
import { Flag } from "@workspace/data/flags";
import { Glitch } from "@workspace/data/glitches";
import { ProgressionItem } from "@workspace/data/items";
import { QuestlineStage } from "@workspace/data/quests";

import { EdgeMetadata } from "#types";
import { getBestEdge, getEdgeCost } from "#utils";

describe("edge sort logic", () => {
  test("getEdgeCost: calculates correct cost for various edge requirements", () => {
    const edge1Metadata: EdgeMetadata = {
      requirements: [
        { type: "boss", value: Enemy.MARGIT_THE_FELL_OMEN },
        { type: "item", value: ProgressionItem.DECTUS_MEDALLION },
      ],
    };

    const edge2Metadata: EdgeMetadata = {
      requirements: [
        { type: "glitch", value: Glitch.ZIP, description: "" },
        { type: "quest", stage: QuestlineStage.RANNI_STAGE_1 },
      ],
    };

    const edge3Metadata: EdgeMetadata = {
      requirements: [{ type: "flag", value: Flag.RADAHN_DEFEATED }],
    };

    expect(getEdgeCost(edge1Metadata)).toBe(13);
    expect(getEdgeCost(edge2Metadata)).toBe(6);
    expect(getEdgeCost(edge3Metadata)).toBe(8);
  });

  test("getBestEdge: prefers glitches over bosses", () => {
    const graph = new MultiDirectedGraph<object, EdgeMetadata>();

    const nodeA = "A";
    const nodeB = "B";

    graph.addNode(nodeA);
    graph.addNode(nodeB);

    const edge1Metadata: EdgeMetadata = {
      requirements: [{ type: "boss", value: Enemy.MARGIT_THE_FELL_OMEN }],
    };

    const edge2Metadata: EdgeMetadata = {
      requirements: [{ type: "glitch", value: Glitch.ZIP, description: "" }],
    };

    // Add multiple edges between A -> B
    graph.addEdge(nodeA, nodeB, edge1Metadata);
    graph.addEdge(nodeA, nodeB, edge2Metadata);

    const bestEdge = getBestEdge(graph, graph.edges(nodeA, nodeB));

    expect(graph.getEdgeAttributes(bestEdge)).toEqual(edge2Metadata);
  });

  test("getBestEdge: prefers items over flags", () => {
    const graph = new MultiDirectedGraph<object, EdgeMetadata>();

    const nodeA = "A";
    const nodeB = "B";

    graph.addNode(nodeA);
    graph.addNode(nodeB);

    const edge1Metadata: EdgeMetadata = {
      requirements: [{ type: "item", value: ProgressionItem.DECTUS_MEDALLION }],
    };

    const edge2Metadata: EdgeMetadata = {
      requirements: [{ type: "flag", value: Flag.RADAHN_DEFEATED }],
    };

    // Add multiple edges between A -> B
    graph.addEdge(nodeA, nodeB, edge1Metadata);
    graph.addEdge(nodeA, nodeB, edge2Metadata);

    const bestEdge = getBestEdge(graph, graph.edges(nodeA, nodeB));

    expect(graph.getEdgeAttributes(bestEdge)).toEqual(edge1Metadata);
  });

  test("getBestEdge: prefers glitches and items over quests", () => {
    const graph = new MultiDirectedGraph<object, EdgeMetadata>();

    const nodeA = "A";
    const nodeB = "B";

    graph.addNode(nodeA);
    graph.addNode(nodeB);

    const edge1Metadata: EdgeMetadata = {
      requirements: [{ type: "quest", stage: QuestlineStage.SELLEN_STAGE_5 }],
    };

    const edge2Metadata: EdgeMetadata = {
      requirements: [
        { type: "glitch", value: Glitch.ZIP, description: "" },
        { type: "item", value: ProgressionItem.DECTUS_MEDALLION },
      ],
    };

    // Add multiple edges between A -> B
    graph.addEdge(nodeA, nodeB, edge1Metadata);
    graph.addEdge(nodeA, nodeB, edge2Metadata);

    const bestEdge = getBestEdge(graph, graph.edges(nodeA, nodeB));

    expect(graph.getEdgeAttributes(bestEdge)).toEqual(edge2Metadata);
  });
});
