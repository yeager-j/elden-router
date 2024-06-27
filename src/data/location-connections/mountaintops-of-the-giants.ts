import { Locations } from "../locations";
import { Enemies } from "../enemies";
import { graph } from "../location-graph";
import { Glitches } from "../glitches";

graph.addEdge(
  Locations.MountaintopsOfTheGiants.MOUNTAINTOPS_OF_THE_GIANTS,
  Locations.MountaintopsOfTheGiants.SPIRITCALLERS_CAVE,
);

graph.addEdge(
  Locations.MountaintopsOfTheGiants.MOUNTAINTOPS_OF_THE_GIANTS,
  Locations.MountaintopsOfTheGiants.GIANTS_MOUNTAINTOP_CATACOMBS,
);

graph.addEdge(
  Locations.MountaintopsOfTheGiants.MOUNTAINTOPS_OF_THE_GIANTS,
  Locations.MountaintopsOfTheGiants.GIANT_CONQUERING_HEROS_GRAVE,
);

graph.addEdge(
  Locations.MountaintopsOfTheGiants.MOUNTAINTOPS_OF_THE_GIANTS,
  Locations.MountaintopsOfTheGiants.CASTLE_SOL,
);

graph.addEdge(
  Locations.MountaintopsOfTheGiants.CASTLE_SOL,
  Locations.MountaintopsOfTheGiants.CASTLE_SOL_POST_NIALL,
  {
    boss_required: Enemies.COMMANDER_NIALL,
  },
);

graph.addEdge(
  Locations.MountaintopsOfTheGiants.MOUNTAINTOPS_OF_THE_GIANTS,
  Locations.MountaintopsOfTheGiants.FARUM_AZULA,
  {
    boss_required: Enemies.FIRE_GIANT,
  },
);

graph.addEdge(
  Locations.MountaintopsOfTheGiants.FARUM_AZULA,
  Locations.MountaintopsOfTheGiants.FARUM_AZULA_POST_GODSKIN_DUO,
  {
    boss_required: Enemies.GODSKIN_DUO,
  },
);

graph.addEdge(
  Locations.MountaintopsOfTheGiants.FARUM_AZULA,
  Locations.MountaintopsOfTheGiants.FARUM_AZULA_POST_GODSKIN_DUO,
  {
    glitch_required: Glitches.ZIP,
  },
);

graph.addEdge(
  Locations.MountaintopsOfTheGiants.FARUM_AZULA_SUB_AREA,
  Locations.MountaintopsOfTheGiants.FARUM_AZULA,
  {
    glitch_required: Glitches.WRONG_WARP,
  },
);

graph.addEdge(
  Locations.MountaintopsOfTheGiants.HIDDEN_PATH_TO_THE_HALIGTREE,
  Locations.MountaintopsOfTheGiants.CONSECRATED_SNOWFIELD,
);

graph.addEdge(
  Locations.MountaintopsOfTheGiants.HIDDEN_PATH_TO_THE_HALIGTREE,
  Locations.MountaintopsOfTheGiants.MOUNTAINTOPS_OF_THE_GIANTS,
  {
    glitch_required: Glitches.WRONG_WARP,
  },
);

graph.addEdge(
  Locations.MountaintopsOfTheGiants.CONSECRATED_SNOWFIELD,
  Locations.MountaintopsOfTheGiants.HIDDEN_PATH_TO_THE_HALIGTREE,
);

graph.addEdge(
  Locations.MountaintopsOfTheGiants.CONSECRATED_SNOWFIELD,
  Locations.MountaintopsOfTheGiants.CAVE_OF_THE_FORLORN,
);

graph.addEdge(
  Locations.MountaintopsOfTheGiants.CONSECRATED_SNOWFIELD,
  Locations.MountaintopsOfTheGiants.CONSECRATED_SNOWFIELD_CATACOMBS,
);

graph.addEdge(
  Locations.MountaintopsOfTheGiants.CONSECRATED_SNOWFIELD,
  Locations.MountaintopsOfTheGiants.YELOUGH_ANIX_TUNNEL,
);

graph.addEdge(
  Locations.MountaintopsOfTheGiants.CONSECRATED_SNOWFIELD,
  Locations.MountaintopsOfTheGiants.MIQUELLAS_HALIGTREE,
);

graph.addEdge(
  Locations.MountaintopsOfTheGiants.MIQUELLAS_HALIGTREE,
  Locations.MountaintopsOfTheGiants.ELPHAEL_BRACE_OF_THE_HALIGTREE,
  {
    boss_required: Enemies.LORETTA_KNIGHT_OF_THE_HALIGTREE,
  },
);

graph.addEdge(
  Locations.MountaintopsOfTheGiants.ELPHAEL_BRACE_OF_THE_HALIGTREE,
  Locations.MountaintopsOfTheGiants.ELPHAEL_POST_MALENIA,
  {
    boss_required: Enemies.MALENIA_BLADE_OF_MIQUELLA,
  },
);

export { graph };
