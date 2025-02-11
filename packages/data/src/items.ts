import { Location } from "#locations";
import { Questline } from "#quests";

export enum ProgressionItem {
  DECTUS_MEDALLION = "DECTUS_MEDALLION",
  ROLD_MEDALLION = "ROLD_MEDALLION",
  HALIGTREE_MEDALLION = "HALIGTREE_MEDALLION",
  PUREBLOOD_KNIGHTS_MEDAL = "PUREBLOOD_KNIGHTS_MEDAL",
  ACADEMY_GLINTSTONE_KEY = "ACADEMY_GLINTSTONE_KEY",
  CARIAN_INVERTED_STATUE = "CARIAN_INVERTED_STATUE",
}

export interface ProgressionItemMetadata {
  displayName: string;
  description: string;
}

export const ProgressionItemData: Record<
  ProgressionItem,
  ProgressionItemMetadata
> = {
  [ProgressionItem.DECTUS_MEDALLION]: {
    displayName: "Dectus Medallion",
    description: "Fort Haight, Fort Faroth",
  },
  [ProgressionItem.ROLD_MEDALLION]: {
    displayName: "Rold Medallion",
    description:
      "Melina gives this to you after you defeat Morgott, the Omen King",
  },
  [ProgressionItem.HALIGTREE_MEDALLION]: {
    displayName: "Haligtree Secret Medallion",
    description:
      "Village of the Albinaurics, Castle Sol after defeating Commander Niall",
  },
  [ProgressionItem.PUREBLOOD_KNIGHTS_MEDAL]: {
    displayName: "Pureblood Knight's Medal",
    description: "White Mask Varre's Questline",
  },
  [ProgressionItem.ACADEMY_GLINTSTONE_KEY]: {
    displayName: "Academy Glintstone Key",
    description: "Found near Glintstone Dragon Smarag",
  },
  [ProgressionItem.CARIAN_INVERTED_STATUE]: {
    displayName: "Carian Inverted Statue",
    description: "Given to you by Ranni during her questline",
  },
};

export enum ItemType {
  KEY_ITEM = "KEY_ITEM",
  WEAPON = "WEAPON",
  ARMOR = "ARMOR",
  TALISMAN = "TALISMAN",
  CONSUMABLE = "CONSUMABLE",
  SORCERY = "SORCERY",
  INCANTATION = "INCANTATION",
}

export const ItemTypeNames: Record<ItemType, string> = {
  [ItemType.WEAPON]: "Weapon",
  [ItemType.KEY_ITEM]: "Key Item",
  [ItemType.ARMOR]: "Armor",
  [ItemType.TALISMAN]: "Talisman",
  [ItemType.CONSUMABLE]: "Consumable",
  [ItemType.SORCERY]: "Sorcery",
  [ItemType.INCANTATION]: "Incantation",
};

export enum Item {
  // Weapons
  RIVERS_OF_BLOOD = "RIVERS_OF_BLOOD",
  BOLT_OF_GRANSAX = "BOLT_OF_GRANSAX",

  // Talismans
  ERDTREE_FAVOR_2 = "ERDTREE_FAVOR_2",

  // Sorceries
  COLLAPSING_STARS = "COLLAPSING_STARS",

  // Incantations
  TRIPLE_RINGS_OF_LIGHT = "TRIPLE_RINGS_OF_LIGHT",

  // Key Items
  SOMBERSTONE_MINERS_BELL_BEARING_5 = "SOMBERSTONE_MINERS_BELL_BEARING_5",
}

export interface ItemMetadata {
  displayName: string;
  itemType: ItemType;
  location: Location;
  quest?: Questline;
}

export const ItemData: Record<Item, ItemMetadata> = {
  [Item.RIVERS_OF_BLOOD]: {
    displayName: "Rivers of Blood",
    itemType: ItemType.WEAPON,
    location: Location.MOUNTAINTOPS_OF_THE_GIANTS,
  },
  [Item.BOLT_OF_GRANSAX]: {
    displayName: "Bolt of Gransax",
    itemType: ItemType.WEAPON,
    location: Location.LEYNDELL_ERDTREE_SANCTUARY,
  },
  [Item.COLLAPSING_STARS]: {
    displayName: "Collapsing Stars",
    itemType: ItemType.SORCERY,
    location: Location.CAELID_WAR_DEAD_CATACOMBS,
  },
  [Item.TRIPLE_RINGS_OF_LIGHT]: {
    displayName: "Triple Rings of Light",
    itemType: ItemType.INCANTATION,
    location: Location.ELPHAEL_BRACE_OF_THE_HALIGTREE,
  },
  [Item.SOMBERSTONE_MINERS_BELL_BEARING_5]: {
    displayName: "Somberstone Miner's Bell Bearing (5)",
    itemType: ItemType.KEY_ITEM,
    location: Location.FARUM_AZULA_POST_GODSKIN_DUO,
  },
  [Item.ERDTREE_FAVOR_2]: {
    displayName: "Erdtree's Favor +2",
    itemType: ItemType.TALISMAN,
    location: Location.LEYNDELL_ASHEN_CAPITAL,
  },
};
