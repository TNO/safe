import Papa from "papaparse";
import { DataModel } from "../../models";
import { capitalizeFirstLetter } from "mithril-ui-form";

import observeAgressionIcon from "../../assets/icons/observe_agression.svg";
import agressionIcon from "../../assets/icons/agression.svg";
import ptsdIcon from "../../assets/icons/noun-ptsd-2529072.svg";
import victimIcon from "../../assets/icons/noun-violence-1784961.svg";
import depressionIcon from "../../assets/icons/noun-depression-7059482.svg";
import meaningIcon from "../../assets/icons/noun-purpose-6784778.svg";
import honestyIcon from "../../assets/icons/noun-honesty-7494225.svg";
import connectionIcon from "../../assets/icons/noun-holding-hands-6084035.svg";
import appreciationIcon from "../../assets/icons/noun-appreciation-7592051.svg";
import kindnessIcon from "../../assets/icons/noun-kindness-6014284.svg";
import { explanations } from "./explanations";

export type LikertScale = 0 | 1 | 2 | 3 | 4 | 5;

const categories = {
  /** zingeving, variatie, eerlijkheid, verbinding, waardering, autonomie, competenties */
  needs: "Psychologische behoeften",
  /** vermijdende coping, dwingende stijl, vriendelijkheid, zelfcontrole, vijandigheidsbias (hostility bias) */
  personality: "Persoonlijkheidsfactoren",
  /** PTSS herbeleving, Depressie opwinding, slachtoffer van geweld */
  stress: "Stress en trauma",
  /** attitude t.o.v. geweld */
  values: "Waarden",
  /** fysieke agressie vanuit de bewoner perspectief, non fysieke agressie vanuit bewoner perspectief,
   * fysieke agressie vanuit de COA medewerker perspectief, non fysieke agressie vanuit de COA medewerker perspectief
   */
  agression: "Agressief gedrag", //
};

export const likertScaleProp = [
  "honestRules",
  "nicePersonnel",
  "nicePeople",
  "caringPeople",
  "closeness",
  "dignity",
  "supportiveOfNeeds",
  "heard",
  "appreciated",
  "upset",
  "flashbacks",
  "anxiety",
  "down",
  "sleepDifficulty",
  "irritated",
  "niceActivities",
  "concentration",
  "avoidContact",
  "victimOfViolence",
  "physicalViolenceUsed",
  "lifeMeaningful",
  "senseOfPurpose",
  "meaningfulActivities",
  "violenceNeverAcceptable",
  "acceptableViolenceSituations",
  "selfDefenseAllowed",
  "drugUseForMood",
  "sleepOrMedicationForMood",
  "alcoholUseForMood",
  "frequencyOfPhysicalViolence",
  "selfOccupancy",
  "sufficientActivities",
  "dailyVariation",
  "fairTreatmentInAzc",
  "influenceOnRulesAndAppointments",
  "coerceOthers",
  "rigidWaysOfDoingThings",
  "ordersOthersToFollowMe",
  "rudeTowardsOthers",
  "capacityForForgiveness",
  "attentiveAndKind",
  "controlOverAnger",
  "perceivedAsImpulsive",
  "dominatedByAnger",
  "threateningBodyLanguage",
  "insultingLanguage",
  "deceptionForPersonalGain",
  "frequencyOfThreateningBodyLanguage",
  "frequencyOfInsultingLanguage",
  "frequencyOfDeceptionForPersonalGain",
];

export type UserLikertAnswers = {
  honestRules: LikertScale;
  nicePersonnel: LikertScale;
  nicePeople: LikertScale;
  caringPeople: LikertScale;
  closeness: LikertScale;
  dignity: LikertScale;
  supportiveOfNeeds: LikertScale;
  heard: LikertScale;
  appreciated: LikertScale;
  upset: LikertScale;
  flashbacks: LikertScale;
  anxiety: LikertScale;
  down: LikertScale;
  sleepDifficulty: LikertScale;
  irritated: LikertScale;
  niceActivities: LikertScale;
  concentration: LikertScale;
  avoidContact: LikertScale;
  victimOfViolence: LikertScale;
  physicalViolenceUsed: LikertScale;
  lifeMeaningful: LikertScale;
  senseOfPurpose: LikertScale;
  meaningfulActivities: LikertScale;
  violenceNeverAcceptable: LikertScale;
  acceptableViolenceSituations: LikertScale;
  selfDefenseAllowed: LikertScale;
  drugUseForMood: LikertScale;
  sleepOrMedicationForMood: LikertScale;
  alcoholUseForMood: LikertScale;
  frequencyOfPhysicalViolence: LikertScale;
  selfOccupancy: LikertScale;
  sufficientActivities: LikertScale;
  dailyVariation: LikertScale;
  fairTreatmentInAzc: LikertScale;
  influenceOnRulesAndAppointments: LikertScale;
  coerceOthers: LikertScale;
  rigidWaysOfDoingThings: LikertScale;
  ordersOthersToFollowMe: LikertScale;
  rudeTowardsOthers: LikertScale;
  capacityForForgiveness: LikertScale;
  attentiveAndKind: LikertScale;
  controlOverAnger: LikertScale;
  perceivedAsImpulsive: LikertScale;
  dominatedByAnger: LikertScale;
  threateningBodyLanguage: LikertScale;
  insultingLanguage: LikertScale;
  deceptionForPersonalGain: LikertScale;
  frequencyOfThreateningBodyLanguage: LikertScale;
  frequencyOfInsultingLanguage: LikertScale;
  frequencyOfDeceptionForPersonalGain: LikertScale;
};

