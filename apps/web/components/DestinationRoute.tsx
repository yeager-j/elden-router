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
import { GetPathResult } from "@workspace/routing/types";
import { Item, ItemData } from "@workspace/data/items";

interface DestinationRouteProps {
  destination: Item;
  routeData: GetPathResult;
  stepData: Step[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function DestinationRoute(props: DestinationRouteProps) {
  const { destination, routeData, stepData, isOpen, setIsOpen } = props;
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const allowGlitches = useAppStore((state) => state.allowGlitches);
  const allowBosses = useAppStore((state) => state.allowBosses);

  const itemMetadata = ItemData[destination];

  const BadgeList = () => (
    <div className="flex gap-2">
      <Badge variant={allowBosses ? "default" : "secondary"}>
        Killing Bosses {allowBosses ? "Allowed" : "Disallowed"}
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
        <DrawerHeader className="text-left">
          <DrawerTitle>{itemMetadata.displayName}</DrawerTitle>
          <BadgeList />
          <VisuallyHidden>
            <DrawerDescription>
              Route to {itemMetadata.displayName}
            </DrawerDescription>
          </VisuallyHidden>
        </DrawerHeader>

        <div className="p-4 scroll-auto">
          <StepList routeData={routeData} stepData={stepData} />
        </div>

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
