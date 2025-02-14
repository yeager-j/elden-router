"use client";

import { useEffect, useState } from "react";
import { getRoute } from "@/actions/pathfinding";
import DestinationCard from "@/components/DestinationCard";
import { DestinationRoute } from "@/components/DestinationRoute";
import RouteCustomization from "@/components/RouteCustomization";
import { convertRouteToSteps, Step } from "@/lib/convert-route";
import { useAppStore } from "@/state/search-preferences";
import { Settings2 } from "lucide-react";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { toast } from "@workspace/ui/components/sonner";
import { GetPathResult } from "@workspace/routing/types";
import { Item, ItemData, ItemMetadata } from "@workspace/data/items";

interface DestinationSearchProps {
  destinations: Item[];
}

export default function DestinationSearch(props: DestinationSearchProps) {
  const { destinations } = props;

  const allowGlitches = useAppStore((state) => state.allowGlitches);
  const allowBosses = useAppStore((state) => state.allowBosses);
  const acquiredItems = useAppStore((state) => state.acquiredItems);
  const completedQuestlineStages = useAppStore(
    (state) => state.completedStages,
  );
  const flagsEnabled = useAppStore((state) => state.enabledFlags);

  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [routeData, setRouteData] = useState<GetPathResult>();
  const [stepData, setStepData] = useState<Step[]>();

  const [searchResults, setSearchResults] = useState<[Item, ItemMetadata][]>(
    [],
  );

  const displayedSearchResults = searchResults.slice(0, 4);
  const remainingSearchResults = searchResults.slice(4);

  useEffect(() => {
    setSearchResults(
      Object.entries(ItemData)
        .filter(([item]) => destinations.includes(item as Item))
        .filter(([, metadata]) =>
          metadata.displayName.toLowerCase().includes(search.toLowerCase()),
        ) as [Item, ItemMetadata][],
    );
  }, [destinations, search]);

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