// Define your expected interface
export type UserEntry = Partial<UserLikertAnswers> & {
  respondentId?: number;
  startDate?: string;
  startTime?: string;
  /** Numeric representation of the end date, or start date */
  date?: number;
  /** Number of questions in the questionnaire */
  questionCnt?: number;
  /** Number of questions that were actually answered */
  answeredCnt?: number;
  /** Number of questions that were answered with "Zeg ik liever niet" */
  declinedCnt?: number;
  endDate?: string;
  status?: string;
  gender?: string;
  age?: number | string;
  azcMonths?: number | string;
  consentToBegeleiderViewing?: string;
  uniqueCode?: string | number;
  [questionId: string]: number | string | undefined; // question IDs will map to numbers
};

export type UserScore = {
  respondentId: number;
  uniqueCode: string | number;
  /** Numeric representation of the end date, or start date */
  date: number;
  /** Number of questions in the questionnaire */
  questionCnt: number;
  /** Number of questions that were actually answered */
  answeredCnt: number;
  /** Number of questions that were answered with "Zeg ik liever niet" */
  declinedCnt: number;
  // avgSignificance: number;
  // avgFairness: number;
  // avgRelatedness: number;
  // avgAppreciation: number;
  // avgPtsdReexp: number;
  // avgVictim: number;
  // avgAgreeable: number;
  // avgDepressArousal: number;
  // avgPhysAgressResidentsView: number;
  // avgNonPhysAgressResidentsView: number;
  // avgPhysAgressStaffsView: number;
  // avgNonPhysAgressStaffsView: number;
  agressionResidentsView: Factor;
  agressionStaffsView: Factor;
  ptsd: Factor;
  victim: Factor;
  depression: Factor;
  meaning: Factor;
  honesty: Factor;
  kindness: Factor;
  connection: Factor;
  appreciation: Factor;
};

export type FactorKey =
  | "agressionResidentsView"
  | "agressionStaffsView"
  | "ptsd"
  | "victim"
  | "depression"
  | "meaning"
  | "honesty"
  | "connection"
  | "appreciation"
  | "kindness";

export type Factor = {
  key: FactorKey;
  title: string;
  category: string;
  desc?: [physicalAggression: string, nonPhysicalAggression: string];
  activity?: [physicalAggression: string, nonPhysicalAggression: string];
  colors?: [paColor: string, npaColor: string];
  notAnsweredPerc: number;
  svg: string;
  score: LikertScore;
  /** If true (default), a positive score indicates a happy smiley */
  moreIsBetter?: boolean;
};

export type LikertScore = [
  physicalAgression: number,
  nonPhysicalAgression: number
];

/** Return average and the percentage of questions that weren't answered */
const avg = (...values: number[]): [score: number, notAnsweredPerc: number] => {
  const [sum, length] = values.reduce(
    (acc, v) => (v ? [acc[0] + v, acc[1] + 1] : acc),
    [0, 0]
  );
  const notAnsweredPerc = Math.round(
    (100 * (values.length - length)) / values.length
  );
  return length > 0 ? [sum / length, notAnsweredPerc] : [0, notAnsweredPerc];
};

/** Some answers need to be inverted, but only if they are answered in the first place */
const invertAnswer = (value?: number): number => (!value ? 0 : 6 - value);

const modZ = (T2: number, I2: number, K2: number) =>
  T2 ? (0.6745 * (T2 - I2)) / K2 : 0;

const convertDDMMYYYYToDate = (dateString: string): Date | null => {
  const parts = dateString.split("-");
  if (parts.length !== 3) {
    return null; // Invalid format
  }

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  // Month in JavaScript Date object is 0-indexed (0 for January, 11 for December)
  if (
    isNaN(day) ||
    isNaN(month) ||
    isNaN(year) ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > new Date(year, month, 0).getDate()
  ) {
    return null; // Invalid date values
  }

  return new Date(year, month - 1, day);
};

/**
 * Color scale mapper function
 * Maps numeric values to RGB colors based on different scale types
 * Scales 1 and 2 use interpolation between color points
 * Scale 3 uses ordinal (discrete) color mapping
 */

