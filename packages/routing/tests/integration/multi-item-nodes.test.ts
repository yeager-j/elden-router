import { describe, expect, test } from "vitest";

import { Item, ProgressionItem } from "@workspace/data/items";

import { getPathToDestination } from "#graph";
import { BossPreference, PathSettings } from "#types";

describe("multi-location items", () => {
  const config: PathSettings = {
    bossPreference: BossPreference.MINIMAL,
    allowGlitches: true,
    acquiredItems: new Set([
      ProgressionItem.DECTUS_MEDALLION,
      ProgressionItem.ROLD_MEDALLION,
      ProgressionItem.HALIGTREE_MEDALLION,
    ]),
    completedQuestlineStages: new Set(),
    flagsEnabled: new Set(),
  };

  test("Finds the fastest way to a Somber Smithing Stone 4", () => {
    const route = getPathToDestination(Item.SOMBER_SMITHING_STONE_4, config);

    expect(route).toMatchSnapshot();
  });

  test("Finds the fastest way to a Somber Smithing Stone 7", () => {
    const route = getPathToDestination(Item.SOMBER_SMITHING_STONE_7, config);

    expect(route).toMatchSnapshot();
  });
});
