import { UserEntry } from ".";

type UserEntryRecord = {
  [K in keyof UserEntry]: string | number;
};

export const questionnaire: UserEntryRecord = {
  gender: "Geslacht",
  age: "Hoe oud ben jij?",
  azcMonths: "Hoeveel maanden woon je al op een AZC opvanglocatie?",
  lifeMeaningful: "Ik ervaar mijn leven als zinvol",
  senseOfPurpose: "Ik heb het gevoel dat mijn leven een doel heeft",
  meaningfulActivities:
    "Ik doe betekenisvolle dingen in mijn leven, zoals zorgen voor anderen of iets creëren",
  violenceNeverAcceptable: "Geweld is nooit acceptabel",
  violAccept: "In sommige situaties kan het goed zijn om geweld te gebruiken",
  selfDef: "Het is oké om iemand te slaan die jou als eerste slaat",
  drugUse: "Ik gebruik drugs om me beter te voelen als ik me slecht voel.",
  sleepMeds:
    "Ik slaap of neem medicatie om me beter te voelen als het niet goed met me gaat",
  alcohol:
    "Ik drink alcohol om me beter te voelen als het niet goed met me gaat",
  freqPhysViol:
    "Hoe vaak gebruik je opzettelijk en direct fysiek geweld tegen andere mensen of voorwerpen?",
  selfOccupancy: "Ik kan mezelf bezig houden",
  sufAct: "Er zijn hier genoeg dingen te doen voor mij",
  dailyVariation: "Iedere dag hier is anders",
  fairTreatment: "Ik word eerlijk behandeld in het azc",
  influence: "Ik heb inspraak in de regels en afspraken in het azc",
  honestRules: "De regels in het azc zijn eerlijk",
  nicePersonnel: "Ik kan goed opschieten met het COA-personeel",
  nicePeople: "Ik kan goed opschieten met andere bewoners",
  caringPeople: "Er zijn mensen in het azc die om mij geven",
  closeness: "Ik heb een hechte band met sommige mensen in het azc",
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
  down: "Ik voel me somber en heb weinig energie",
  sleepDifficulty: "Ik heb problemen met in slaap vallen en/of doorslapen",
  irritated: "Ik voel me snel geïrriteerd",
  niceActivities: "Ik kan plezier hebben in activiteiten of gesprekken",
  concentration: "Ik kan me goed concentreren als ik iets alleen moet doen",
  avoidContact: "Ik vermijd contact met anderen",
  victimOfViolence:
    "Ik ben in het verleden slachtoffer of getuige geweest van geweld.",
  coerceOthers: "Ik overtuig of dwing anderen om dingen te doen die ik wil",
  myWay: "Ik wil dat alles op mijn manier gaat",
  followMe: "Anderen moeten doen wat ik zeg",
  rude: "Ik ben onbeleefd tegen anderen",
  forgiving: "Ik kan mensen vergeven",
  kind: "Ik ben attent en vriendelijk voor iedereen",
  hostile1: "Ik denk niet dat mensen echt goede bedoelingen met mij hebben",
  hostile2:
    "Het voelt alsof anderen mensen vijandig tegen mij doen, ook als zij dit niet zo bedoelen",
  hostile3:
    "In onduidelijke situaties neem ik aan dat mensen slechte bedoelingen hebben",
  controlOverAnger: "Ik heb controle over mijn boosheid",
  impulsive: "Mensen beschrijven mij als impulsief",
  angry: "Ik laat me meeslepen door mijn boosheid",
  threatening:
    "Hoe vaak gebruik je dreigende lichaamstaal of gebaren om anderen te intimideren, bang te maken, te beledigen, uit te sluiten of te negeren?",
  insulting:
    "Hoe vaak gebruik je opzettelijk beledigende, kleinerende of grove taal om anderen te kwetsen, te intimideren of te vernederen?",
  deceptive:
    "Hoe vaak gebruik je valse informatie, misleiding, manipulatie of emotionele chantage voor persoonlijk gewin of om uw zin te krijgen?",
  recHelp: "Heb je hulp gehad bij het invullen van de vragenlijst?",
  informedConsent:
    "Ben jij akkoord dat jouw begeleider de ingevulde vragen kan inzien om jou verder te helpen in de begeleiding?",
  info: "Heb je van tevoren via een brief informatie ontvangen van jouw COA-begeleider over dit onderzoek?",
  compentency1: "Ik ben in staat om nuttige nieuwe vaardigheden aan te leren",
  compentency2: "Ik krijg de kans om mijn vaardigheden te laten zien",
  compentency3:
    "Ik denk dat ik in staat ben om verschillende taken en uitdagingen goed aan te pakken",
  autonomy1: "Ik voel me vrij om mijn mening en ideeën te uiten",
  autonomy2: "Ik kan mezelf zijn in het AZC",
  autonomy3:
    "Ik heb de mogelijkheid om zelf te bepalen wat ik doe in mijn dagelijks leven",
  physicalViolenceUsed:
    "Hoe vaak heeft de bewoner opzettelijk en direct fysiek geweld gebruikt tegen andere mensen of voorwerpen?",
  freqThreatBL:
    "Hoe vaak heeft de bewoner dreigende lichaamstaal of gebaren gebruikt om anderen te intimideren, bang te maken, te beledigen, uit te sluiten of te negeren?",
  freqInsults:
    "Hoe vaak heeft de bewoner opzettelijk beledigende, kleinerende of grove taal gebruikt om anderen te kwetsen, te intimideren of te vernederen?",
  freqDecept:
    "Hoe vaak heeft de bewoner valse informatie, misleiding, manipulatie of emotionele chantage gebruikt voor persoonlijk gewin of om zijn/haar zin te krijgen?",
};