// Helper function to interpolate between two colors
const interpolateColor = (
  color1: [number, number, number],
  color2: [number, number, number],
  factor: number
): string => {
  // Ensure factor is between 0 and 1
  const clampedFactor = Math.max(0, Math.min(1, factor));

  // Linear interpolation between the RGB values
  const r = Math.round(color1[0] + clampedFactor * (color2[0] - color1[0]));
  const g = Math.round(color1[1] + clampedFactor * (color2[1] - color1[1]));
  const b = Math.round(color1[2] + clampedFactor * (color2[2] - color1[2]));

  return `rgb(${r}, ${g}, ${b})`;
};

const getColorForValue = (
  scaleType: "pa" | "npa" | "ordinal",
  value: number
): string => {
  // Define colors as RGB tuples for interpolation
  const grey: [number, number, number] = [200, 200, 200];
  const orange: [number, number, number] = [255, 165, 0];
  const red: [number, number, number] = [255, 0, 0];
  const lightGreen: [number, number, number] = [144, 238, 144];
  const green: [number, number, number] = [0, 128, 0];

  switch (scaleType) {
    case "pa": // Scale 1: Interpolated gradient scale
      if (value >= 5) {
        return `rgb(${red[0]}, ${red[1]}, ${red[2]})`;
      } else if (value >= 2) {
        // Interpolate between orange and red for values between 2 and 5
        const factor = (value - 2) / 3; // 0 at value=2, 1 at value=5
        return interpolateColor(orange, red, factor);
      } else if (value >= 1) {
        // Interpolate between white and orange for values between 1 and 2
        const factor = value - 1; // 0 at value=1, 1 at value=2
        return interpolateColor(grey, orange, factor);
      } else {
        return `rgb(${grey[0]}, ${grey[1]}, ${grey[2]})`;
      }

    case "npa": // Scale 2: Interpolated with decimal thresholds
      if (value >= 5) {
        return `rgb(${red[0]}, ${red[1]}, ${red[2]})`;
      } else if (value >= 1.66) {
        // Interpolate between orange and red for values between 1.66 and 5
        const factor = (value - 1.66) / (5 - 1.66); // 0 at value=1.66, 1 at value=5
        return interpolateColor(orange, red, factor);
      } else if (value > 0) {
        // Interpolate between white and orange for values between 0 and 1.66
        const factor = value / 1.66; // 0 at value=0, 1 at value=1.66
        return interpolateColor(grey, orange, factor);
      } else {
        return `rgb(${grey[0]}, ${grey[1]}, ${grey[2]})`;
      }

    case "ordinal": // Scale 3: Ordinal scale with discrete colors
      if (value >= 2) {
        return `rgb(${green[0]}, ${green[1]}, ${green[2]})`;
      } else if (value >= 1) {
        return `rgb(${lightGreen[0]}, ${lightGreen[1]}, ${lightGreen[2]})`;
      } else if (value <= -2) {
        return `rgb(${red[0]}, ${red[1]}, ${red[2]})`;
      } else if (value <= -1) {
        return `rgb(${orange[0]}, ${orange[1]}, ${orange[2]})`;
      } else {
        return `rgb(${grey[0]}, ${grey[1]}, ${grey[2]})`;
      }

    default:
      // Type safety
      const exhaustiveCheck: never = scaleType;
      throw new Error(`Unhandled scale type: ${exhaustiveCheck}`);
  }
};

const paTitle = "#### Fysieke agressie\n\n";
const npaTitle = "#### Niet-fysieke agressie\n\n";

