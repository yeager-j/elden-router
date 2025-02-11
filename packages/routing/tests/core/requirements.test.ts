import { describe, expect, test } from "vitest";

import {
  Enemy,
  EnemyData,
  Flag,
  FlagData,
  Glitch,
  GlitchNames,
  ProgressionItem,
  ProgressionItemData,
  QuestlineData,
  QuestlineStage,
  QuestlineStageData,
} from "@workspace/data";

import { EdgeMetadata, PathSettings } from "@/types";
import { checkEdgeMeetsSettings } from "@/utils";

describe("checkEdgeMeetsSettings", () => {
  const mockSettings: PathSettings = {
    allowBosses: true,
    allowGlitches: true,
    acquiredItems: new Set([ProgressionItem.DECTUS_MEDALLION]),
    completedQuestlineStages: new Set([QuestlineStage.SELLEN_STAGE_5]),
    flagsEnabled: new Set([Flag.RADAHN_FESTIVAL_ENABLED]),
  };

  test("returns valid for an edge with no requirements", () => {
    const edge: EdgeMetadata = { requirements: [] };

    const result = checkEdgeMeetsSettings(mockSettings, edge);
    expect(result).toEqual({ valid: true });
  });

  test("returns invalid for a boss requirement when bosses are disallowed", () => {
    const edge: EdgeMetadata = {
      requirements: [{ type: "boss", value: Enemy.MARGIT_THE_FELL }], // Mock enemy ID
    };

    const result = checkEdgeMeetsSettings(
      { ...mockSettings, allowBosses: false },
      edge,
    );

    expect(result).toEqual({
      valid: false,
      reason: `Killing ${EnemyData.MARGIT_THE_FELL.displayName} is required, but you disallowed fighting bosses.`,
    });
  });

  test("returns invalid for a glitch requirement when glitches are disallowed", () => {
    const edge: EdgeMetadata = {
      requirements: [{ type: "glitch", value: Glitch.ZIP, description: "" }], // Mock glitch ID
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
      requirements: [{ type: "item", value: ProgressionItem.DECTUS_MEDALLION }],
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
      requirements: [{ type: "quest", stage: QuestlineStage.SELLEN_STAGE_5 }],
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
      requirements: [{ type: "flag", value: Flag.RADAHN_FESTIVAL_ENABLED }],
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

  test("returns valid when all requirements are met", () => {
    const edge: EdgeMetadata = {
      requirements: [
        { type: "boss", value: Enemy.MARGIT_THE_FELL },
        { type: "item", value: ProgressionItem.DECTUS_MEDALLION },
        { type: "flag", value: Flag.RADAHN_FESTIVAL_ENABLED },
      ],
    };

    const result = checkEdgeMeetsSettings(mockSettings, edge);

    expect(result).toEqual({ valid: true });
  });
});
