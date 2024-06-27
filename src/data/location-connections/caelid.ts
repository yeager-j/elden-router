import { Locations } from "../locations";
import { Enemies } from "../enemies";
import { graph } from "../location-graph";

graph.addEdge(
  Locations.Caelid.CAELID,
  Locations.Caelid.MINOR_ERDTREE_CATACOMBS,
);

graph.addEdge(Locations.Caelid.CAELID, Locations.Caelid.CAELID_CATACOMBS);

graph.addEdge(Locations.Caelid.CAELID, Locations.Caelid.ABANDONED_CAVE);

graph.addEdge(Locations.Caelid.CAELID, Locations.Caelid.GAOL_CAVE);

graph.addEdge(Locations.Caelid.CAELID, Locations.Caelid.GAEL_TUNNEL);

graph.addEdge(Locations.Caelid.CAELID, Locations.Caelid.SELLIA_CRYSTAL_TUNNEL);

graph.addEdge(Locations.Caelid.CAELID, Locations.Caelid.SELLIA_HIDEAWAY);

graph.addEdge(Locations.Caelid.CAELID, Locations.Caelid.CAELID_POST_RADAHN, {
  boss_required: Enemies.STARSCOURGE_RADAHN,
});

graph.addEdge(
  Locations.Caelid.CAELID_POST_RADAHN,
  Locations.Caelid.WAR_DEAD_CATACOMBS,
);

graph.addEdge(Locations.Caelid.CAELID, Locations.Caelid.DRAGONBARROW);

graph.addEdge(
  Locations.Caelid.DRAGONBARROW,
  Locations.Caelid.DRAGONBARROW_CAVE,
);

graph.addEdge(
  Locations.Caelid.DRAGONBARROW,
  Locations.Caelid.DIVINE_TOWER_OF_CAELID,
);