const addTitleAndDescToFactor = (factor: Factor): Factor => {
  const { key, score } = factor;
  const [physAgres, nonPhysAgres] = score;
  const explanation = explanations[key];
  const { title, physical: explP, nonPhysical: explNP = explP } = explanation;
  let descPA: string;
  let descNPA: string;
  let actPA: string;
  let actNPA: string;
  let colors: [string, string];
  let moreIsBetter = ![
    "agressionResidentsView",
    "agressionStaffsView",
    "victim",
    "ptsd",
    "depression",
  ].includes(key);
  switch (key) {
    case "agressionResidentsView": {
      descPA =
        physAgres <= -2
          ? explP.expLowest
          : physAgres < -1
          ? explP.expLow
          : physAgres >= 1.1
          ? explP.expHigh
          : explP.expAvg;
      actPA =
        physAgres <= -1
          ? explP.actLowScore
          : physAgres >= 1.1
          ? explP.actHighScore
          : "";
      descNPA =
        nonPhysAgres <= -2
          ? explNP.expLowest
          : nonPhysAgres < -1
          ? explNP.expLow
          : nonPhysAgres >= 2
          ? explNP.expHighest
          : nonPhysAgres >= 1.66
          ? explNP.expHigh
          : explNP.expAvg;
      actNPA =
        nonPhysAgres < -1
          ? explNP.actLowScore
          : nonPhysAgres >= 1.66
          ? explNP.actHighScore
          : nonPhysAgres >= 1
          ? explNP.actLowScore
          : "";
      colors = [
        getColorForValue("pa", physAgres),
        getColorForValue("npa", nonPhysAgres),
      ];
      break;
    }
    case "agressionStaffsView": {
      descPA =
        physAgres <= -2
          ? explP.expLowest
          : physAgres < -1
          ? explP.expLow
          : physAgres >= 1.1
          ? explP.expHigh
          : explP.expAvg;
      actPA =
        physAgres <= -1
          ? explP.actLowScore
          : physAgres >= 1.1
          ? explP.actHighScore
          : "";
      descNPA =
        nonPhysAgres <= -2
          ? explNP.expLowest
          : nonPhysAgres < -1
          ? explNP.expLow
          : nonPhysAgres >= 2
          ? explNP.expHighest
          : nonPhysAgres >= 1.66
          ? explNP.expHigh
          : explNP.expAvg;
      actNPA =
        nonPhysAgres <= -1
          ? explNP.actLowScore
          : nonPhysAgres >= 1.66
          ? explNP.actHighScore
          : nonPhysAgres >= 1
          ? explNP.actLowScore
          : "";
      colors = [
        getColorForValue("pa", physAgres),
        getColorForValue("npa", nonPhysAgres),
      ];
      break;
    }
    default: {
      descPA =
        physAgres <= -2
          ? explP.expLowest
          : physAgres < -1
          ? explP.expLow
          : physAgres >= 2
          ? explP.expHighest
          : physAgres >= 1
          ? explP.expHigh
          : explP.expAvg;
      actPA =
        physAgres <= -1
          ? explP.actLowScore
          : physAgres >= 1
          ? explP.actHighScore
          : "";
      descNPA =
        nonPhysAgres <= -2
          ? explNP.expLowest
          : nonPhysAgres < -1
          ? explNP.expLow
          : nonPhysAgres >= 2
          ? explNP.expHighest
          : nonPhysAgres >= 1
          ? explNP.expHigh
          : explNP.expAvg;
      actNPA =
        nonPhysAgres <= -1
          ? explNP.actLowScore
          : nonPhysAgres >= 1
          ? explNP.actHighScore
          : "";
      colors = [
        getColorForValue("ordinal", moreIsBetter ? physAgres : -physAgres),
        getColorForValue(
          "ordinal",
          moreIsBetter ? nonPhysAgres : -nonPhysAgres
        ),
      ];
      break;
    }
  }
  return {
    ...factor,
    moreIsBetter,
    score,
    title,
    desc:
      descPA === descNPA || !descNPA
        ? [descPA, ""]
        : [
            descPA ? paTitle + descPA : undefined,
            descNPA ? npaTitle + descNPA : undefined,
          ],
    activity:
      actPA === actNPA || !actNPA
        ? [actPA, ""]
        : [
            actPA ? paTitle + actPA : undefined,
            actNPA ? npaTitle + actNPA : undefined,
          ],
    colors,
  } as Factor;
};

