import Papa from "papaparse";
import { DataModel } from "../../models";
import { capitalizeFirstLetter } from "mithril-ui-form";

import agressionIcon from "../../assets/icons/noun-conflict-7254668.svg";
import ptsdIcon from "../../assets/icons/noun-ptsd-2529072.svg";
import victimIcon from "../../assets/icons/noun-violence-1784961.svg";
import depressionIcon from "../../assets/icons/noun-depression-7059482.svg";
import meaningIcon from "../../assets/icons/noun-purpose-6784778.svg";
import honestyIcon from "../../assets/icons/noun-honesty-7494225.svg";
import connectionIcon from "../../assets/icons/noun-holding-hands-6084035.svg";
import appreciationIcon from "../../assets/icons/noun-appreciation-7592051.svg";
import kindnessIcon from "../../assets/icons/noun-kindness-6014284.svg";

export type LikertScale = 0 | 1 | 2 | 3 | 4 | 5;

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
export type UserEntry = UserLikertAnswers & {
  respondentId: number;
  startDate: string;
  startTime: string;
  endDate: string;
  status: string;
  gender: number;
  age: number | string;
  azcMonths: number | string;
  consentToBegeleiderViewing: string;
  uniqueCode: string | number;
  [questionId: string]: number | string; // question IDs will map to numbers
};

export type UserScore = {
  respondentId: number;
  uniqueCode: string | number;
  date: number;
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
  agressionResidentsView: Aspect;
  agressionStaffsView: Aspect;
  ptsd: Aspect;
  victim: Aspect;
  depression: Aspect;
  meaning: Aspect;
  honesty: Aspect;
  kindness: Aspect;
  connection: Aspect;
  appreciation: Aspect;
};

export type Aspect = {
  title: string;
  desc?: string;
  svg: string;
  score: LikertScore;
};

export type LikertScore = [
  physicalAgression: number,
  nonPhysicalAgression: number
];

const avg = (...values: number[]) => {
  const sum = values.reduce((acc, v) => acc + v, 0);
  return sum / values.length;
};

const modZ = (T2: number, I2: number, K2: number) => (0.6745 * (T2 - I2)) / K2;

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

export const userEntryToScore = (entry: UserEntry): UserScore => {
  const {
    respondentId,
    uniqueCode,
    startDate,
    endDate = startDate,
    nicePersonnel,
    honestRules,
    nicePeople,
    caringPeople,
    closeness,
    dignity,
    supportiveOfNeeds,
    heard,
    appreciated,
    upset,
    flashbacks,
    anxiety,
    down,
    sleepDifficulty,
    irritated,
    niceActivities,
    concentration,
    avoidContact,
    victimOfViolence,
    physicalViolenceUsed,
    lifeMeaningful,
    senseOfPurpose,
    meaningfulActivities,
    // violenceNeverAcceptable,
    // acceptableViolenceSituations,
    // selfDefenseAllowed,
    // drugUseForMood,
    // sleepOrMedicationForMood,
    // alcoholUseForMood,
    frequencyOfPhysicalViolence,
    // selfOccupancy,
    // sufficientActivities,
    // dailyVariation,
    fairTreatmentInAzc,
    influenceOnRulesAndAppointments,
    // coerceOthers,
    // rigidWaysOfDoingThings,
    // ordersOthersToFollowMe,
    rudeTowardsOthers,
    capacityForForgiveness,
    attentiveAndKind,
    // controlOverAnger,
    // perceivedAsImpulsive,
    // dominatedByAnger,
    threateningBodyLanguage,
    insultingLanguage,
    deceptionForPersonalGain,
    frequencyOfThreateningBodyLanguage,
    frequencyOfInsultingLanguage,
    frequencyOfDeceptionForPersonalGain,
  } = entry;

  let date = Date.now();
  try {
    const d = convertDDMMYYYYToDate(endDate);
    if (d) {
      date = d.valueOf();
    }
  } catch {
    console.error("Invalid date", endDate);
  }

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
    niceActivities,
    concentration,
    avoidContact
  );
  const avgVictim = avg(victimOfViolence);
  const avgAgreeable = avg(
    rudeTowardsOthers,
    capacityForForgiveness,
    attentiveAndKind
  );
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

  const agressionResidentsView = {
    score: [avgPhysAgressResidentsView, avgNonPhysAgressResidentsView],
    title: "Agressie (bewoner)",
    svg: agressionIcon,
  } as Aspect;

  const agressionStaffsView = {
    score: [avgPhysAgressStaffsView, avgNonPhysAgressStaffsView],
    title: "Agressie (medewerker)",
    svg: agressionIcon,
  } as Aspect;

  const meaning = {
    score: [modZ(avgSignificance, 4.0, 1.0), modZ(avgSignificance, 4.0, 1.0)],
    title: "Zingeving",
    svg: meaningIcon,
  } as Aspect;

  const honesty = {
    score: [modZ(avgFairness, 3.67, 1.0), modZ(avgFairness, 3.67, 1.0)],
    title: "Eerlijkheid",
    svg: honestyIcon,
  } as Aspect;

  const connection = {
    score: [modZ(avgRelatedness, 3.33, 0.67), modZ(avgRelatedness, 3.33, 0.67)],
    title: "Verbinding",
    svg: connectionIcon,
  } as Aspect;

  const appreciation = {
    score: [modZ(avgAppreciation, 4, 1), modZ(avgAppreciation, 4, 1)],
    title: "Waardering",
    svg: appreciationIcon,
  } as Aspect;

  const ptsd = {
    score: [modZ(avgPtsdReexp, 2.67, 0.67), modZ(avgPtsdReexp, 2.67, 0.67)],
    title: "PTSS herbeleving",
    svg: ptsdIcon,
  } as Aspect;

  const victim = {
    score: [modZ(avgVictim, 2.5, 1.5), modZ(avgVictim, 2.0, 1.0)], // Note: scores are different
    title: "Slachtoffer of getuige van geweld",
    svg: victimIcon,
  } as Aspect;

  const kindness = {
    score: [modZ(avgAgreeable, 4.67, 0.33), modZ(avgAgreeable, 4.67, 0.33)],
    title: "Vriendelijkheid",
    svg: kindnessIcon,
  } as Aspect;

  const depression = {
    score: [
      modZ(avgDepressArousal, 2.4, 0.6),
      modZ(avgDepressArousal, 2.4, 0.6),
    ],
    title: "Neerslachtigheid",
    svg: depressionIcon,
  } as Aspect;

  return {
    respondentId,
    uniqueCode,
    date,
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
          const entry = {} as UserEntry;

          // Transform question answers
          Object.entries(row).forEach(([originalHeader, value]) => {
            const questionId = transformHeader(originalHeader);
            const answerText =
              typeof value === "string"
                ? (value as string).toLowerCase().trim()
                : undefined;

            entry[questionId] =
              answerText && answerScale.hasOwnProperty(answerText)
                ? answerScale[answerText]
                : value;
          });

          // console.log(entry);
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
  niceActivities: "I kan plezier hebben in activiteiten of gesprekken",
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
