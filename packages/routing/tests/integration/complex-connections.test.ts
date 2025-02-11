import { describe, expect, test } from "vitest";

import { Flag, Item, Location, ProgressionItem } from "@workspace/data";

import { getPathToDestination } from "@/graph";
import { PathSettings } from "@/types";

describe("complex connections", () => {
  const config: PathSettings = {
    allowBosses: true,
    allowGlitches: false,
    acquiredItems: new Set([
      ProgressionItem.DECTUS_MEDALLION,
      ProgressionItem.ROLD_MEDALLION,
      ProgressionItem.HALIGTREE_MEDALLION,
    ]),
    completedQuestlineStages: new Set(),
    flagsEnabled: new Set(),
  };

  test("Limgrave -> Somberstone Miner's Bell Bearing (5)", () => {
    const route = getPathToDestination(
      Item.SOMBERSTONE_MINERS_BELL_BEARING_5,
      config,
    );

    expect(route).toMatchSnapshot();
  });

  test("Limgrave -> Triple Rings of Light", () => {
    const route = getPathToDestination(Item.TRIPLE_RINGS_OF_LIGHT, {
      ...config,
      allowGlitches: true,
    });

    expect(route).toMatchSnapshot();
  });

  test("Limgrave -> Fractured Marika", () => {
    const route = getPathToDestination(Location.LEYNDELL_FRACTURED_MARIKA, {
      ...config,
      flagsEnabled: new Set([Flag.LEYNDELL_CAPITAL_ASHEN]),
    });

    expect(route).toMatchSnapshot();
  });

  test("Limgrave -> Ashen Leyndell -> Rivers of Blood", () => {
    const route = getPathToDestination(Item.RIVERS_OF_BLOOD, {
      ...config,
      flagsEnabled: new Set([Flag.LEYNDELL_CAPITAL_ASHEN]),
    });

    expect(route).toMatchSnapshot();
  });
});