export const userEntryToScore = (entry: UserEntry): UserScore => {
  const {
    respondentId,
    uniqueCode,
    date,
    questionCnt,
    answeredCnt,
    declinedCnt,
    // Questions
    nicePersonnel = 0,
    honestRules = 0,
    nicePeople = 0,
    caringPeople = 0,
    closeness = 0,
    dignity = 0,
    supportiveOfNeeds = 0,
    heard = 0,
    appreciated = 0,
    upset = 0,
    flashbacks = 0,
    anxiety = 0,
    down = 0,
    sleepDifficulty = 0,
    irritated = 0,
    niceActivities = 0,
    concentration = 0,
    avoidContact = 0,
    victimOfViolence = 0,
    physicalViolenceUsed = 0,
    lifeMeaningful = 0,
    senseOfPurpose = 0,
    meaningfulActivities = 0,
    // violenceNeverAcceptable = 0, // Negative trait
    // acceptableViolenceSituations = 0,
    // selfDefenseAllowed = 0,
    // drugUseForMood = 0,
    // sleepOrMedicationForMood = 0,
    // alcoholUseForMood = 0,
    frequencyOfPhysicalViolence = 0,
    // selfOccupancy = 0,
    // sufficientActivities = 0,
    // dailyVariation = 0,
    fairTreatmentInAzc = 0,
    influenceOnRulesAndAppointments = 0,
    // coerceOthers = 0,
    // rigidWaysOfDoingThings = 0,
    // ordersOthersToFollowMe = 0,
    rudeTowardsOthers = 0,
    capacityForForgiveness = 0,
    attentiveAndKind = 0,
    // controlOverAnger = 0,
    // perceivedAsImpulsive = 0, // Negative trait
    // dominatedByAnger = 0, // Negative trait
    threateningBodyLanguage = 0,
    insultingLanguage = 0,
    deceptionForPersonalGain = 0,
    frequencyOfThreateningBodyLanguage = 0,
    frequencyOfInsultingLanguage = 0,
    frequencyOfDeceptionForPersonalGain = 0,
  } = entry;

  const avgSignificance = avg(
    lifeMeaningful,
    senseOfPurpose,
    meaningfulActivities
  );
  const avgFairness = avg(
    fairTreatmentInAzc,
    influenceOnRulesAndAppointments,
    honestRules
  );
  const avgRelatedness = avg(
    nicePersonnel,
    nicePeople,
    caringPeople,
    closeness
  );
  const avgAppreciation = avg(dignity, supportiveOfNeeds, heard, appreciated);
  const avgPtsdReexp = avg(upset, flashbacks, anxiety);
  const avgDepressArousal = avg(
    down,
    sleepDifficulty,
    irritated,
    invertAnswer(niceActivities),
    invertAnswer(concentration),
    avoidContact
  );
  const avgVictim = avg(victimOfViolence);
  const avgKindness = avg(
    invertAnswer(rudeTowardsOthers),
    capacityForForgiveness,
    attentiveAndKind
  );
  // TODO REMOVE
  console.table({
    avgKindness,
    rudeTowardsOthers,
    capacityForForgiveness,
    attentiveAndKind,
  });

  const avgPhysAgressResidentsView = avg(frequencyOfPhysicalViolence);
  const avgNonPhysAgressResidentsView = avg(
    threateningBodyLanguage,
    insultingLanguage,
    deceptionForPersonalGain
  );
  const avgPhysAgressStaffsView = avg(physicalViolenceUsed);
  const avgNonPhysAgressStaffsView = avg(
    frequencyOfThreateningBodyLanguage,
    frequencyOfInsultingLanguage,
    frequencyOfDeceptionForPersonalGain
  );

  const agressionResidentsView = addTitleAndDescToFactor({
    key: "agressionResidentsView",
    score: [avgPhysAgressResidentsView[0], avgNonPhysAgressResidentsView[0]],
    category: categories.agression,
    notAnsweredPerc:
      (avgPhysAgressResidentsView[1] + avgNonPhysAgressResidentsView[1]) / 2,
    svg: agressionIcon,
  } as Factor);

  const agressionStaffsView = addTitleAndDescToFactor({
    key: "agressionStaffsView",
    score: [avgPhysAgressStaffsView[0], avgNonPhysAgressStaffsView[0]],
    category: categories.agression,
    notAnsweredPerc:
      (avgPhysAgressStaffsView[1] + avgNonPhysAgressStaffsView[1]) / 2,
    svg: observeAgressionIcon,
  } as Factor);

  const ptsd = addTitleAndDescToFactor({
    key: "ptsd",
    score: [
      modZ(avgPtsdReexp[0], 2.67, 0.67),
      modZ(avgPtsdReexp[0], 2.67, 0.67),
    ],
    category: categories.stress,
    notAnsweredPerc: avgPtsdReexp[1],
    svg: ptsdIcon,
  } as Factor);

  const victim = addTitleAndDescToFactor({
    key: "victim",
    score: [modZ(avgVictim[0], 2.5, 1.5), modZ(avgVictim[0], 2.0, 1.0)], // Note: scores are different
    category: categories.stress,
    notAnsweredPerc: avgVictim[1],
    svg: victimIcon,
  } as Factor);

  const depression = addTitleAndDescToFactor({
    key: "depression",
    score: [
      modZ(avgDepressArousal[0], 2.4, 0.6),
      modZ(avgDepressArousal[0], 2.4, 0.6),
    ],
    category: categories.stress,
    notAnsweredPerc: avgDepressArousal[1],
    svg: depressionIcon,
  } as Factor);

  const meaning = addTitleAndDescToFactor({
    key: "meaning",
    score: [
      modZ(avgSignificance[0], 4.0, 1.0),
      modZ(avgSignificance[0], 4.0, 1.0),
    ],
    category: categories.needs,
    notAnsweredPerc: avgSignificance[1],
    svg: meaningIcon,
  } as Factor);

  const honesty = addTitleAndDescToFactor({
    key: "honesty",
    score: [modZ(avgFairness[0], 3.67, 1.0), modZ(avgFairness[0], 3.67, 1.0)],
    category: categories.needs,
    notAnsweredPerc: avgFairness[1],
    svg: honestyIcon,
  } as Factor);

  const connection = addTitleAndDescToFactor({
    key: "connection",
    score: [
      modZ(avgRelatedness[0], 3.33, 0.67),
      modZ(avgRelatedness[0], 3.33, 0.67),
    ],
    category: categories.needs,
    notAnsweredPerc: avgRelatedness[1],
    svg: connectionIcon,
  } as Factor);

  const appreciation = addTitleAndDescToFactor({
    key: "appreciation",
    score: [modZ(avgAppreciation[0], 4, 1), modZ(avgAppreciation[0], 4, 1)],
    category: categories.needs,
    notAnsweredPerc: avgAppreciation[1],
    svg: appreciationIcon,
  } as Factor);

  const kindness = addTitleAndDescToFactor({
    key: "kindness",
    score: [modZ(avgKindness[0], 4.67, 0.33), modZ(avgKindness[0], 4.67, 0.33)],
    category: categories.personality,
    notAnsweredPerc: avgKindness[1],
    svg: kindnessIcon,
  } as Factor);

  return {
    respondentId,
    uniqueCode,
    date,
    questionCnt,
    answeredCnt,
    declinedCnt,
    // avgSignificance,
    // avgFairness,
    // avgRelatedness,
    // avgAppreciation,
    // avgPtsdReexp,
    // avgDepressArousal,
    // avgVictim,
    // avgAgreeable,
    // avgPhysAgressResidentsView,
    // avgNonPhysAgressResidentsView,
    // avgPhysAgressStaffsView,
    // avgNonPhysAgressStaffsView,
    agressionResidentsView,
    agressionStaffsView,
    meaning,
    honesty,
    connection,
    appreciation,
    ptsd,
    victim,
    kindness,
    depression,
  } as UserScore;
};

