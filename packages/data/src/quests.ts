export enum QuestlineCategory {
  MAJOR = "MAJOR",
  MINOR = "MINOR",
}

export const QuestlineCategoryNames: Record<QuestlineCategory, string> = {
  [QuestlineCategory.MINOR]: "Minor",
  [QuestlineCategory.MAJOR]: "Major",
};

export enum Questline {
  SELEN = "SELLEN",
  VARRE = "VARRE",
  RANNI = "RANNI",
  IRINA = "IRINA",
  RODERIKA = "RODERIKA",
}

export interface QuestlineMetadata {
  name: string;
  description: string;
  questStart: QuestlineStage;
  category: QuestlineCategory;
}

export enum QuestlineStage {
  // Irina & Edgar
  IRINA_STAGE_1 = "IRINA_STAGE_1",
  IRINA_STAGE_2 = "IRINA_STAGE_2",
  IRINA_STAGE_3 = "IRINA_STAGE_3",
  IRINA_STAGE_4 = "IRINA_STAGE_4",
  IRINA_STAGE_5 = "IRINA_STAGE_5",

  VARRE_STAGE_1 = "VARRE_STAGE_1",

  RODERIKA_STAGE_1 = "RODERIKA_STAGE_1",

  // Sorceress Sellen
  SELLEN_STAGE_1 = "SELLEN_STAGE_1", // Accept her teachings
  SELLEN_STAGE_2 = "SELLEN_STAGE_2", // Find the Comet Azur sorcery and speak with her again
  SELLEN_STAGE_3 = "SELLEN_STAGE_3", // Defeat Starscourge Radahn and speak with her again
  SELLEN_STAGE_4 = "SELLEN_STAGE_4", // Speak with Sellen in Witchbane Ruins
  SELLEN_STAGE_5 = "SELLEN_STAGE_5", // Speak with Jerren in Redmane Castle
  SELLEN_STAGE_6 = "SELLEN_STAGE_6", // Speak with Jerren in Witchbane Ruins
  SELLEN_STAGE_7 = "SELLEN_STAGE_7", // Revive Sellen using the Puppet in Seluvis's lab
  SELLEN_STAGE_8_A = "SELLEN_STAGE_8_A", // Assist Sellen against Jerren
  SELLEN_STAGE_8_B = "SELLEN_STAGE_8_B", // Challenge Sellen with Jerren

  RANNI_STAGE_1 = "RANNI_STAGE_1",
}

interface QuestlineStageMetadata {
  questline: Questline;
  title: string;
  description: string;
  optional?: boolean;
  nextStage: QuestlineStage[];
}

export const QuestlineStageData: Record<
  QuestlineStage,
  QuestlineStageMetadata
