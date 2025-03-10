import * as React from "react";
import StepList from "@/components/StepList";
import { Step } from "@/lib/convert-route";
import { useAppStore } from "@/state/search-preferences";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@workspace/ui/components/drawer";
import { useMediaQuery } from "@workspace/ui/hooks/use-media-query";
import { BossPreferenceData, GetPathResult } from "@workspace/routing/types";
import { Item, ItemData } from "@workspace/data/items";

interface DestinationRouteProps {
  destination: Item;
  routeData: GetPathResult;
  stepData: Step[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function DestinationRoute(props: DestinationRouteProps) {
  const { destination, routeData, stepData, isOpen, setIsOpen } = props;
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const allowGlitches = useAppStore((state) => state.allowGlitches);
  const bossPreference = useAppStore((state) => state.bossPreference);

  const itemMetadata = ItemData[destination];

  const BadgeList = () => (
    <div className="flex gap-2">
      <Badge variant={bossPreference === "NONE" ? "secondary" : "default"}>
        Bosses - {BossPreferenceData[bossPreference].displayName}
      </Badge>
      <Badge variant={allowGlitches ? "default" : "secondary"}>
        Glitches {allowGlitches ? "Allowed" : "Disallowed"}
      </Badge>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <VisuallyHidden>
              <DialogDescription>
                Route to {itemMetadata.displayName}
              </DialogDescription>
            </VisuallyHidden>
            <DialogTitle>{itemMetadata.displayName}</DialogTitle>
            <BadgeList />
          </DialogHeader>

          <StepList routeData={routeData} stepData={stepData} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <div className="flex-1 overflow-y-auto">
          <DrawerHeader className="text-left">
            <DrawerTitle>{itemMetadata.displayName}</DrawerTitle>
            <BadgeList />
            <VisuallyHidden>
              <DrawerDescription>
                Route to {itemMetadata.displayName}
              </DrawerDescription>
            </VisuallyHidden>
          </DrawerHeader>

          <div className="p-4 flex-1">
            <StepList routeData={routeData} stepData={stepData} />
          </div>

          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
