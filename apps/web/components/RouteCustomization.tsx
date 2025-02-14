import * as React from "react";
import { ReactNode } from "react";
import QuestManager from "@/components/QuestManager";
import { useAppStore } from "@/state/search-preferences";
import { ListTodo } from "lucide-react";

import { Badge } from "@workspace/ui/components/badge";
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
import { Label } from "@workspace/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
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

  const bossPreference = useAppStore((state) => state.bossPreference);
  const setBossPreference = useAppStore((state) => state.setBossPreference);

  const acquiredItems = useAppStore((state) => state.acquiredItems);
  const toggleItem = useAppStore((state) => state.toggleAcquiredItem);

  const enabledFlags = useAppStore((state) => state.enabledFlags);
  const toggleFlag = useAppStore((state) => state.toggleFlag);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div>
          <Label htmlFor="boss-preference">Boss Preference</Label>
          <Select onValueChange={setBossPreference} value={bossPreference}>
            <SelectTrigger id="boss-preference">
              <SelectValue placeholder="Boss Preference" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem
                value="NONE"
                description="Do not allow bosses in the route"
              >
                None
              </SelectItem>
              <SelectItem
                value="MINIMAL"
                description="Find a route with the minimal number of bosses"
              >
                Minimal
              </SelectItem>
              <SelectItem
                value="ANY"
                description="Find the shortest route regardless of bosses"
              >
                Any
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Switch
          id="allow-glitches"
          label="Allow Glitches"
          description="If enabled, allows routes involving Wrongwarps and Zip Glitches"
          checked={allowGlitches}
          onCheckedChange={setAllowGlitches}
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
        <Badge variant="secondary">WIP</Badge>

        <QuestManager>
          <Button>
            <ListTodo />
            <span>Configure Questlines</span>
          </Button>
        </QuestManager>
      </div>
    </>
  );
}
