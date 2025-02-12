import * as React from "react";
import { ReactNode } from "react";
import { QuestManager } from "@/components/QuestManager";
import { useAppStore } from "@/state/search-preferences";
import { ListTodo } from "lucide-react";

import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer";
import { Separator } from "@workspace/ui/components/separator";
import { Switch } from "@workspace/ui/components/switch";
import { useMediaQuery } from "@workspace/ui/hooks/use-media-query";
import { Flag, FlagData } from "@workspace/data/flags";
import { ProgressionItem, ProgressionItemData } from "@workspace/data/items";

interface RouteCustomizationProps {
  children: ReactNode;
}

export default function RouteCustomization(props: RouteCustomizationProps) {
  const { children } = props;
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>Customize your route</DialogDescription>
          </DialogHeader>

          <RouteSettings />

          <DialogFooter>
            <DrawerClose asChild>
              <Button variant="outline">Dismiss</Button>
            </DrawerClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent>
        <div className="flex-1 overflow-y-auto">
          <DrawerHeader className="text-left">
            <DrawerTitle>Settings</DrawerTitle>
            <DrawerDescription>Customize your route</DrawerDescription>
          </DrawerHeader>

          <div className="flex flex-col gap-4 p-4">
            <RouteSettings />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function RouteSettings() {
  const allowGlitches = useAppStore((state) => state.allowGlitches);
  const setAllowGlitches = useAppStore((state) => state.setAllowGlitches);

  const allowBosses = useAppStore((state) => state.allowBosses);
  const setAllowBosses = useAppStore((state) => state.setAllowBosses);

  const acquiredItems = useAppStore((state) => state.acquiredItems);
  const toggleItem = useAppStore((state) => state.toggleAcquiredItem);

  const enabledFlags = useAppStore((state) => state.enabledFlags);
  const toggleFlag = useAppStore((state) => state.toggleFlag);

  return (
    <>
      <div className="flex flex-col gap-2">
        <Switch
          id="allow-glitches"
          label="Allow Glitches"
          description="If enabled, allows routes involving Wrongwarps and Zip Glitches"
          checked={allowGlitches}
          onCheckedChange={setAllowGlitches}
        />

        <Switch
          id="allow-bosses"
          label="Allow Killing Bosses"
          description="If disabled, will try to find a route without needing to defeat bosses"
          checked={allowBosses}
          onCheckedChange={setAllowBosses}
        />
      </div>

      <Separator />

      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold mb-1">Item Settings</span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {Object.entries(ProgressionItemData).map(([item, metadata]) => (
            <Switch
              id={item}
              key={item}
              label={metadata.displayName}
              description={metadata.description}
              checked={acquiredItems.has(item as ProgressionItem)}
              onCheckedChange={() => toggleItem(item as ProgressionItem)}
            />
          ))}
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold mb-1">World Flags</span>

        {Object.entries(FlagData).map(([flag, metadata]) => (
          <Switch
            id={flag}
            key={flag}
            label={metadata.displayName}
            description={metadata.description}
            checked={enabledFlags.has(flag as Flag)}
            onCheckedChange={() => toggleFlag(flag as Flag)}
          />
        ))}
      </div>

      <Separator />

      <div className="flex items-center gap-2">
        <QuestManager>
          <Button disabled>
            <ListTodo />
            <span>Configure Questlines</span>
          </Button>
        </QuestManager>

        <span className="text-sm font-medium text-muted-foreground">
          Quest Manager coming soon!
        </span>
      </div>
    </>
  );
}
