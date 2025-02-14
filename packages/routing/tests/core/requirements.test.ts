import { describe, expect, test } from "vitest";

import { Enemy, EnemyData } from "@workspace/data/enemies";
import { Flag, FlagData } from "@workspace/data/flags";
import { Glitch, GlitchNames } from "@workspace/data/glitches";
import { ProgressionItem, ProgressionItemData } from "@workspace/data/items";
import {
  QuestlineData,
  QuestlineStage,
  QuestlineStageData,
} from "@workspace/data/quests";

import { BossPreference, EdgeMetadata, PathSettings } from "#types";
import { checkEdgeMeetsSettings } from "#utils/graph-utils";

describe("checkEdgeMeetsSettings", () => {
  const mockSettings: PathSettings = {
    bossPreference: BossPreference.MINIMAL,
    allowGlitches: true,
    acquiredItems: new Set([ProgressionItem.DECTUS_MEDALLION]),
    completedQuestlineStages: new Set([QuestlineStage.SELLEN_STAGE_5]),
    flagsEnabled: new Set([Flag.RADAHN_FESTIVAL_ENABLED]),
  };

  test("returns valid for an edge with no requirements", () => {
    const edge: EdgeMetadata = { requirements: {} };

    const result = checkEdgeMeetsSettings(mockSettings, edge);
    expect(result).toEqual({ valid: true });
  });

  test("returns invalid for a boss requirement when bosses are disallowed", () => {
    const edge: EdgeMetadata = {
      requirements: {
        requiredBosses: [Enemy.MARGIT_THE_FELL_OMEN],
      },
    };

    const result = checkEdgeMeetsSettings(
      { ...mockSettings, bossPreference: BossPreference.NONE },
      edge,
    );

    expect(result).toEqual({
      valid: false,
      reason: `Killing ${EnemyData.MARGIT_THE_FELL_OMEN.displayName} is required, but you disallowed fighting bosses.`,
    });
  });

  test("returns invalid for a glitch requirement when glitches are disallowed", () => {
    const edge: EdgeMetadata = {
      requirements: {
        requiredGlitch: {
          glitch: Glitch.ZIP,
          description: "",
        },
      },
    };

    const result = checkEdgeMeetsSettings(
      { ...mockSettings, allowGlitches: false },
      edge,
    );

    expect(result).toEqual({
      valid: false,
      reason: `A ${GlitchNames.ZIP} is required, but you disallowed glitching.`,
    });
  });

  test("returns invalid for a missing progression item", () => {
    const edge: EdgeMetadata = {
      requirements: {
        requiredItems: [ProgressionItem.DECTUS_MEDALLION],
      },
    };

    const result = checkEdgeMeetsSettings(
      { ...mockSettings, acquiredItems: new Set() },
      edge,
    );

    expect(result).toEqual({
      valid: false,
      reason: `You need the ${ProgressionItemData.DECTUS_MEDALLION.displayName} to proceed.`,
    });
  });

  test("returns invalid for an incomplete quest requirement", () => {
    const edge: EdgeMetadata = {
      requirements: {
        requiredQuests: [QuestlineStage.SELLEN_STAGE_5],
      },
    };

    const result = checkEdgeMeetsSettings(
      { ...mockSettings, completedQuestlineStages: new Set() },
      edge,
    );

    expect(result).toEqual({
      valid: false,
      reason: `You must complete ${QuestlineData.SELLEN.name}'s quest up to ${QuestlineStageData.SELLEN_STAGE_5.title} to proceed.`,
    });
  });

  test("returns invalid for a missing flag requirement", () => {
    const edge: EdgeMetadata = {
      requirements: {
        requiredEnabledFlags: [Flag.RADAHN_FESTIVAL_ENABLED],
      },
    };

    const result = checkEdgeMeetsSettings(
      {
        ...mockSettings,
        flagsEnabled: new Set(),
      },
      edge,
    );

    expect(result).toEqual({
      valid: false,
      reason: FlagData[Flag.RADAHN_FESTIVAL_ENABLED].flagMissingMessage,
    });
  });

  test("returns invalid for a flag requirement that should not be present", () => {
    const edge: EdgeMetadata = {
      requirements: {
        requiredDisabledFlags: [Flag.LEYNDELL_CAPITAL_ASHEN],
      },
    };

    const result = checkEdgeMeetsSettings(
      {
        ...mockSettings,
        flagsEnabled: new Set([Flag.LEYNDELL_CAPITAL_ASHEN]),
      },
      edge,
    );

    expect(result).toEqual({
      valid: false,
      reason: FlagData[Flag.LEYNDELL_CAPITAL_ASHEN].flagPresentMessage,
    });
  });

  test("returns valid when all requirements are met", () => {
    const edge: EdgeMetadata = {
      requirements: {
        requiredBosses: [Enemy.MARGIT_THE_FELL_OMEN],
        requiredItems: [ProgressionItem.DECTUS_MEDALLION],
        requiredEnabledFlags: [Flag.RADAHN_FESTIVAL_ENABLED],
      },
    };

    const result = checkEdgeMeetsSettings(mockSettings, edge);

    expect(result).toEqual({ valid: true });
  });
});
