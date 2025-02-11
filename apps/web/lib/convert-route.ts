import { GetPathResult, Requirement } from "@workspace/routing";
import {
  Enemy,
  EnemyData,
  Glitch,
  GlitchNames,
  Item,
  ItemData,
  Location,
  LocationNames,
} from "@workspace/data";

export interface Step {
  title: string;
  description?: string;
  type: "TRAVEL" | "DEFEAT" | "PICK_UP" | "GLITCH";
}

function isStepAnItem(step: Location | Item): step is Item {
  return Object.values(Item).includes(step as Item);
}

function isStepALocation(step: Location | Item): step is Location {
  return Object.values(Location).includes(step as Location);
}

export function convertRouteToSteps(route: GetPathResult) {
  const steps: Step[] = [];

  if (!route.pathSteps) {
    return [];
  }

  route.pathSteps.forEach((pathStep) => {
    pathStep.metadata.requirements.forEach((requirement: Requirement) => {
      if (requirement.type === "boss") {
        const bossData = EnemyData[requirement.value as Enemy];

        steps.push({
          type: "DEFEAT",
          title: `Defeat ${bossData.displayName}`,
          description: bossData.shortDescription,
        });
      }

      if (requirement.type === "glitch") {
        const glitchName = GlitchNames[requirement.value as Glitch];

        steps.push({
          type: "GLITCH",
          title: `Perform a ${glitchName}`,
          description: requirement.description,
        });
      }
    });

    if (isStepAnItem(pathStep.to)) {
      steps.push({
        type: "PICK_UP",
        title: `Acquire ${ItemData[pathStep.to].displayName}`,
        description: pathStep.metadata.description,
      });
    } else if (isStepALocation(pathStep.to)) {
      steps.push({
        type: "TRAVEL",
        title: `Travel to ${LocationNames[pathStep.to]}`,
        description: pathStep.metadata.description,
      });
    }
  });

  return steps;
}
