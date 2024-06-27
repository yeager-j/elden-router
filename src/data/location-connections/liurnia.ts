import { Locations } from "../locations";
import { Glitches } from "../glitches";
import { Enemies } from "../enemies";
import { graph } from "../location-graph";

graph.addEdge(
  Locations.Liurnia.LIURNIA,
  Locations.Liurnia.CLIFFBOTTOM_CATACOMBS,
);
graph.addEdge(Locations.Liurnia.LIURNIA, Locations.Liurnia.ROADS_END_CATACOMBS);
graph.addEdge(
  Locations.Liurnia.LIURNIA,
  Locations.Liurnia.BLACK_KNIFE_CATACOMBS,
);
graph.addEdge(Locations.Liurnia.LIURNIA, Locations.Liurnia.STILLWATER_CAVE);
graph.addEdge(
  Locations.Liurnia.LIURNIA,
  Locations.Liurnia.LAKESIDE_CRYSTAL_CAVE,
);
graph.addEdge(
  Locations.Liurnia.LIURNIA,
  Locations.Liurnia.ACADEMY_CRYSTAL_CAVE,
);
graph.addEdge(
  Locations.Liurnia.LIURNIA,
  Locations.Liurnia.RAYA_LUCARIA_CRYSTAL_TUNNEL,
);
graph.addEdge(
  Locations.Liurnia.LIURNIA,
  Locations.Liurnia.ACADEMY_OF_RAYA_LUCARIA,
);
graph.addEdge(Locations.Liurnia.LIURNIA, Locations.Liurnia.CARIA_MANOR);
graph.addEdge(Locations.Liurnia.LIURNIA, Locations.Liurnia.MOONLIGHT_ALTAR, {
  glitch_required: Glitches.ZIP,
  description: "Description of how to perform this specific zip glitch",
});

graph.addEdge(Locations.Liurnia.LIURNIA, Locations.Liurnia.FOUR_BELFRIES);
graph.addEdge(
  Locations.Liurnia.LIURNIA,
  Locations.Liurnia.RUIN_STREWN_PRECIPICE,
);

graph.addEdge(Locations.Liurnia.CARIA_MANOR, Locations.Liurnia.THREE_SISTERS, {
  glitch_required: Glitches.ZIP,
});

graph.addEdge(Locations.Liurnia.CARIA_MANOR, Locations.Liurnia.THREE_SISTERS, {
  boss_required: Enemies.ROYAL_KNIGHT_LORETTA,
});

export { graph };
