import { Enemies } from "./enemies";
import { Locations } from "./locations";
import { NPCs } from "./npcs";

export interface Item {
  name: string;
  location: string;
  dropsFrom?: Enemies;
  npcQuest?: NPCs;
  isBossDrop?: boolean;
}

type Medallions =
  | "DECTUS_MEDALLION_1"
  | "DECTUS_MEDALLION_2"
  | "ROLD_MEDALLION"
  | "HALIGTREE_MEDALLION_1"
  | "HALIGTREE_MEDALLION_2";

type Items =
  | Medallions
  | "DARKMOON_GREATSWORD"
  | "CODED_SWORD"
  | "BLASPHEMOUS_BLADE"
  | "SWORD_OF_NIGHT_AND_FLAME"
  | "SHABRIRI_GRAPE_STORMVEIL"
  | "RIVERS_OF_BLOOD";

type ItemList = {
  [key in Items]: Item;
};

export const items: ItemList = {
  // Medallions
  DECTUS_MEDALLION_1: {
    name: "Dectus Medallion (Limgrave)",
    location: Locations.Limgrave.LIMGRAVE,
  },
  DECTUS_MEDALLION_2: {
    name: "Dectus Medallion (Caelid)",
    location: Locations.Caelid.DRAGONBARROW,
  },
  ROLD_MEDALLION: {
    name: "Rold Medallion",
    location: Locations.AltusPlateau.LEYNDELL_POST_MORGOTT,
  },
  HALIGTREE_MEDALLION_1: {
    name: "Haligtree Medallion (Liurnia)",
    location: Locations.Liurnia.LIURNIA,
  },
  HALIGTREE_MEDALLION_2: {
    name: "Haligtree Medallion (Castle Sol)",
    location: Locations.MountaintopsOfTheGiants.CASTLE_SOL_POST_NIALL,
  },

  // Items
  DARKMOON_GREATSWORD: {
    name: "Darkmoon Greatsword",
    location: Locations.Liurnia.MOONLIGHT_ALTAR,
  },
  CODED_SWORD: {
    name: "Coded Sword",
    location: Locations.AltusPlateau.LEYNDELL_ROYAL_CAPITAL,
  },
  BLASPHEMOUS_BLADE: {
    name: "Blasphemous Blade",
    location: Locations.AltusPlateau.VOLCANO_MANOR_POST_EIGLAY,
    dropsFrom: Enemies.RYKARD_LORD_OF_BLASPHEMY,
    isBossDrop: true,
  },
  SWORD_OF_NIGHT_AND_FLAME: {
    name: "Sword of Night and Flame",
    location: Locations.Liurnia.CARIA_MANOR,
  },
  SHABRIRI_GRAPE_STORMVEIL: {
    name: "Shapriri Grape",
    location: Locations.Limgrave.STORMVEIL_CASTLE_POST_GODRICK,
  },
  RIVERS_OF_BLOOD: {
    name: "Rivers of Blood",
    location: Locations.MountaintopsOfTheGiants.MOUNTAINTOPS_OF_THE_GIANTS,
  },
};
