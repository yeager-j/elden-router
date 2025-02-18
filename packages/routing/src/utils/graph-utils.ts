import { MultiDirectedGraph } from "graphology";

import { EnemyData } from "@workspace/data/enemies";
import { Flag, FlagData } from "@workspace/data/flags";
import { GlitchNames } from "@workspace/data/glitches";
import { ProgressionItem, ProgressionItemData } from "@workspace/data/items";
import {
  QuestlineData,
  QuestlineStage,
  QuestlineStageData,
} from "@workspace/data/quests";

import { EdgeMetadata, PathSettings } from "#types";

/**
 * Determines if the provided metadata has a "requiredBosses" property in its requirements.
 *
 * @param {EdgeMetadata} metadata - The metadata object to check for boss requirements.
 * @return {boolean} Returns true if the metadata requirements include a non-empty "requiredBosses" property; otherwise, false.
 */
export function hasBossRequirement(
  metadata: EdgeMetadata,
): metadata is EdgeMetadata & {
  requirements: Required<Pick<EdgeMetadata["requirements"], "requiredBosses">>;
} {
  return (metadata.requirements.requiredBosses?.length ?? 0) > 0;
}

/**
 * Determines whether the given metadata includes a required glitch requirement.
 *
 * @param {EdgeMetadata} metadata - The metadata to be checked for a glitch requirement.
 * @return {boolean} Returns true if the metadata includes a required glitch requirement; otherwise, false.
 */
export function hasGlitchRequirement(
  metadata: EdgeMetadata,
): metadata is EdgeMetadata & {
  requirements: Required<Pick<EdgeMetadata["requirements"], "requiredGlitch">>;
} {
  return metadata.requirements.requiredGlitch !== undefined;
}

/**
 * Determines if the given metadata has a requirement for required items.
 *
 * @param {EdgeMetadata} metadata - The metadata object to check for item requirements.
 * @return {boolean} Returns `true` if the metadata includes a requiredItems requirement; otherwise, `false`.
 */
export function hasItemRequirement(
  metadata: EdgeMetadata,
): metadata is EdgeMetadata & {
  requirements: Required<Pick<EdgeMetadata["requirements"], "requiredItems">>;
} {
  return (metadata.requirements.requiredItems?.length ?? 0) > 0;
}

/**
 * Determines the missing required items from the given set of acquired items.
 *
 * @param {EdgeMetadata} metadata - The metadata object containing the requirements.
 * @param {Set<ProgressionItem>} acquiredItems - A set of items that have already been acquired.
 * @return {ProgressionItem | undefined} The first missing required item, or undefined if all required items are acquired.
 */
export function getMissingItems(
  metadata: EdgeMetadata,
  acquiredItems: Set<ProgressionItem>,
): ProgressionItem | undefined {
  return metadata.requirements.requiredItems?.find(
    (req) => !acquiredItems.has(req),
  );
}

/**
 * Determines if the given metadata contains quest requirements.
 *
 * @param {EdgeMetadata} metadata - The metadata object to check for quest requirements.
 * @return {boolean} - Returns true if the metadata contains the required quests; otherwise, false.
 */
export function hasQuestRequirement(
  metadata: EdgeMetadata,
): metadata is EdgeMetadata & {
  requirements: Required<Pick<EdgeMetadata["requirements"], "requiredQuests">>;
} {
  return (metadata.requirements.requiredQuests?.length ?? 0) > 0;
}

/**
 * Retrieves the first incomplete questline stage from the required quests based on completed stages.
 *
 * @param {EdgeMetadata} metadata - The metadata containing quest requirements and related information.
 * @param {Set<QuestlineStage>} completedStages - A set of completed questline stages.
 * @return {QuestlineStage | undefined} The first incomplete questline stage if found, otherwise undefined.
 */
export function getIncompleteQuestlineStage(
  metadata: EdgeMetadata,
  completedStages: Set<QuestlineStage>,
): QuestlineStage | undefined {
  return metadata.requirements.requiredQuests?.find(
    (req) => !completedStages.has(req),
  );
}

