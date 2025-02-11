import { useEffect, useState } from "react";

import { Separator } from "@workspace/ui/components/separator";
import { QuestlineStage, QuestlineStageData } from "@workspace/data";

import QuestlineStageCard from "@/components/QuestlineStageCard";

interface QuestlineBuilderProps {
  stage: QuestlineStage;
}

export default function QuestlineBuilder(props: QuestlineBuilderProps) {
  const { stage } = props;
  const metadata = QuestlineStageData[stage];

  const [nextStageChoice, setNextStageChoice] = useState<QuestlineStage>();

  useEffect(() => {
    setNextStageChoice(undefined);
  }, [stage]);

  useEffect(() => {
    if (metadata.nextStage.length === 1) {
      setNextStageChoice(metadata.nextStage[0]);
    }
  }, [metadata]);

  return (
    <>
      <div className="flex flex-col gap-4 items-center w-full">
        <QuestlineStageCard stage={stage} onNextStage={setNextStageChoice} />
        {nextStageChoice && (
          <Separator orientation="vertical" className="h-6" />
        )}
      </div>

      {nextStageChoice && <QuestlineBuilder stage={nextStageChoice} />}
    </>
  );
}