> = {
  [QuestlineStage.IRINA_STAGE_1]: {
    questline: Questline.IRINA,
    title: "Stage 1",
    description: "You've spoken to Irina and agreed to deliver her letter",
    nextStage: [QuestlineStage.IRINA_STAGE_2],
  },
  [QuestlineStage.IRINA_STAGE_2]: {
    questline: Questline.IRINA,
    title: "Stage 2",
    description: "You've delivered the letter to Edger, her father",
    nextStage: [QuestlineStage.IRINA_STAGE_3],
  },
  [QuestlineStage.IRINA_STAGE_3]: {
    questline: Questline.IRINA,
    title: "Stage 3",
    description:
      "You've defeated the Leonine Misbegotten, retrieved the sword, and talked to Edgar again",
    nextStage: [QuestlineStage.IRINA_STAGE_4],
  },
  [QuestlineStage.IRINA_STAGE_4]: {
    questline: Questline.IRINA,
    title: "Stage 4",
    description:
      "You've spoken to Edgar while he is mourning the loss of his daughter",
    nextStage: [QuestlineStage.IRINA_STAGE_5],
  },
  [QuestlineStage.IRINA_STAGE_5]: {
    questline: Questline.IRINA,
    title: "Stage 5",
    description:
      "You've slain Edgar the Revenger after he invaded you in Liurnia",
    nextStage: [],
  },

  [QuestlineStage.VARRE_STAGE_1]: {
    questline: Questline.VARRE,
    title: "Stage 1",
    description:
      "You've spoken with Varre at the Rose Church and agreed to use the Festering Bloody Finger",
    nextStage: [],
  },

  [QuestlineStage.RODERIKA_STAGE_1]: {
    questline: Questline.RODERIKA,
    title: "Stage 1",
    description:
      "You've spoken to Roderika at Stormhill Shack, received the Spirit Jellyfish Ashes, and agreed to deliver her message,",
    nextStage: [],
  },

  [QuestlineStage.SELLEN_STAGE_1]: {
    questline: Questline.SELEN,
    title: "Stage 1",
    description: "You’ve accepted Sorceress Sellen as your teacher.",
    nextStage: [QuestlineStage.SELLEN_STAGE_2],
  },
  [QuestlineStage.SELLEN_STAGE_2]: {
    questline: Questline.SELEN,
    title: "Stage 2",
    description:
      "You’ve acquired Comet Azur and spoken to Sorceress Sellen again.",
    nextStage: [QuestlineStage.SELLEN_STAGE_3],
  },
  [QuestlineStage.SELLEN_STAGE_3]: {
    questline: Questline.SELEN,
    title: "Stage 3",
    description:
      "You've defeated Starscourge Radahn and spoken with Sorceress Sellen again.",
    nextStage: [QuestlineStage.SELLEN_STAGE_4],
  },
  [QuestlineStage.SELLEN_STAGE_4]: {
    questline: Questline.SELEN,
    title: "Stage 4",
    description:
      "You've spoken with Sorceress Sellen's real body in Witchbane Ruins",
    nextStage: [QuestlineStage.SELLEN_STAGE_5],
    optional: true,
  },
  [QuestlineStage.SELLEN_STAGE_5]: {
    questline: Questline.SELEN,
    title: "Stage 5",
    description:
      "You've spoken with Jerren in Redmane Castle after the Radahn Festival",
    nextStage: [QuestlineStage.SELLEN_STAGE_6],
  },
  [QuestlineStage.SELLEN_STAGE_6]: {
    questline: Questline.SELEN,
    title: "Stage 6",
    description: "You've spoken with Jerren in Witchbane Ruins",
    nextStage: [QuestlineStage.SELLEN_STAGE_7],
  },
  [QuestlineStage.SELLEN_STAGE_7]: {
    questline: Questline.SELEN,
    title: "Stage 7",
    description:
      "You've revived Sorceress Sellen using a puppet in Seluvis's secret lab",
    nextStage: [
      QuestlineStage.SELLEN_STAGE_8_A,
      QuestlineStage.SELLEN_STAGE_8_B,
    ],
  },
  [QuestlineStage.SELLEN_STAGE_8_A]: {
    questline: Questline.SELEN,
    title: "Stage 8 - Assist Sellen",
    description:
      "You've assisted Sorceress Sellen against Witch Hunter Jerren in Raya Lucaria Grand Library",
    nextStage: [],
  },
  [QuestlineStage.SELLEN_STAGE_8_B]: {
    questline: Questline.SELEN,
    title: "Stage 8 - Challenge Sellen",
    description:
      "You've challenged Sorceress Sellen with the help of Witch Hunter Jerren in Raya Lucaria Grand Library",
    nextStage: [],
  },

  [QuestlineStage.RANNI_STAGE_1]: {
    questline: Questline.RANNI,
    title: "Stage 1",
    description:
      "You've spoken to Ranni the Witch at the Church of Elleh and received the Spirit Calling Bell",
    optional: true,
    nextStage: [],
  },
};

export const QuestlineData: Record<Questline, QuestlineMetadata> = {
  [Questline.IRINA]: {
    name: "Irina & Edgar",
    description:
      "My good father secreted me out the castle, but decided himself to stay. He says it's his duty, as commander. I... I fear for father's life.",
    questStart: QuestlineStage.IRINA_STAGE_1,
    category: QuestlineCategory.MINOR,
  },
  [Questline.RODERIKA]: {
    name: "Roderika",
    description:
      "Everyone who came with me. They crossed the sea for me. They fought, for me. Heh... Only to have their arms taken. Their legs taken. Even their heads...taken. Taken and stuck to the spider.",
    questStart: QuestlineStage.RODERIKA_STAGE_1,
    category: QuestlineCategory.MINOR,
  },
  [Questline.SELEN]: {
    name: "Sorceress Sellen",
    description:
      "Tarnished, are we? A wonder you should turn up here. I am Sellen, a sorcerer, quite plainly.",
    questStart: QuestlineStage.SELLEN_STAGE_1,
    category: QuestlineCategory.MINOR,
  },
  [Questline.VARRE]: {
    name: "White Mask Varre",
    description:
      "Oh yes... Tarnished, are we? Come to the Lands Between for the Elden Ring, hmm? Of course you have. No shame in it. Unfortunately for you, however... you are maidenless.",
    questStart: QuestlineStage.VARRE_STAGE_1,
    category: QuestlineCategory.MINOR,
  },
  [Questline.RANNI]: {
    name: "Ranni the Witch",
    description:
      "I am the witch Ranni. I stole Death long ago, and search now for the dark path.",
    questStart: QuestlineStage.RANNI_STAGE_1,
    category: QuestlineCategory.MAJOR,
  },
};

export const getQuestlineStagesByQuestline = (questline: Questline) => {
  return Object.entries(QuestlineStageData).filter(
    ([, metadata]) => metadata.questline === questline,
  ) as [QuestlineStage, QuestlineStageMetadata][];
};

export const getQuestlinesByCategory = (category: QuestlineCategory) => {
  return Object.entries(QuestlineData).filter(
    ([, metadata]) => metadata.category === category,
  ) as [Questline, QuestlineMetadata][];
};
