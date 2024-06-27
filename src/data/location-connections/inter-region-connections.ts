import { Locations } from "../locations";
import { graph } from "../location-graph";
import { Glitches } from "../glitches";
import { Enemies } from "../enemies";

graph.addEdge(Locations.Limgrave.LIMGRAVE, Locations.Liurnia.LIURNIA);
graph.addEdge(
  Locations.Limgrave.STORMVEIL_CASTLE_POST_GODRICK,
  Locations.Liurnia.LIURNIA,
);

graph.addEdge(
  Locations.Liurnia.LIURNIA,
  Locations.Limgrave.STORMVEIL_CASTLE_POST_GODRICK,
);

graph.addEdge(
  Locations.Limgrave.WEEPING_PENINSULA,
  Locations.AltusPlateau.LEYNDELL_CAPITAL_SUB_AREA,
);

graph.addEdge(Locations.Liurnia.LIURNIA, Locations.AltusPlateau.ALTUS_PLATEAU, {
  items_required: ["DECTUS_MEDALLION_1", "DECTUS_MEDALLION_2"],
});

graph.addEdge(
  Locations.Liurnia.RUIN_STREWN_PRECIPICE,
  Locations.AltusPlateau.ALTUS_PLATEAU,
  {
    boss_required: Enemies.MAGMA_WYRM_MAKAR,
  },
);

graph.addEdge(
  Locations.AltusPlateau.LEYNDELL_ROYAL_CAPITAL,
  Locations.MountaintopsOfTheGiants.MOUNTAINTOPS_OF_THE_GIANTS,
  {
    items_required: ["ROLD_MEDALLION"],
  },
);

graph.addEdge(
  Locations.AltusPlateau.LEYNDELL_ROYAL_CAPITAL,
  Locations.MountaintopsOfTheGiants.HIDDEN_PATH_TO_THE_HALIGTREE,
  {
    items_required: ["HALIGTREE_MEDALLION_1", "HALIGTREE_MEDALLION_2"],
  },
);

graph.addEdge(
  Locations.AltusPlateau.LEYNDELL_OUTSKIRTS,
  Locations.MountaintopsOfTheGiants.CONSECRATED_SNOWFIELD,
  {
    glitch_required: Glitches.ZIP,
  },
);

export { graph };
