import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { useAppStore } from "@/state/search-preferences";

import { Badge } from "@workspace/ui/components/badge";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Label } from "@workspace/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { QuestlineStage, QuestlineStageData } from "@workspace/data/quests";

interface QuestlineStageCardProps
  extends ComponentPropsWithoutRef<typeof Checkbox> {
  stage: QuestlineStage;
  onNextStage: (stage: QuestlineStage) => void;
}

export default function QuestlineStageCard(props: QuestlineStageCardProps) {
  const { stage, onNextStage, ...checkboxProps } = props;
  const localStorageKey = `QuestlineDecision-${stage}`;
  const metadata = QuestlineStageData[stage];
  const completedStages = useAppStore((state) => state.completedStages);
  const toggleStage = useAppStore((state) => state.toggleStage);

  const [questDecision, setQuestDecision] = useState<QuestlineStage>();

  function recursiveResetQuestStage(stage: QuestlineStage) {
    const metadata = QuestlineStageData[stage];

    metadata.nextStage.forEach((stage) => {
      if (completedStages.has(stage)) {
        toggleStage(stage);
      }

      recursiveResetQuestStage(stage);
    });
  }

  function handleQuestDecision(value: QuestlineStage) {
    localStorage.setItem(localStorageKey, value);

    // Reset quest progress if user changes which branching decision they've made
    recursiveResetQuestStage(stage);
    setQuestDecision(value);
  }

  useEffect(() => {
    const localStorageValue = localStorage.getItem(localStorageKey);
    if (localStorageValue) {
      setQuestDecision(localStorageValue as QuestlineStage);
    }
  }, [setQuestDecision, localStorageKey]);

  useEffect(() => {
    if (questDecision) {
      onNextStage(questDecision);
    }
  }, [questDecision, onNextStage]);

  return (
    <div className="rounded-xl border bg-card text-card-foreground w-full shadow p-4 flex gap-6 justify-between md:items-center flex-col md:flex-row">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <span className="font-semibold">{metadata.title}</span>
            {metadata.optional && <Badge variant="secondary">Optional</Badge>}
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            {metadata.description}
          </span>
        </div>

        {metadata.nextStage.length > 1 && (
          <div>
            <Label htmlFor={`stage-${stage}`}>Quest Decision</Label>
            <Select onValueChange={handleQuestDecision} value={questDecision}>
              <SelectTrigger id={`stage-${stage}`}>
                <SelectValue placeholder="Make a decision..." />
              </SelectTrigger>
              <SelectContent>
                {metadata.nextStage.map((stage) => {
                  const stageMetadata = QuestlineStageData[stage];

                  return (
                    <SelectItem key={stage} value={stage}>
                      {stageMetadata.title}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <span className="text-xs font-medium text-muted-foreground">
              This quest involves a branching path. You must make a decision to
              proceed.
            </span>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <Checkbox
          {...checkboxProps}
          checked={completedStages.has(stage)}
          onCheckedChange={() => toggleStage(stage)}
        />
      </div>
    </div>
  );
}
