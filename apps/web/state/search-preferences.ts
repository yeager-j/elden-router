import { create } from "zustand";
import { persist, StorageValue } from "zustand/middleware";

import { BossPreference } from "@workspace/routing/types";
import { Flag } from "@workspace/data/flags";
import { ProgressionItem } from "@workspace/data/items";
import { QuestlineStage } from "@workspace/data/quests";

interface AppState {
  // General Preferences
  allowGlitches: boolean;
  setAllowGlitches: (value: boolean) => void;

  bossPreference: BossPreference;
  setBossPreference: (value: BossPreference) => void;

  // Item Settings
  acquiredItems: Set<ProgressionItem>;
  toggleAcquiredItem: (item: ProgressionItem) => void;

  // Flags
  enabledFlags: Set<Flag>;
  toggleFlag: (flag: Flag) => void;

  // Completed Stages
  completedStages: Set<QuestlineStage>;
  toggleStage: (stage: QuestlineStage) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // ---------- General Preferences ----------
      allowGlitches: false,
      setAllowGlitches: (value: boolean) =>
        set(() => ({ allowGlitches: value })),

      bossPreference: BossPreference.MINIMAL,
      setBossPreference: (value: BossPreference) =>
        set(() => ({ bossPreference: value })),

      // ---------- Item Settings ----------
      acquiredItems: new Set(),
      toggleAcquiredItem: (item: ProgressionItem) => {
        const currentItems = new Set(get().acquiredItems);
        if (currentItems.has(item)) {
          currentItems.delete(item);
        } else {
          currentItems.add(item);
        }
        set({ acquiredItems: currentItems });
      },

      // ---------- Flags ----------
      enabledFlags: new Set(),
      toggleFlag: (flag: Flag) => {
        const currentFlags = new Set(get().enabledFlags);
        if (currentFlags.has(flag)) {
          currentFlags.delete(flag);
        } else {
          currentFlags.add(flag);
        }
        set({ enabledFlags: currentFlags });
      },

      // ---------- Completed Stages ----------
      completedStages: new Set(),
      toggleStage: (stage: QuestlineStage) => {
        const currentStages = new Set(get().completedStages);
        if (currentStages.has(stage)) {
          currentStages.delete(stage);
        } else {
          currentStages.add(stage);
        }
        set({ completedStages: currentStages });
      },
    }),
    {
      // Everything is persisted under this single key in localStorage.
      // Change to whatever name you prefer.
      name: "elden-router",
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;

          // Parse the JSON
          const parsed: StorageValue<AppState> = JSON.parse(str);

          // Convert arrays back to Sets
          const state = parsed.state;
          return {
            ...parsed,
            state: {
              ...state,
              acquiredItems: new Set(state.acquiredItems),
              enabledFlags: new Set(state.enabledFlags),
              completedStages: new Set(state.completedStages),
            },
          };
        },
        setItem: (name, newValue) => {
          // Convert Sets to arrays so they can be stringified
          const state = newValue.state as AppState;
          const toStore = {
            ...newValue,
            state: {
              ...state,
              acquiredItems: Array.from(state.acquiredItems),
              enabledFlags: Array.from(state.enabledFlags),
              completedStages: Array.from(state.completedStages),
            },
          };

          localStorage.setItem(name, JSON.stringify(toStore));
        },

        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    },
  ),
);
