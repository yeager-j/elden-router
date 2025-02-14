import { describe, expect, test } from "vitest";

import { Flag } from "@workspace/data/flags";
import { Item, ProgressionItem } from "@workspace/data/items";
import { Location } from "@workspace/data/locations";

import { getPathToDestination } from "#graph";
import { PathSettings } from "#types";

describe("routing errors", () => {
  test("Cannot enter Stormveil without defeating Margit the Fell", () => {
    const settings: PathSettings = {
      bossPreference: "NONE",
      allowGlitches: false,
      acquiredItems: new Set([ProgressionItem.DECTUS_MEDALLION]),
      completedQuestlineStages: new Set(),
      flagsEnabled: new Set(),
    };

    const route = getPathToDestination(
      Location.LIMGRAVE_STORMVEIL_CASTLE,
      settings,
    );

    expect(route).toMatchSnapshot();
  });

  test("Can enter Leyndell bossless, but must allow glitches", () => {
    const settings: PathSettings = {
      bossPreference: "NONE",
      allowGlitches: false,
      acquiredItems: new Set(),
      completedQuestlineStages: new Set(),
      flagsEnabled: new Set(),
    };

    const route = getPathToDestination(
      Location.LEYNDELL_ROYAL_CAPITAL,
      settings,
    );

    expect(route).toMatchSnapshot();
  });

  test("Must have Dectus Medallion to enter Altus Plateau bossless", () => {
    const settings: PathSettings = {
      bossPreference: "NONE",
      allowGlitches: false,
      acquiredItems: new Set(),
      completedQuestlineStages: new Set(),
      flagsEnabled: new Set(),
    };

    const route = getPathToDestination(Location.ALTUS_PLATEAU, settings);

    expect(route).toMatchSnapshot();
  });

  test("Erdtree's Favor +2 is not available unless Leyndell is ashen", () => {
    const settings: PathSettings = {
      bossPreference: "NONE",
      allowGlitches: false,
      acquiredItems: new Set([ProgressionItem.DECTUS_MEDALLION]),
      completedQuestlineStages: new Set(),
      flagsEnabled: new Set(),
    };

    const route = getPathToDestination(Item.ERDTREE_FAVOR_2, settings);

    expect(route).toMatchSnapshot();
  });

  test("Bolt of Gransax is not available when Leyndell is ashen", () => {
    const settings: PathSettings = {
      bossPreference: "MINIMAL",
      allowGlitches: false,
      acquiredItems: new Set([ProgressionItem.DECTUS_MEDALLION]),
      completedQuestlineStages: new Set(),
      flagsEnabled: new Set([Flag.LEYNDELL_CAPITAL_ASHEN]),
    };

    const route = getPathToDestination(Item.BOLT_OF_GRANSAX, settings);

    expect(route).toMatchSnapshot();
  });

  test("Glintstone Kris requires both the Glintstone Key and Sorceress Sellen's questline", () => {
    const settings: PathSettings = {
      bossPreference: "MINIMAL",
      allowGlitches: false,
      acquiredItems: new Set(),
      completedQuestlineStages: new Set(),
      flagsEnabled: new Set(),
    };

    const route = getPathToDestination(Item.GLINTSTONE_KRIS, settings);

    expect(route).toMatchSnapshot();
  });
});
