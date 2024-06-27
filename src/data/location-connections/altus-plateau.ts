import { Locations } from "../locations";
import { Enemies } from "../enemies";
import { graph } from "../location-graph";
import { Glitches } from "../glitches";

graph.addEdge(
  Locations.AltusPlateau.ALTUS_PLATEAU,
  Locations.AltusPlateau.UNSIGHTLY_CATACOMBS,
);

graph.addEdge(
  Locations.AltusPlateau.ALTUS_PLATEAU,
  Locations.AltusPlateau.SAINTED_HEROS_GRAVE,
);

graph.addEdge(
  Locations.AltusPlateau.ALTUS_PLATEAU,
  Locations.AltusPlateau.SAGES_CAVE,
);

graph.addEdge(
  Locations.AltusPlateau.ALTUS_PLATEAU,
  Locations.AltusPlateau.PERFUMERS_GROTTO,
);

graph.addEdge(
  Locations.AltusPlateau.ALTUS_PLATEAU,
  Locations.AltusPlateau.OLD_ALTUS_TUNNEL,
);

graph.addEdge(
  Locations.AltusPlateau.ALTUS_PLATEAU,
  Locations.AltusPlateau.ALTUS_TUNNEL,
);

graph.addEdge(
  Locations.AltusPlateau.ALTUS_PLATEAU,
  Locations.AltusPlateau.WYNDHAM_CATACOMBS,
);

graph.addEdge(
  Locations.AltusPlateau.ALTUS_PLATEAU,
  Locations.AltusPlateau.MT_GELMIR,
);

graph.addEdge(
  Locations.AltusPlateau.MT_GELMIR,
  Locations.AltusPlateau.GELMIR_HEROS_GRAVE,
);

graph.addEdge(
  Locations.AltusPlateau.MT_GELMIR,
  Locations.AltusPlateau.SEETHEWATER_CAVE,
);

graph.addEdge(
  Locations.AltusPlateau.MT_GELMIR,
  Locations.AltusPlateau.VOLCANO_CAVE,
);

graph.addEdge(
  Locations.AltusPlateau.MT_GELMIR,
  Locations.AltusPlateau.VOLCANO_MANOR,
);

graph.addEdge(
  Locations.AltusPlateau.VOLCANO_MANOR,
  Locations.AltusPlateau.VOLCANO_MANOR_POST_EIGLAY,
  {
    boss_required: Enemies.GODSKIN_NOBLE,
  },
);

graph.addEdge(
  Locations.AltusPlateau.VOLCANO_MANOR_POST_EIGLAY,
  Locations.AltusPlateau.VOLCANO_MANOR_POST_RYKARD,
  {
    boss_required: Enemies.RYKARD_LORD_OF_BLASPHEMY,
  },
);

graph.addEdge(
  Locations.AltusPlateau.ALTUS_PLATEAU,
  Locations.AltusPlateau.LEYNDELL_OUTSKIRTS,
);

graph.addEdge(
  Locations.AltusPlateau.LEYNDELL_OUTSKIRTS,
  Locations.AltusPlateau.AURIZA_SIDE_TOMB,
);

graph.addEdge(
  Locations.AltusPlateau.LEYNDELL_OUTSKIRTS,
  Locations.AltusPlateau.AURIZA_HEROS_GRAVE,
);

graph.addEdge(
  Locations.AltusPlateau.LEYNDELL_OUTSKIRTS,
  Locations.AltusPlateau.SEALED_TUNNEL,
);

graph.addEdge(
  Locations.AltusPlateau.LEYNDELL_OUTSKIRTS,
  Locations.AltusPlateau.LEYNDELL_ROYAL_CAPITAL,
  {
    boss_required: Enemies.LEYNDELL_CONDITIONS,
  },
);

graph.addEdge(
  Locations.AltusPlateau.LEYNDELL_ROYAL_CAPITAL,
  Locations.AltusPlateau.LEYNDELL_POST_ERDTREE_SANCTUARY,
  {
    boss_required: Enemies.GODFREY_GOLDEN_SHADE,
  },
);

graph.addEdge(
  Locations.AltusPlateau.LEYNDELL_ROYAL_CAPITAL,
  Locations.AltusPlateau.SUBTERRANEAN_SHUNNING_GROUNDS,
);

graph.addEdge(
  Locations.AltusPlateau.SUBTERRANEAN_SHUNNING_GROUNDS,
  Locations.AltusPlateau.LEYNDELL_CATACOMBS,
);

graph.addEdge(
  Locations.AltusPlateau.SUBTERRANEAN_SHUNNING_GROUNDS,
  Locations.AltusPlateau.FRENZIED_FLAME_PROSCRIPTION,
  {
    boss_required: Enemies.MOHG_THE_OMEN,
  },
);

graph.addEdge(
  Locations.AltusPlateau.LEYNDELL_CAPITAL_SUB_AREA,
  Locations.AltusPlateau.LEYNDELL_ROYAL_CAPITAL,
  {
    glitch_required: Glitches.ZIP,
  },
);