/**
 * Determines if the metadata has a requirement for enabled flags.
 *
 * @param {EdgeMetadata} metadata - The metadata to evaluate for enabled flag requirements.
 * @return {boolean} Returns true if the metadata has a requirement for enabled flags; otherwise, false.
 */
export function hasEnabledFlagRequirement(
  metadata: EdgeMetadata,
): metadata is EdgeMetadata & {
  requirements: Required<
    Pick<EdgeMetadata["requirements"], "requiredEnabledFlags">
  >;
} {
  return (metadata.requirements.requiredEnabledFlags?.length ?? 0) > 0;
}

/**
 * Checks if the metadata has a requirement for disabled flags.
 *
 * @param {EdgeMetadata} metadata - The metadata object to check.
 * @return {boolean} Returns true if the metadata contains a requirement for disabled flags; otherwise, false.
 */
export function hasDisabledFlagRequirement(
  metadata: EdgeMetadata,
): metadata is EdgeMetadata & {
  requirements: Required<
    Pick<EdgeMetadata["requirements"], "requiredDisabledFlags">
  >;
} {
  return (metadata.requirements.requiredDisabledFlags?.length ?? 0) > 0;
}

/**
 * Identifies and retrieves the first flag that is required but not present in the provided set of enabled flags.
 *
 * @param {EdgeMetadata} metadata - An object containing metadata, including the required flags.
 * @param {Set<Flag>} enabledFlags - A set of flags that are currently enabled.
 * @return {Flag | undefined} The first missing required flag if found, otherwise undefined.
 */
export function getMissingFlags(
  metadata: EdgeMetadata,
  enabledFlags: Set<Flag>,
): Flag | undefined {
  return metadata.requirements.requiredEnabledFlags?.find(
    (req) => !enabledFlags.has(req),
  );
}

/**
 * Determines if any flags that should not be present are currently enabled.
 *
 * @param {EdgeMetadata} metadata - The metadata containing the requirements for the flags.
 * @param {Set<Flag>} enabledFlags - A set of flags that are currently enabled.
 * @return {Flag | undefined} A flag that should not be present but is enabled, or undefined if no such flag exists.
 */
export function getShouldNotBePresentFlags(
  metadata: EdgeMetadata,
  enabledFlags: Set<Flag>,
): Flag | undefined {
  return metadata.requirements.requiredDisabledFlags?.find((req) =>
    enabledFlags.has(req),
  );
}

/**
 * Checks whether an edge satisfies the given settings and determines if it is valid or not based on various requirements.
 *
 * @param {PathSettings} settings - Configuration settings that include preferences, flags, and other parameters for validation.
 * @param {EdgeMetadata} attributes - Metadata of the edge including its requirements, flags, items, and questline stages.
 * @return {{ valid: boolean, reason?: string }} - An object indicating if the edge is valid. If invalid, includes a reason describing the unmet requirement.
 */
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

  if (hasBossRequirement(attributes) && settings.bossPreference === "NONE") {
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

/**
 * Calculates the cost of an edge based on its requirements and associated cost mappings.
 *
 * @param {EdgeMetadata} attributes - The metadata describing the edge, including various requirements such as bosses, items, quests, and flags.
 * @return {number} The total calculated cost for the edge.
 */
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

/**
 * Finds the edge with the best (lowest) cost from the provided edge keys.
 *
 * @param {MultiDirectedGraph<object, EdgeMetadata>} graph - The graph containing the edges.
 * @param {string[]} edgeKeys - An array of edge keys to consider for finding the best edge.
 * @return {string} The key of the edge with the lowest cost.
 * @throws {Error} If no edges are found in the provided edge keys.
 */
export function getBestEdge(
  graph: MultiDirectedGraph<object, EdgeMetadata>,
  edgeKeys: string[],
): string {
  const edgesWithAttributes = edgeKeys.map((key) => ({
    key,
    attributes: graph.getEdgeAttributes(key),
  }));

  edgesWithAttributes.sort((a, b) => {
    return getEdgeCost(a.attributes) - getEdgeCost(b.attributes);
  });

  if (!edgesWithAttributes[0]) {
    throw new Error(`No edges found`);
  }

  return edgesWithAttributes[0].key;
}
