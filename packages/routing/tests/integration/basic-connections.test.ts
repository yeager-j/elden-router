import { describe, expect, test } from "vitest";

import { Location } from "@workspace/data/locations";

import { getPathToDestination } from "#graph";
import { PathSettings } from "#types";

describe("basic connections", () => {
  const config: PathSettings = {
    allowBosses: false,
    allowGlitches: false,
    acquiredItems: new Set(),
    completedQuestlineStages: new Set(),
    flagsEnabled: new Set(),
  };

  test("Limgrave -> Stormveil Castle", () => {
    const route = getPathToDestination(
      Location.LIMGRAVE_STORMVEIL_CASTLE,
      config,
    );

    expect(route).toMatchSnapshot();
  });

  test("Limgrave -> Waypoint Ruins", () => {
    const route = getPathToDestination(
      Location.LIMGRAVE_WAYPOINT_RUINS,
      config,
    );

    expect(route).toMatchSnapshot();
  });

  test("Limgrave -> Liurnia", () => {
    const route = getPathToDestination(Location.LIURNIA, config);

    expect(route).toMatchSnapshot();
  });

  test("Limgrave -> Caelid", () => {
    const route = getPathToDestination(Location.CAELID, config);

    expect(route).toMatchSnapshot();
  });

  test("Limgrave -> Divine Tower of Caelid", () => {
    const route = getPathToDestination(
      Location.DRAGONBARROW_DIVINE_TOWER_OF_CAELID,
      config,
    );

    expect(route).toMatchSnapshot();
  });
});
