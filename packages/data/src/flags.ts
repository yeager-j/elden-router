export enum Flag {
  RADAHN_FESTIVAL_ENABLED = "RADAHN_FESTIVAL_ENABLED",
  RADAHN_DEFEATED = "RADAHN_DEFEATED",
  LEYNDELL_CAPITAL_ASHEN = "LEYNDELL_CAPITAL_ASHEN",
}

export interface FlagMetadata {
  displayName: string;
  description: string;
  flagMissingMessage: string;
  flagPresentMessage?: string;
}

export const FlagData: Record<Flag, FlagMetadata> = {
  [Flag.RADAHN_FESTIVAL_ENABLED]: {
    displayName: "Radahn Festival",
    description:
      "Festival enables when the player reaches Altus Plateau or during Ranni's questline",
    flagMissingMessage:
      "The Radahn Festival must be started. Reach Altus Plateau or follow Ranni's questline to continue",
  },
  [Flag.RADAHN_DEFEATED]: {
    displayName: "Radahn Defeated",
    description:
      "Starscourge Radahn's defeat allows the stars to fall and unlocks the path to Nokron, Eternal City",
    flagMissingMessage:
      "The path to Nokron is unavailable. Defeat Starscourge Radahn to continue",
  },
  [Flag.LEYNDELL_CAPITAL_ASHEN]: {
    displayName: "Ashen Capital",
    description:
      "Leyndell turns to ash after Maliketh, the Black Blade is defeated",
    flagMissingMessage:
      "Leyndell must be turned to ash. Defeat Maliketh, the Black Blade to continue",
    flagPresentMessage:
      "This route is not available because Leyndell has been turned to ash",
  },
};
