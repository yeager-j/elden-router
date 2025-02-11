import Graph from "graphology";

import {
  EnemyData,
  Flag,
  FlagData,
  GlitchNames,
  ProgressionItem,
  ProgressionItemData,
  QuestlineData,
  QuestlineStage,
  QuestlineStageData,
} from "@workspace/data";

import { EdgeMetadata, PathSettings, Requirement } from "@/types";

export function hasBossRequirement(metadata: EdgeMetadata) {
  return metadata.requirements.some((req) => req.type === "boss");
}

export function hasGlitchRequirement(metadata: EdgeMetadata) {
  return metadata.requirements.some((req) => req.type === "glitch");
}

export function hasItemRequirement(metadata: EdgeMetadata) {
  return metadata.requirements.some((req) => req.type === "item");
}

export function getMissingItems(
  metadata: EdgeMetadata,
  acquiredItems: Set<ProgressionItem>,
) {
  return metadata.requirements
    .filter((req) => req.type === "item")
    .find((req) => !acquiredItems.has(req.value))?.value;
}

export function hasQuestRequirement(metadata: EdgeMetadata) {
  return metadata.requirements.some((req) => req.type === "quest");
}

export function getIncompleteQuestlineStage(
  metadata: EdgeMetadata,
  completedStages: Set<QuestlineStage>,
) {
  return metadata.requirements
    .filter((req) => req.type === "quest")
    .find((req) => !completedStages.has(req.stage))?.stage;
}

export function hasFlagRequirement(metadata: EdgeMetadata) {
  return metadata.requirements.some((req) => req.type === "flag");
}

export function getMissingFlags(
  metadata: EdgeMetadata,
  enabledFlags: Set<Flag>,
) {
  return metadata.requirements
    .filter((req) => req.type === "flag")
    .filter((req) => !req.not)
    .find((req) => !enabledFlags.has(req.value))?.value;
}

export function getShouldNotBePresentFlags(
  metadata: EdgeMetadata,
  enabledFlags: Set<Flag>,
) {
  return metadata.requirements
    .filter((req) => req.type === "flag")
    .filter((req) => req.not)
    .find((req) => enabledFlags.has(req.value))?.value;
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

  if (hasFlagRequirement(attributes) && missingFlag) {
    return {
      valid: false,
      reason: FlagData[missingFlag].flagMissingMessage,
    };
  }

  if (hasFlagRequirement(attributes) && shouldNotBePresentFlag) {
    return {
      valid: false,
      reason: FlagData[shouldNotBePresentFlag].flagPresentMessage,
    };
  }

  if (hasBossRequirement(attributes) && !settings.allowBosses) {
    const bossData = attributes.requirements
      .filter((req) => req.type === "boss")
      .map((boss) => {
        return EnemyData[boss.value].displayName;
      });

    return {
      valid: false,
      reason: `Killing ${bossData.join(", ")} is required, but you disallowed fighting bosses.`,
    };
  }

  if (hasGlitchRequirement(attributes) && !settings.allowGlitches) {
    const glitch = attributes.requirements.find(
      (req) => req.type === "glitch",
    )!;

    return {
      valid: false,
      reason: `A ${GlitchNames[glitch.value]} is required, but you disallowed glitching.`,
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

const requirementCostMap: Record<Requirement["type"], number> = {
  boss: 10,
  glitch: 1,
  item: 3,
  quest: 5,
  flag: 8,
};

export function getEdgeCost(attributes: EdgeMetadata): number {
  return attributes.requirements.reduce(
    (acc, req) => acc + (requirementCostMap[req.type] || 0),
    0,
  );
}

export function getBestEdge(
  graph: Graph<object, EdgeMetadata>,
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
