import { describe, expect, test } from "vitest";

import { Enemy } from "@workspace/data/enemies";
import { Flag } from "@workspace/data/flags";
import { Glitch } from "@workspace/data/glitches";
import { ProgressionItem } from "@workspace/data/items";
import { QuestlineStage } from "@workspace/data/quests";

import { EdgeMetadata } from "#types";
import {
  getIncompleteQuestlineStage,
  getMissingFlags,
  hasBossRequirement,
  hasEnabledFlagRequirement,
  hasGlitchRequirement,
  hasItemRequirement,
  hasQuestRequirement,
} from "#utils/graph-utils";

describe("requirement utils", () => {
  test("hasBossRequirement: returns true when there is a boss requirement", () => {
    const attributes: EdgeMetadata = {
      requirements: {
        requiredBosses: [Enemy.MARGIT_THE_FELL_OMEN],
      },
    };

    expect(hasBossRequirement(attributes)).toBe(true);
  });

  test("hasBossRequirement: returns false when there is no boss requirement", () => {
    const attributes: EdgeMetadata = {
      requirements: {
        requiredQuests: [QuestlineStage.RANNI_STAGE_1],
        requiredItems: [ProgressionItem.ROLD_MEDALLION],
        requiredGlitch: {
          glitch: Glitch.WRONGWARP,
          description: "",
        },
      },
    };

    expect(hasBossRequirement(attributes)).toBe(false);
  });

  test("hasGlitchRequirement: returns true when there is a glitch requirement", () => {
    const attributes: EdgeMetadata = {
      requirements: {
        requiredGlitch: {
          glitch: Glitch.WRONGWARP,
          description: "",
        },
      },
    };

    expect(hasGlitchRequirement(attributes)).toBe(true);
  });

  test("hasGlitchRequirement: returns false when there is no glitch requirement", () => {
    const attributes: EdgeMetadata = {
      requirements: {
        requiredBosses: [Enemy.MARGIT_THE_FELL_OMEN],
        requiredQuests: [QuestlineStage.RANNI_STAGE_1],
        requiredItems: [ProgressionItem.ROLD_MEDALLION],
      },
    };

    expect(hasGlitchRequirement(attributes)).toBe(false);
  });

  test("hasItemRequirement: returns true when there is an item requirement", () => {
    const attributes: EdgeMetadata = {
      requirements: {
        requiredItems: [ProgressionItem.ROLD_MEDALLION],
      },
    };

    expect(hasItemRequirement(attributes)).toBe(true);
  });

  test("hasItemRequirement: returns false when there is no item requirement", () => {
    const attributes: EdgeMetadata = {
      requirements: {
        requiredBosses: [Enemy.MARGIT_THE_FELL_OMEN],
        requiredQuests: [QuestlineStage.RANNI_STAGE_1],
        requiredGlitch: {
          glitch: Glitch.WRONGWARP,
          description: "",
        },
      },
    };

    expect(hasItemRequirement(attributes)).toBe(false);
  });

  test("hasQuestRequirement: returns true when there is a quest requirement", () => {
    const attributes: EdgeMetadata = {
      requirements: {
        requiredQuests: [QuestlineStage.RANNI_STAGE_1],
      },
    };

    expect(hasQuestRequirement(attributes)).toBe(true);
  });

  test("hasQuestRequirement: returns false when there is no quest requirement", () => {
    const attributes: EdgeMetadata = {
      requirements: {
        requiredBosses: [Enemy.MARGIT_THE_FELL_OMEN],
        requiredItems: [ProgressionItem.ROLD_MEDALLION],
        requiredGlitch: {
          glitch: Glitch.WRONGWARP,
          description: "",
        },
      },
    };

    expect(hasQuestRequirement(attributes)).toBe(false);
  });

  test("getIncompleteQuestlineStage: returns undefined when there are no missing requirements", () => {
    const attributes: EdgeMetadata = {
      requirements: {
        requiredQuests: [
          QuestlineStage.RANNI_STAGE_1,
          QuestlineStage.SELLEN_STAGE_8_B,
        ],
      },
    };

    const completedStages = new Set<QuestlineStage>([
      QuestlineStage.RANNI_STAGE_1,
      QuestlineStage.SELLEN_STAGE_8_B,
      QuestlineStage.SELLEN_STAGE_5,
    ]);

    expect(getIncompleteQuestlineStage(attributes, completedStages)).toBe(
      undefined,
    );
  });

  test("getIncompleteQuestlineStage: returns the missing stage when there are missing requirements", () => {
    const attributes: EdgeMetadata = {
      requirements: {
        requiredQuests: [
          QuestlineStage.RANNI_STAGE_1,
          QuestlineStage.SELLEN_STAGE_8_B,
        ],
      },
    };

    const completedStages = new Set<QuestlineStage>([
      QuestlineStage.RANNI_STAGE_1,
    ]);

    expect(getIncompleteQuestlineStage(attributes, completedStages)).toBe(
      QuestlineStage.SELLEN_STAGE_8_B,
    );
  });

  test("hasFlagRequirement: returns true when there is a flag requirement", () => {
    const attributes: EdgeMetadata = {
      requirements: {
        requiredEnabledFlags: [Flag.RADAHN_FESTIVAL_ENABLED],
      },
    };

    expect(hasEnabledFlagRequirement(attributes)).toBe(true);
  });

  test("hasFlagRequirement: returns false when there is no flag requirement", () => {
    const attributes: EdgeMetadata = {
      requirements: {
        requiredBosses: [Enemy.MARGIT_THE_FELL_OMEN],
        requiredItems: [ProgressionItem.ROLD_MEDALLION],
        requiredGlitch: {
          glitch: Glitch.WRONGWARP,
          description: "",
        },
      },
    };

    expect(hasEnabledFlagRequirement(attributes)).toBe(false);
  });

  test("getMissingFlags: returns undefined when there are no missing flags", () => {
    const attributes: EdgeMetadata = {
      requirements: {
        requiredEnabledFlags: [Flag.RADAHN_FESTIVAL_ENABLED],
      },
    };

    const enabledFlags = new Set<Flag>([Flag.RADAHN_FESTIVAL_ENABLED]);

    expect(getMissingFlags(attributes, enabledFlags)).toBe(undefined);
  });

  test("getMissingFlags: returns the missing flag when there are missing flags", () => {
    const attributes: EdgeMetadata = {
      requirements: {
        requiredEnabledFlags: [
          Flag.RADAHN_FESTIVAL_ENABLED,
          Flag.LEYNDELL_CAPITAL_ASHEN,
        ],
      },
    };

    const enabledFlags = new Set<Flag>([Flag.RADAHN_FESTIVAL_ENABLED]);

    expect(getMissingFlags(attributes, enabledFlags)).toBe(
      Flag.LEYNDELL_CAPITAL_ASHEN,
    );
  });
});