// Mapping for answer conversion: Nooit	Soms	Regelmatig	Vaak	Altijd	Zeg ik liever niet
const answerScale: Record<string, LikertScale> = {
  "zeg ik liever niet": 0,
  nooit: 1,
  soms: 2,
  regelmatig: 3,
  vaak: 4,
  altijd: 5,
};

export const likertToText = (scale: LikertScale) => {
  const found = Object.entries(answerScale).find((s) => s[1] === scale);
  return found ? found[0] : "-";
};

export const scaleToAnswer = Object.entries(answerScale).reduce(
  (acc, [s, n]) => {
    acc.set(n, capitalizeFirstLetter(s));
    return acc;
  },
  new Map<number, string>()
);

export async function processCSV(file: File): Promise<UserEntry[]> {
  // Define a mapping between original headers and standardized keys
  const headerMapping: { [key: string]: keyof UserEntry } = {
    "respondent id": "respondentId",
    "start datum": "startDate",
    "eind datum": "endDate",
    "start tijd": "startTime",
    status: "status",
    geslacht: "gender",
    "hoe oud bent u?": "age",
    "hoeveel maanden woon je al op een azc opvangl": "azcMonths",
    "de regels in het azc zijn eerlijk": "honestRules",
    "ik kan goed opschieten met het coa-personeel": "nicePersonnel",
    "ik kan goed opschieten met andere bewoners": "nicePeople",
    "er zijn mensen in het azc die om mij geven": "caringPeople",
    "ik heb een hechte band met sommige mensen in ": "closeness",
    "ik word met respect en waardigheid behandeld ": "dignity",
    "het coa-personeel houdt rekening met mijn cul": "supportiveOfNeeds",
    "mensen luisteren naar mij": "heard",
    "ik voel me gewaardeerd door de mensen in het ": "appreciated",
    "ik raak van streek omdat ik steeds weer denk ": "upset",
    "ik heb flashbacks, sterke herinneringen, over": "flashbacks",
    "wanneer ik plots moet denken aan nare dingen ": "anxiety",
    "ik voel me somber en heb weinig energie": "down",
    "ik heb problemen met in slaap vallen en/of do": "sleepDifficulty",
    "ik voel me snel geïrriteerd": "irritated",
    "ik kan plezier hebben in activiteiten of gesp": "niceActivities",
    "ik kan me goed concentreren als ik iets allee": "concentration",
    "ik vermijd contact met anderen": "avoidContact",
    "ik ben in het verleden slachtoffer of getuige": "victimOfViolence",
    "hoe vaak heeft de bewoner opzettelijk en dire": "physicalViolenceUsed",
    "ik ervaar mijn leven als zinvol": "lifeMeaningful",
    "ik heb het gevoel dat mijn leven een doel hee": "senseOfPurpose",
    "ik doe betekenisvolle dingen in mijn leven, z": "meaningfulActivities",
    "geweld is nooit acceptabel": "violenceNeverAcceptable",
    "in sommige situaties kan het goed zijn om gew":
      "acceptableViolenceSituations",
    "het is oké om iemand te slaan die jou als eer": "selfDefenseAllowed",
    "ik gebruik drugs om me beter te voelen als ik": "drugUseForMood",
    "ik slaap of neem medicatie om me beter te voe": "sleepOrMedicationForMood",
    "ik drink alcohol om me beter te voelen als he": "alcoholUseForMood",
    "hoe vaak gebruikt u opzettelijk en direct fys":
      "frequencyOfPhysicalViolence",
    "ik kan mezelf bezig houden": "selfOccupancy",
    "er zijn hier genoeg dingen te doen voor mij": "sufficientActivities",
    "iedere dag hier is anders": "dailyVariation",
    "ik word eerlijk behandeld in het azc": "fairTreatmentInAzc",
    "ik heb inspraak in de regels en afspraken in ":
      "influenceOnRulesAndAppointments",
    "ik overtuig of dwing anderen om dingen te doe": "coerceOthers",
    "ik wil dat alles op mijn manier gaat": "rigidWaysOfDoingThings",
    "anderen moeten doen wat ik zeg": "ordersOthersToFollowMe",
    "ik ben onbeleefd tegen anderen": "rudeTowardsOthers",
    "ik kan mensen vergeven": "capacityForForgiveness",
    "ik ben attent en vriendelijk voor iedereen": "attentiveAndKind",
    "ik heb controle over mijn boosheid": "controlOverAnger",
    "mensen beschrijven mij als impulsief": "perceivedAsImpulsive",
    "ik laat me meeslepen door mijn boosheid": "dominatedByAnger",
    "hoe vaak gebruikt u dreigende lichaamstaal of": "threateningBodyLanguage",
    "hoe vaak gebruikt u opzettelijk beledigende, ": "insultingLanguage",
    "hoe vaak gebruikt u valse informatie, misleid": "deceptionForPersonalGain",
    "hoe vaak heeft de bewoner dreigende lichaamst":
      "frequencyOfThreateningBodyLanguage",
    "hoe vaak heeft de bewoner opzettelijk beledig":
      "frequencyOfInsultingLanguage",
    "hoe vaak heeft de bewoner valse informatie, m":
      "frequencyOfDeceptionForPersonalGain",
    "ben jij akkoord dat jouw begeleider de ingevu":
      "consentToBegeleiderViewing",
    "welke unieke code heb je ontvangen van jouw b": "uniqueCode",
  };

  // Function to transform headers using the mapping
  function transformHeader(originalHeader: string): keyof UserEntry {
    return (
      headerMapping[originalHeader.substring(0, 45).toLowerCase()] ||
      originalHeader
    );
  }

  return new Promise((resolve, reject) => {
    Papa.parse<Record<string, string | number>>(file, {
      header: true,
      delimiter: ";",
      skipEmptyLines: true,
      complete: (results) => {
        // Process the data
        const processedData: UserEntry[] = results.data.map((row) => {
          let date = Date.now();
          let endDate = (row["Eind datum"] || row["Start datum"]) as string;
          console.log(endDate);
          try {
            const d = convertDDMMYYYYToDate(endDate);
            if (d) {
              date = d.valueOf();
            }
          } catch {
            console.error("Invalid date", endDate);
          }
          const entry = {
            date,
            questionCnt: 0,
            answeredCnt: 0,
            declinedCnt: 0,
          } as UserEntry;

          // Transform question answers
          Object.entries(row).forEach(([originalHeader, value]) => {
            const questionId = transformHeader(originalHeader);
            const answerText =
              typeof value === "string"
                ? (value as string).toLowerCase().trim()
                : undefined;
            const answer =
              answerText && answerScale.hasOwnProperty(answerText)
                ? answerScale[answerText]
                : value;
            entry.questionCnt!++;
            if (answer === 0) {
              entry.answeredCnt!++;
              entry.declinedCnt!++;
            } else if (answer) {
              entry.answeredCnt!++;
            }
            entry[questionId] = answer;
          });
          return entry;
        });

        resolve(processedData);
      },
      error: (error) => reject(error),
    });
  });
}

