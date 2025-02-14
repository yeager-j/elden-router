import { ReactNode, useState } from "react";
import QuestlineBuilder from "@/components/QuestlineBuilder";
import { useAppStore } from "@/state/search-preferences";
import { ChevronDown } from "lucide-react";

import { Button } from "@workspace/ui/components/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { Separator } from "@workspace/ui/components/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@workspace/ui/components/sidebar";
import {
  getQuestlinesByCategory,
  getQuestlineStagesByQuestline,
  Questline,
  QuestlineCategory,
  QuestlineCategoryNames,
  QuestlineData,
} from "@workspace/data/quests";

interface QuestManagerProps {
  children: ReactNode;
}

export default function QuestManager(props: QuestManagerProps) {
  const { children } = props;
  const [activeQuest, setActiveQuest] = useState<Questline>(Questline.SELEN);
  const completedStages = useAppStore((state) => state.completedStages);
  const toggleStage = useAppStore((state) => state.toggleStage);

  const activeQuestData = QuestlineData[activeQuest];

  function resetQuestProgress() {
    getQuestlineStagesByQuestline(activeQuest).forEach(([stage]) => {
      if (completedStages.has(stage)) {
        toggleStage(stage);
      }
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="overflow-hidden p-0 md:max-h-[680px] md:max-w-2xl lg:max-w-5xl">
        <SidebarProvider className="items-start">
          <Sidebar collapsible="none" className="hidden md:flex">
            <SidebarContent>
              {Object.values(QuestlineCategory).map((category) => (
                <Collapsible
                  key={category}
                  defaultOpen
                  className="group/collapsible"
                >
                  <SidebarGroup>
                    <SidebarGroupLabel asChild>
                      <CollapsibleTrigger>
                        {QuestlineCategoryNames[category]}
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </CollapsibleTrigger>
                    </SidebarGroupLabel>

                    <CollapsibleContent>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          {getQuestlinesByCategory(category).map(
                            ([questline, metadata]) => (
                              <SidebarMenuItem key={questline}>
                                <SidebarMenuButton
                                  isActive={activeQuest === questline}
                                  onClick={() =>
                                    setActiveQuest(questline as Questline)
                                  }
                                >
                                  {metadata.name}
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            ),
                          )}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </CollapsibleContent>
                  </SidebarGroup>
                </Collapsible>
              ))}
            </SidebarContent>
          </Sidebar>
          <main className="flex h-[680px] flex-1 flex-col overflow-hidden">
            <div className="flex flex-1 flex-col gap-4 px-10 py-6 overflow-y-auto items-center">
              <DialogHeader className="w-full mb-4">
                <DialogTitle>{activeQuestData.name}</DialogTitle>
                <DialogDescription asChild>
                  <blockquote className="mt-6 border-l-2 pl-6 italic">
                    {activeQuestData.description}
                  </blockquote>
                </DialogDescription>
              </DialogHeader>

              <QuestlineBuilder stage={activeQuestData.questStart} />

              <div className="w-full flex flex-col gap-4">
                <Separator orientation="horizontal" />

                <div className="flex gap-4">
                  <Button
                    variant="secondary"
                    onClick={() => resetQuestProgress()}
                  >
                    Reset Progress
                  </Button>

                  <Separator orientation="vertical" />

                  <span className="text-sm font-medium text-muted-foreground">
                    You can clear progress in all questlines by clearing your
                    localstorage.
                  </span>
                </div>
              </div>
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
}
