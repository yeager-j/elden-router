import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { Flag, ProgressionItem, QuestlineStage } from "@workspace/data";

// General Preferences
export const allowGlitchesAtom = atomWithStorage("allowGlitches", false);
export const allowBossesAtom = atomWithStorage("allowBosses", false);

// Item Settings
export const acquiredItemsAtom = atomWithStorage<ProgressionItem[]>(
  "acquiredItems", // Key in localStorage
  [], // Default value
);

// Utility to interact with the `Set`
export const acquiredItemsSetAtom = atom(
  (get) => new Set<ProgressionItem>(get(acquiredItemsAtom)), // Convert array to Set
  (get, set, stageId: ProgressionItem) => {
    const acquiredItems = new Set<ProgressionItem>(get(acquiredItemsAtom)); // Clone current Set
    if (acquiredItems.has(stageId)) {
      acquiredItems.delete(stageId); // Remove if already completed
    } else {
      acquiredItems.add(stageId); // Add if not completed
    }
    set(acquiredItemsAtom, [...acquiredItems]); // Save as array
  },
);

// Flags
export const enabledFlagsAtom = atomWithStorage<Flag[]>(
  "enabledFlags", // Key in localStorage
  [], // Default value
);

// Utility to interact with the `Set`
export const enabledFlagsSetAtom = atom(
  (get) => new Set<Flag>(get(enabledFlagsAtom)), // Convert array to Set
  (get, set, stageId: Flag) => {
    const enabledFlags = new Set<Flag>(get(enabledFlagsAtom)); // Clone current Set
    if (enabledFlags.has(stageId)) {
      enabledFlags.delete(stageId); // Remove if already completed
    } else {
      enabledFlags.add(stageId); // Add if not completed
    }
    set(enabledFlagsAtom, [...enabledFlags]); // Save as array
  },
);

export const completedStagesAtom = atomWithStorage<QuestlineStage[]>(
  "completedStages", // Key in localStorage
  [], // Default value
);

// Utility to interact with the `Set`
export const completedStagesSetAtom = atom(
  (get) => new Set<QuestlineStage>(get(completedStagesAtom)), // Convert array to Set
  (get, set, stageId: QuestlineStage) => {
    const completedStages = new Set<QuestlineStage>(get(completedStagesAtom)); // Clone current Set
    if (completedStages.has(stageId)) {
      completedStages.delete(stageId); // Remove if already completed
    } else {
      completedStages.add(stageId); // Add if not completed
    }
    set(completedStagesAtom, [...completedStages]); // Save as array
  },
);
