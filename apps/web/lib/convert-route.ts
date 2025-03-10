import {
  GetPathResult,
  GraphNode,
  MultiLocationItemNode,
} from "@workspace/routing/types";
import { EnemyData } from "@workspace/data/enemies";
import { GlitchNames } from "@workspace/data/glitches";
import { Item, ItemData } from "@workspace/data/items";
import { Location, LocationNames } from "@workspace/data/locations";

export interface Step {
  id: string;
  title: string;
  description?: string;
  type: "TRAVEL" | "DEFEAT" | "PICK_UP" | "GLITCH" | "START";
}

function isStepAnItem(step: GraphNode): step is Item {
  return Object.values(Item).includes(step as Item);
}

function isStepAMultiLocationItem(
  step: GraphNode,
): step is MultiLocationItemNode {
  return step.toString().includes(" - ");
}

function isStepALocation(step: GraphNode): step is Location {
  return Object.values(Location).includes(step as Location);
}

export function convertRouteToSteps(route: GetPathResult) {
  const steps: Step[] = [];

  if (!route.pathSteps) {
    return [];
  }

  steps.push({
    id: Location.LIMGRAVE,
    type: "START",
    title: `Start in ${LocationNames.LIMGRAVE}`,
    description: "Limgrave is the starting location for all routes.",
  });

  route.pathSteps.forEach((pathStep) => {
    const requirements = pathStep.metadata.requirements;

    if (requirements.requiredBosses && requirements.requiredBosses.length > 0) {
      for (const boss of requirements.requiredBosses) {
        const bossData = EnemyData[boss];

        steps.push({
          id: `${pathStep.to}.${boss}`,
          type: "DEFEAT",
          title: `Defeat ${bossData.displayName}`,
          description: bossData.shortDescription,
        });
      }
    }

    if (requirements.requiredGlitch) {
      const glitchName = GlitchNames[requirements.requiredGlitch.glitch];

      steps.push({
        id: `${pathStep.to}.${glitchName}`,
        type: "GLITCH",
        title: `Perform a ${glitchName}`,
        description: requirements.requiredGlitch.description,
      });
    }

    if (isStepAnItem(pathStep.to)) {
      steps.push({
        id: pathStep.to,
        type: "PICK_UP",
        title: `Acquire ${ItemData[pathStep.to].displayName}`,
        description: pathStep.metadata.description,
      });
    } else if (isStepAMultiLocationItem(pathStep.to)) {
      const [item] = pathStep.to.split(" - ");

      steps.push({
        id: pathStep.to,
        type: "PICK_UP",
        title: `Acquire ${ItemData[item as Item].displayName}`,
        description: pathStep.metadata.description,
      });
    } else if (isStepALocation(pathStep.to)) {
      steps.push({
        id: pathStep.to,
        type: "TRAVEL",
        title: `Travel to ${LocationNames[pathStep.to]}`,
        description: pathStep.metadata.description,
      });
    }
  });

  return steps;
}
