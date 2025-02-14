import { MultiGraph } from "graphology";

import { Enemy } from "@workspace/data/enemies";
import { Flag } from "@workspace/data/flags";
import { Glitch } from "@workspace/data/glitches";
import { Item, ProgressionItem } from "@workspace/data/items";
import { Location } from "@workspace/data/locations";
import { QuestlineStage } from "@workspace/data/quests";

export type MultiLocationItemNode = string & {
  __brand: "MultiLocationItemNode";
};

export type EldenGraph = MultiGraph<object, EdgeMetadata>;

export type GraphNode = Location | Item | MultiLocationItemNode;

export interface GetPathResult {
  pathSteps: PathStep[] | null;

  isError: boolean;
  reasons: string[];
}

export interface PathStep {
  from: Location;
  to: Location | Item | MultiLocationItemNode;
  metadata: EdgeMetadata;
}

export interface PathSettings {
  allowBosses: boolean;
  allowGlitches: boolean;
  acquiredItems: Set<ProgressionItem>;
  completedQuestlineStages: Set<QuestlineStage>;
  flagsEnabled: Set<Flag>;
}

export interface EdgeMetadata {
  description?: string;
  requirements: {
    requiredBosses?: Enemy[];
    requiredGlitch?: {
      glitch: Glitch;
      description: string;
    };
    requiredItems?: ProgressionItem[];
    requiredQuests?: QuestlineStage[];
    requiredEnabledFlags?: Flag[];
    requiredDisabledFlags?: Flag[];
  };
}

export interface EdgeData {
  from: Location;
  to: Location | Item | MultiLocationItemNode;
  directed?: boolean;
  metadata: EdgeMetadata;
}
