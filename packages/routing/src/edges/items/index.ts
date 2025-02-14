import { consumableLocations } from "#edges/items/consumables";
import { incantationLocations } from "#edges/items/incantations";
import { keyItemLocations } from "#edges/items/key-items";
import { sorceryLocations } from "#edges/items/sorceries";
import { talismanLocations } from "#edges/items/talismans";
import { weaponLocations } from "#edges/items/weapons";

export const allItems = [
  ...weaponLocations,
  ...talismanLocations,
  ...sorceryLocations,
  ...keyItemLocations,
  ...incantationLocations,
  ...consumableLocations,
];
