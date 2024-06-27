import { Locations } from "../locations";
import { Enemies } from "../enemies";
import { graph } from "../location-graph";

graph.addEdge(
  Locations.Limgrave.LIMGRAVE,
  Locations.Limgrave.STORMFOOT_CATACOMBS,
);

graph.addEdge(
  Locations.Limgrave.LIMGRAVE,
  Locations.Limgrave.MURKWATER_CATACOMBS,
);

graph.addEdge(Locations.Limgrave.LIMGRAVE, Locations.Limgrave.GROVESIDE_CAVE);
graph.addEdge(Locations.Limgrave.LIMGRAVE, Locations.Limgrave.COASTAL_CAVE);
graph.addEdge(Locations.Limgrave.LIMGRAVE, Locations.Limgrave.MURKWATER_CAVE);
graph.addEdge(Locations.Limgrave.LIMGRAVE, Locations.Limgrave.HIGHROAD_CAVE);
graph.addEdge(Locations.Limgrave.LIMGRAVE, Locations.Limgrave.LIMGRAVE_TUNNELS);
graph.addEdge(
  Locations.Limgrave.LIMGRAVE,
  Locations.Limgrave.FRINGEFOLK_HEROS_GRAVE,
);

graph.addEdge(
  Locations.Limgrave.LIMGRAVE,
  Locations.Limgrave.DEATHTOUCHED_CATACOMBS,
);

graph.addEdge(
  Locations.Limgrave.LIMGRAVE,
  Locations.Limgrave.STORMVEIL_CASTLE,
  {
    boss_required: Enemies.MARGIT_THE_FELL,
  },
);

graph.addEdge(
  Locations.Limgrave.STORMVEIL_CASTLE,
  Locations.Limgrave.STORMVEIL_CASTLE_POST_GODRICK,
  {
    boss_required: Enemies.GODRICK_THE_GRAFTED,
  },
);

graph.addEdge(
  Locations.Limgrave.LIMGRAVE,
  Locations.Limgrave.WEEPING_PENINSULA,
);

graph.addEdge(
  Locations.Limgrave.WEEPING_PENINSULA,
  Locations.Limgrave.EARTHBORE_CAVE,
);

graph.addEdge(
  Locations.Limgrave.WEEPING_PENINSULA,
  Locations.Limgrave.TOMBSWARD_CATACOMBS,
);

graph.addEdge(
  Locations.Limgrave.WEEPING_PENINSULA,
  Locations.Limgrave.TOMBSWARD_CAVE,
);

graph.addEdge(
  Locations.Limgrave.WEEPING_PENINSULA,
  Locations.Limgrave.MORNE_TUNNEL,
);

graph.addEdge(
  Locations.Limgrave.WEEPING_PENINSULA,
  Locations.Limgrave.IMPALERS_CATACOMBS,
);

graph.addEdge(
  Locations.Limgrave.WEEPING_PENINSULA,
  Locations.Limgrave.CASTLE_MORNE,
);

export { graph };
