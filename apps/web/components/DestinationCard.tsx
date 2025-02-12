"use client";

import { Loader2 } from "lucide-react";

import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Item, ItemData, ItemTypeNames } from "@workspace/data/items";
import { Location, LocationNames } from "@workspace/data/locations";

interface DestinationCardProps {
  item: Item;
  onSelect: (item: Item) => void;
  isLoading: boolean;
}

export default function DestinationCard(props: DestinationCardProps) {
  const { item, onSelect, isLoading } = props;

  const itemMetadata = ItemData[item];

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow p-4 flex gap-6 justify-between md:items-center flex-col md:flex-row">
      <div className="flex flex-col gap-1">
        <span className="font-semibold">{itemMetadata.displayName}</span>

        <div className="flex gap-1">
          <Badge>{ItemTypeNames[itemMetadata.itemType]}</Badge>
          <Badge variant="secondary">
            {LocationNames[itemMetadata.location as Location]}
          </Badge>
        </div>
      </div>

      <div className="flex justify-end">
        <Button disabled={isLoading} onClick={() => onSelect(item)}>
          {isLoading && (
            <>
              <Loader2 className="animate-spin" />
              Routing...
            </>
          )}

          {!isLoading && "Select"}
        </Button>
      </div>
    </div>
  );
}
