"use client";

import { useState } from "react";
import { useAtom } from "jotai/index";
import { Settings2 } from "lucide-react";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { toast } from "@workspace/ui/components/sonner";
import type { GetPathResult } from "@workspace/routing";
import { Item, ItemData, ItemMetadata } from "@workspace/data";

import { getRoute } from "@/actions/pathfinding";
import DestinationCard from "@/components/DestinationCard";
import { DestinationRoute } from "@/components/DestinationRoute";
import RouteCustomization from "@/components/RouteCustomization";
import { convertRouteToSteps, Step } from "@/lib/convert-route";
import {
  acquiredItemsSetAtom,
  allowBossesAtom,
  allowGlitchesAtom,
  completedStagesSetAtom,
  enabledFlagsSetAtom,
} from "@/state/search-preferences";

export default function DestinationSearch() {
  const [allowBosses] = useAtom(allowBossesAtom);
  const [allowGlitches] = useAtom(allowGlitchesAtom);
  const [acquiredItems] = useAtom(acquiredItemsSetAtom);
  const [completedQuestlineStages] = useAtom(completedStagesSetAtom);
  const [flagsEnabled] = useAtom(enabledFlagsSetAtom);

  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [routeData, setRouteData] = useState<GetPathResult>();
  const [stepData, setStepData] = useState<Step[]>();

  const searchResults = Object.entries(ItemData).filter(([, metadata]) =>
    metadata.displayName.toLowerCase().includes(search.toLowerCase()),
  ) as [Item, ItemMetadata][];

  const displayedSearchResults = searchResults.slice(0, 4);
  const remainingSearchResults = searchResults.slice(4);

  async function handleItemSelect(item: Item) {
    setIsLoading(true);
    setSelectedItem(item);

    try {
      const routeResult = await getRoute(item, {
        allowBosses,
        allowGlitches,
        acquiredItems,
        completedQuestlineStages,
        flagsEnabled,
      });

      const stepResult = convertRouteToSteps(routeResult);

      setRouteData(routeResult);
      setStepData(stepResult);
    } catch (e) {
      console.error(e);
      toast.error("Failed to generate route");
    }

    setIsOpen(true);
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-xl items-center">
      <div className="flex gap-2 flex-1 max-w-md w-full">
        <Input
          className="flex-1"
          placeholder="Bolt of Gransax..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <RouteCustomization>
          <Button size="icon">
            <Settings2 />
          </Button>
        </RouteCustomization>
      </div>

      <div className="flex flex-col gap-4 w-full">
        {displayedSearchResults.slice(0, 4).map(([item]) => (
          <DestinationCard
            item={item}
            key={item}
            onSelect={handleItemSelect}
            isLoading={isLoading && selectedItem === item}
          />
        ))}
      </div>

      {remainingSearchResults.length > 0 && (
        <span className="text-sm font-medium text-muted-foreground text-center">
          ...plus {remainingSearchResults.length} more
        </span>
      )}

      {selectedItem && routeData && stepData && (
        <DestinationRoute
          destination={selectedItem}
          routeData={routeData}
          stepData={stepData}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
}
