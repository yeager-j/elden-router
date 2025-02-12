import { MultiDirectedGraph } from "graphology";

import { EnemyData } from "@workspace/data/enemies";
import { Flag, FlagData } from "@workspace/data/flags";
import { Glitch, GlitchNames } from "@workspace/data/glitches";
import { ProgressionItem, ProgressionItemData } from "@workspace/data/items";
import {
  QuestlineData,
  QuestlineStage,
  QuestlineStageData,
} from "@workspace/data/quests";

import { EdgeMetadata, PathSettings } from "#types";

export function hasBossRequirement(
  metadata: EdgeMetadata,
): metadata is EdgeMetadata & {
  requirements: Required<Pick<EdgeMetadata["requirements"], "requiredBosses">>;
} {
  return (metadata.requirements.requiredBosses?.length ?? 0) > 0;
}

export function hasGlitchRequirement(
  metadata: EdgeMetadata,
): metadata is EdgeMetadata & {
  requirements: Required<Pick<EdgeMetadata["requirements"], "requiredGlitch">>;
} {
  return metadata.requirements.requiredGlitch !== undefined;
}

export function hasItemRequirement(
  metadata: EdgeMetadata,
): metadata is EdgeMetadata & {
  requirements: Required<Pick<EdgeMetadata["requirements"], "requiredItems">>;
} {
  return (metadata.requirements.requiredItems?.length ?? 0) > 0;
}

export function getMissingItems(
  metadata: EdgeMetadata,
  acquiredItems: Set<ProgressionItem>,
) {
  return metadata.requirements.requiredItems?.find(
    (req) => !acquiredItems.has(req),
  );
}

export function hasQuestRequirement(
  metadata: EdgeMetadata,
): metadata is EdgeMetadata & {
  requirements: Required<Pick<EdgeMetadata["requirements"], "requiredQuests">>;
} {
  return (metadata.requirements.requiredQuests?.length ?? 0) > 0;
}

export function getIncompleteQuestlineStage(
  metadata: EdgeMetadata,
  completedStages: Set<QuestlineStage>,
) {
  return metadata.requirements.requiredQuests?.find(
    (req) => !completedStages.has(req),
  );
}

export function hasEnabledFlagRequirement(
  metadata: EdgeMetadata,
): metadata is EdgeMetadata & {
  requirements: Required<
    Pick<EdgeMetadata["requirements"], "requiredEnabledFlags">
  >;
} {
  return (metadata.requirements.requiredEnabledFlags?.length ?? 0) > 0;
}

export function hasDisabledFlagRequirement(
  metadata: EdgeMetadata,
): metadata is EdgeMetadata & {
  requirements: Required<
    Pick<EdgeMetadata["requirements"], "requiredDisabledFlags">
  >;
} {
  return (metadata.requirements.requiredDisabledFlags?.length ?? 0) > 0;
}

export function getMissingFlags(
  metadata: EdgeMetadata,
  enabledFlags: Set<Flag>,
) {
  return metadata.requirements.requiredEnabledFlags?.find(
    (req) => !enabledFlags.has(req),
  );
}

export function getShouldNotBePresentFlags(
  metadata: EdgeMetadata,
  enabledFlags: Set<Flag>,
) {
  return metadata.requirements.requiredDisabledFlags?.find((req) =>
    enabledFlags.has(req),
  );
}

export function checkEdgeMeetsSettings(
  settings: PathSettings,
  attributes: EdgeMetadata,
): { valid: boolean; reason?: string } {
  const missingFlag = getMissingFlags(attributes, settings.flagsEnabled);
  const shouldNotBePresentFlag = getShouldNotBePresentFlags(
    attributes,
    settings.flagsEnabled,
  );

  if (hasEnabledFlagRequirement(attributes) && missingFlag) {
    return {
      valid: false,
      reason: FlagData[missingFlag].flagMissingMessage,
    };
  }

  if (hasDisabledFlagRequirement(attributes) && shouldNotBePresentFlag) {
    return {
      valid: false,
      reason: FlagData[shouldNotBePresentFlag].flagPresentMessage,
    };
  }

  if (hasBossRequirement(attributes) && !settings.allowBosses) {
    const bossData = attributes.requirements.requiredBosses!.map((boss) => {
      return EnemyData[boss].displayName;
    });

    return {
      valid: false,
      reason: `Killing ${bossData.join(", ")} is required, but you disallowed fighting bosses.`,
    };
  }

  if (hasGlitchRequirement(attributes) && !settings.allowGlitches) {
    const glitch = attributes.requirements.requiredGlitch.glitch;

    return {
      valid: false,
      reason: `A ${GlitchNames[glitch]} is required, but you disallowed glitching.`,
    };
  }

  const unacquiredItem = getMissingItems(attributes, settings.acquiredItems);

  if (hasItemRequirement(attributes) && unacquiredItem) {
    return {
      valid: false,
      reason: `You need the ${ProgressionItemData[unacquiredItem].displayName} to proceed.`,
    };
  }

  const incompleteStage = getIncompleteQuestlineStage(
    attributes,
    settings.completedQuestlineStages,
  );

  if (hasQuestRequirement(attributes) && incompleteStage) {
    const incompleteStageData = QuestlineStageData[incompleteStage];
    const incompleteQuestlineData =
      QuestlineData[incompleteStageData.questline];

    return {
      valid: false,
      reason: `You must complete ${incompleteQuestlineData.name}'s quest up to ${incompleteStageData.title} to proceed.`,
    };
  }

  // If none of the requirements are violated, it's valid
  return { valid: true };
}

const requirementCostMap = {
  boss: 10,
  glitch: 1,
  item: 3,
  quest: 5,
  flag: 8,
};

export function getEdgeCost(attributes: EdgeMetadata): number {
  let cost = 0;

  if (hasBossRequirement(attributes)) {
    cost +=
      attributes.requirements.requiredBosses.length * requirementCostMap.boss;
  }

  if (hasGlitchRequirement(attributes)) {
    cost += requirementCostMap.glitch;
  }

  if (hasItemRequirement(attributes)) {
    cost +=
      attributes.requirements.requiredItems.length * requirementCostMap.item;
  }

  if (hasQuestRequirement(attributes)) {
    cost +=
      attributes.requirements.requiredQuests.length * requirementCostMap.quest;
  }

  if (hasEnabledFlagRequirement(attributes)) {
    cost +=
      attributes.requirements.requiredEnabledFlags.length *
      requirementCostMap.flag;
  }

  if (hasDisabledFlagRequirement(attributes)) {
    cost +=
      attributes.requirements.requiredDisabledFlags.length *
      requirementCostMap.flag;
  }

  return cost;
}

export function getBestEdge(
  graph: MultiDirectedGraph<object, EdgeMetadata>,
  edgeKeys: string[],
) {
  const edgesWithAttributes = edgeKeys.map((key) => ({
    key,
    attributes: graph.getEdgeAttributes(key),
  }));

  edgesWithAttributes.sort((a, b) => {
    return getEdgeCost(a.attributes) - getEdgeCost(b.attributes);
  });

  if (!edgesWithAttributes[0]) {
    throw new Error("No edges found");
  }

  return edgesWithAttributes[0].key;
}
