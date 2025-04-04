import { messages } from ".";

export const messagesNL: typeof messages = {
  HOME: { TITLE: "home", ROUTE: "/" },
  ABOUT: { TITLE: "over de app", ROUTE: "/over" },
  SETTINGS: { TITLE: "Instellingen", ROUTE: "/instellingen" },
  LANDING: { TITLE: "Introductie", ROUTE: "/" },
  USER: "Gebruiker",
  EDITOR: "Editor",
  ADMIN: "Administrator",
  CANCEL: "Afbreken",
  DELETE: "Verwijderen",
  YES: "Ja",
  NO: "Nee",
  OK: "Ok",
  NAME: "Naam",
  DESCRIPTION: "Omschrijving",
  DELETE_ITEM: {
    TITLE: "Verwijder {item}",
    DESCRIPTION:
      "Weet u zeker dat u de {item} wilt verwijderen? Dit kan niet ongedaan gemaakt worden.",
  },
  SAVE_BUTTON: {
    LABEL: "Opslaan",
    TOOLTIP: "Sla aanpassingen op",
  },
  SEARCH: "Zoek...",
  SEARCH_TOOLTIP: "Type / om te zoeken",
  LANGUAGE: "Taal",
  CLEAR: "Wis data",
  UPLOAD: "Lees CSV",
  DOWNLOAD: "Download CSV",
  ROLE: "Rol",
  MODEL: "Model",
  TITLE: "Titel",
  AUTHORS: "Auteurs",
  LINK: "Link",
  PERMALINK: "Permalink",
  PERMALINK_MSG:
    "Een permanente link naar dit model werd gekopieerd naar het clipboard.",
  TYPE: "Type",
  HITS: "Hits",
  NO_DATA_MSG: {
    TITLE: "Geen data gevonden:",
    CONTENT: "Lees eerst de CSV data in via het menu.",
  },
};