export const handleCsvUpload =
  (saveModel: (model: DataModel) => void) => async (e: Event) => {
    const fileInput = e.target as HTMLInputElement;
    if (!fileInput.files || fileInput.files.length <= 0) return;

    let model = {
      version: 1,
      lastUpdate: Date.now(),
      data: [],
    } as DataModel;
    model.data = await processCSV(fileInput.files[0]);
    saveModel(model);
  };

export const questionnaire: Record<
  keyof Omit<
    UserEntry,
    | "respondentId"
    | "startDate"
    | "startTime"
    | "endDate"
    | "status"
    | "uniqueCode"
  >,
  string
> = {
  gender: "Wat is uw geslacht?",
  age: "Hoe oud bent u?",
  azcMonths: "Hoeveel maanden woon je al op een AZC opvanglocatie?",
  lifeMeaningful: "Ik ervaar mijn leven als zinvol",
  senseOfPurpose: "Ik heb het gevoel dat mijn leven een doel heeft.",
  meaningfulActivities:
    "Ik doe betekenisvolle dingen in mijn leven, zoals zorgen voor anderen of iets creëren",
  selfOccupancy: "Ik kan mezelf bezig houden",
  closeness: "Er zijn hier genoeg dingen te doen voor mij",
  dailyVariation: "Iedere dag hier is anders",
  fairTreatmentInAzc: "Ik word eerlijk behandeld in het azc",
  influenceOnRulesAndAppointments:
    "Ik heb inspraak in de regels en afspraken in het azc",
  honestRules: "De regels in het azc zijn eerlijk",
  nicePersonnel: "Ik kan goed opschieten met het COA-personeel",
  nicePeople: "Ik kan goed opschieten met andere bewoners",
  caringPeople: "Er zijn mensen in het azc die om mij geven",
  sufficientActivities: "Ik heb een hechte band met sommige mensen in het azc",
  dignity:
    "Ik word met respect en waardigheid behandeld door het COA-personeel",
  supportiveOfNeeds:
    "Het COA-personeel houdt rekening met mijn culturele of religieuze behoeften",
  heard: "Mensen luisteren naar mij",
  appreciated: "Ik voel me gewaardeerd door de mensen in het azc",
  upset:
    "Ik raak van streek omdat ik steeds weer denk aan de nare dingen die zijn gebeurd.",
  flashbacks:
    "Ik heb flashbacks, sterke herinneringen, over erge dingen die in mijn verleden zijn gebeurd",
  anxiety:
    "Wanneer ik plots moet denken aan nare dingen die zijn gebeurd, voel ik dit ook in mijn lichaam.",
  // "Wanneer ik plots moet denken aan nare dingen die zijn gebeurd, voel ik dit ook in mijn lichaam. (ik merk bijvoorbeeld dat ik sneller ga ademen, of een hoge hartslag krijg, of heel onrustig wordt, of hoofdpijn krijg, of bang of boos wordt)",
  down: "Ik voel me somber en heb weinig energie",
  sleepDifficulty: "Ik heb problemen met in slaap vallen en/of doorslapen",
  irritated: "Ik voel me snel geïrriteerd",
  niceActivities: "Ik kan plezier hebben in activiteiten of gesprekken",
  concentration: "Ik kan me goed concentreren als ik iets alleen moet doen",
  avoidContact: "Ik vermijd contact met anderen",
  victimOfViolence:
    "Ik ben in het verleden slachtoffer of getuige geweest van geweld.",
  // "Ik ben in het verleden slachtoffer of getuige geweest van geweld. (Met 'verleden' wordt bedoeld: vanaf de geboorte tot nu)",
  violenceNeverAcceptable: "Geweld is nooit acceptabel",
  acceptableViolenceSituations:
    "In sommige situaties kan het goed zijn om geweld te gebruiken",
  selfDefenseAllowed: "Het is oké om iemand te slaan die jou als eerste slaat",
  drugUseForMood:
    "Ik gebruik drugs om me beter te voelen als ik me slecht voel.",
  sleepOrMedicationForMood:
    "Ik slaap of neem medicatie om me beter te voelen als het niet goed met me gaat",
  alcoholUseForMood:
    "Ik drink alcohol om me beter te voelen als het niet goed met me gaat",
  coerceOthers: "Ik overtuig of dwing anderen om dingen te doen die ik wil",
  rigidWaysOfDoingThings: "Ik wil dat alles op mijn manier gaat",
  ordersOthersToFollowMe: "Anderen moeten doen wat ik zeg",
  rudeTowardsOthers: "Ik ben onbeleefd tegen anderen",
  capacityForForgiveness: "Ik kan mensen vergeven",
  attentiveAndKind: "Ik ben attent en vriendelijk voor iedereen",
  controlOverAnger: "Ik heb controle over mijn boosheid",
  perceivedAsImpulsive: "Mensen beschrijven mij als impulsief",
  dominatedByAnger: "Ik laat me meeslepen door mijn boosheid",
  frequencyOfPhysicalViolence:
    "Hoe vaak gebruikt u opzettelijk en direct fysiek geweld tegen andere mensen of voorwerpen?",
  threateningBodyLanguage:
    "Hoe vaak gebruikt u dreigende lichaamstaal of gebaren om anderen te intimideren, bang te maken, te beledigen, uit te sluiten of te negeren?",
  // "Hoe vaak gebruikt u dreigende lichaamstaal of gebaren om anderen te intimideren, bang te maken, te beledigen, uit te sluiten of te negeren? (Andere voorbeelden zijn spugen, gevaarlijke voorwerpen laten zien, stalken en belemmeren)",
  insultingLanguage:
    "Hoe vaak gebruikt u opzettelijk beledigende, kleinerende of grove taal om anderen te kwetsen, te intimideren of te vernederen?",
  deceptionForPersonalGain:
    "Hoe vaak gebruikt u valse informatie, misleiding, manipulatie of emotionele chantage voor persoonlijk gewin of om uw zin te krijgen?",
  physicalViolenceUsed:
    "Hoe vaak heeft de bewoner opzettelijk en direct fysiek geweld gebruikt tegen andere mensen of voorwerpen?",
  frequencyOfThreateningBodyLanguage:
    "Hoe vaak heeft de bewoner dreigende lichaamstaal of gebaren gebruikt om anderen te intimideren, bang te maken, te beledigen, uit te sluiten of te negeren?",
  // "Hoe vaak heeft de bewoner dreigende lichaamstaal of gebaren gebruikt om anderen te intimideren, bang te maken, te beledigen, uit te sluiten of te negeren? (Andere voorbeelden zijn spugen, gevaarlijke voorwerpen laten zien, stalken en belemmeren)",
  frequencyOfInsultingLanguage:
    "Hoe vaak heeft de bewoner opzettelijk beledigende, kleinerende of grove taal gebruikt om anderen te kwetsen, te intimideren of te vernederen?",
  frequencyOfDeceptionForPersonalGain:
    "Hoe vaak heeft de bewoner valse informatie, misleiding, manipulatie of emotionele chantage gebruikt voor persoonlijk gewin of om zijn/haar zin te krijgen?",
  consentToBegeleiderViewing:
    "Ben jij akkoord dat jouw begeleider de ingevulde vragen kan inzien om jou verder te helpen in de begeleiding?",
};