export const interviewQuestionnaire: UserEntryRecord = {
  info: "Heb je van tevoren via een brief informatie ontvangen van jouw COA-begeleider over dit onderzoek?",
  informedConsent:
    "Ben jij akkoord dat jouw begeleider de ingevulde vragen kan inzien om jou verder te helpen in de begeleiding?",
  uniqueCode: "Welke unieke code heb je ontvangen van jouw begeleider?",
  victimOfViolence:
    "Hoe vaak ben je in het verleden slachtoffer of getuige geweest van geweld?",
  gender: "Geslacht",
  age: "Hoe oud ben je?",
  azcMonths: "Hoeveel maanden woon je op een azc-locatie?",
  lifeMeaningful: "Hoe vaak vind je betekenis in je leven?",
  senseOfPurpose: "Hoe vaak voel je dat jouw leven een doel heeft?",
  meaningfulActivities:
    "Hoe vaak doe je dingen die belangrijk zijn in jouw leven? Zoals voor anderen zorgen of iets maken.",
  selfOccupancy: "Hoe vaak kun je jezelf bezighouden?",
  sufAct: "Hoe vaak heb je het gevoel dat je genoeg te doen hebt in het azc?",
  dailyVariation:
    "Hoe vaak heb je het gevoel dat elke dag anders is in het azc?",
  fairTreatment:
    "Hoe vaak heb je het gevoel dat je eerlijk behandeld wordt in het azc?",
  influence:
    "Hoe vaak heb je het gevoel dat je mag meedenken over de regels en afspraken in het azc?",
  honestRules: "Hoe vaak vind je de regels in het azc eerlijk?",
  nicePersonnel: "Hoe vaak kun je goed opschieten met het COA-personeel?",
  nicePeople: "Hoe vaak kun je goed opschieten met andere bewoners?",
  caringPeople: "Hoe vaak heb je het gevoel dat mensen in het azc om je geven?",
  closeness:
    "Hoe vaak heb je het gevoel dat je een hechte band hebt met mensen in het azc?",
  dignity:
    "Hoe vaak heb je het gevoel dat COA-medewerkers jou met respect en waardigheid behandelen?",
  supportiveOfNeeds:
    "Hoe vaak houden de COA-medewerkers rekening met jouw culturele of religieuze behoeften?",
  heard: "Hoe vaak luisteren mensen naar jou?",
  appreciated:
    "Hoe vaak voel je je gewaardeerd door de mensen op de azc-locatie?",
  upset:
    "Hoe vaak raak je van streek omdat je nadenkt over de nare dingen die je hebt meegemaakt?",
  flashbacks:
    "Hoe vaak heb je flashbacks of sterke herinneringen aan erge dingen die in jouw verleden zijn gebeurd?",
  anxiety:
    "Als iets je herinnert aan nare dingen die eerder zijn gebeurd, hoe vaak voel je dan een reactie in je lichaam?",
  down: "Hoe vaak voel je je somber en heb je weinig energie?",
  sleepDifficulty:
    "Hoe vaak heb je moeite met in slaap vallen en/of doorslapen?",
  irritated: "Hoe vaak voel je je geïrriteerd?",
  niceActivities: "Hoe vaak heb je plezier in activiteiten of gesprekken?",
  concentration:
    "Hoe vaak kan je je concentreren op dingen die je alleen doet?",
  avoidContact: "Hoe vaak sluit je jezelf af van anderen?",
  compentency1:
    "Hoe vaak ben je in staat om nuttige nieuwe vaardigheden aan te leren?",
  compentency2: "Hoe vaak krijg je de kans om je vaardigheden te laten zien?",
  compentency3:
    "Hoe vaak dank je dat je in staat bent om verschillende taken en uitdagingen goed aan te pakken?",
  autonomy1: "Hoe vaak voel je je vrij om je mening en ideeën te uiten?",
  autonomy2: "Hoe vaak kan je jezelf zijn in het AZC?",
  autonomy3:
    "Hoe vaak heb je de mogelijkheid om zelf te bepalen wat je doet in je dagelijks leven?",
  violenceNeverAcceptable: "Is geweld acceptabel?",
  violAccept: "Kan het in sommige situaties goed zijn om geweld te gebruiken?",
  selfDef:
    "Is het oké om iemand te slaan als diegene jou eerst heeft geslagen?",
  drugUse:
    "Hoe vaak gebruik je drugs om je beter te voelen als dingen moeilijk zijn?",
  sleepMeds:
    "Hoe vaak slaap je of neem je medicijnen om met problemen in je leven om te gaan?",
  alcohol:
    "Hoe vaak drink je alcohol om je beter te voelen als dingen moeilijk zijn?",
  coerceOthers:
    "Hoe vaak probeer je anderen te overtuigen of te dwingen om te doen wat jij wilt?",
  myWay: "Hoe vaak wil je dat alles op jouw manier gaat?",
  followMe: "Hoe vaak vind je dat anderen moeten doen wat jij zegt?",
  rude: "Hoe vaak ben je onbeleefd tegen anderen?",
  forgiving: "Hoe vaak vergeef je mensen?",
  kind: "Hoe vaak ben je attent en vriendelijk tegen iedereen?",
  hostile1: "Hoe vaak kun je je boosheid goed beheersen?",
  impulsive: "Hoe vaak zeggen mensen dat je impulsief bent?",
  angry: "Hoe vaak laat je je meeslepen door je boosheid?",
  freqPhysViol:
    "Hoe vaak heb je met opzet geweld gebruikt tegen mensen of spullen?",
  threatening:
    "Hoe vaak heb je dreigende lichaamstaal of gebaren gebruikt om anderen bang te maken, te beledigen, buiten te sluiten of te negeren?",
  insulting:
    "Hoe vaak heb je met opzet beledigende of grove taal gebruikt om anderen pijn te doen, bang te maken of te vernederen?",
  deceptive:
    "Hoe vaak heb je valse informatie, bedrog, manipulatie of emotionele chantage gebruikt om je zin te krijgen of er zelf beter van te worden?",
};

// Define a mapping between original headers and standardized keys
export const headerMapping: { [key: string]: keyof UserEntry } = {
  "respondent id": "respondentId",
  "start datum": "startDate",
  "eind datum": "endDate",
  "start tijd": "startTime",
  "welke unieke code heb je ontvangen van jouw b": "uniqueCode",
  "welke unieke code heb je gegeven aan jouw bew": "uniqueCode",
  status: "status",
  geslacht: "gender",
  ...Object.entries(questionnaire).reduce((acc, [key, value]) => {
    acc[(value as string).toLowerCase().substring(0, 45)] =
      key as keyof UserEntry;
    return acc;
  }, {} as Record<string, string>),
  ...Object.entries(interviewQuestionnaire).reduce((acc, [key, value]) => {
    acc[(value as string).toLowerCase().substring(0, 45)] =
      key as keyof UserEntry;
    return acc;
  }, {} as Record<string, string>),
};
