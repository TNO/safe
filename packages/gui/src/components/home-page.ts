import m, { FactoryComponent } from "mithril";
import { EmptyDataModel, Pages } from "../models";
import {
  LikertScale,
  likertScaleProp,
  likertToText,
  MeiosisComponent,
  questionnaire,
  t,
  UserEntry,
} from "../services";
import { ISelectOptions, Select, Tabs } from "mithril-materialized";
import { Dashboard } from "./ui/dashboard";
import silenceIcon from "../assets/icons/noun-silence-237457.svg";
import otherRemarksIcon from "../assets/icons/noun-chat-985169.svg";
import { interviewQuestionnaire, RespondentType } from "../services/csv/index";

export const Questionnaire: FactoryComponent<{ data: UserEntry[] }> = () => {
  return {
    view: ({ attrs: { data = [] } }) => {
      if (data.length === 0) return;
      return m(
        "table",
        m(
          "tr",
          m("th", `Vraag`),
          data.map((d) => m("th", `${d.endDate || d.startDate} (${d.status})`))
        ),
        Object.entries(
          data[0].respondentType === RespondentType.INTERVIEWER
            ? interviewQuestionnaire
            : questionnaire
        ).map(([key, question]) =>
          m(
            "tr",
            m("td", question),
            data.map((d) =>
              m(
                "td",
                likertScaleProp.includes(key)
                  ? likertToText(d[key as keyof UserEntry] as LikertScale)
                  : d[key as keyof UserEntry] ?? ""
              )
            )
          )
        )
      );
    },
  };
};

export const Stats: FactoryComponent<{ data: UserEntry }> = () => {
  return {
    view: ({
      attrs: {
        data: {
          questionCnt = 1,
          answeredCnt = 0,
          declinedCnt = 0,
          gender = "",
          age = 0,
          azcMonths = 0,
          recOther,
        },
      },
    }) => {
      return m(
        "ul.list-inline.stats",
        m(
          "li.tooltip",
          m(
            "span.tooltiptext",
            `Respondent is een ${
              gender ? gender.toLowerCase() : "?"
            } van ${age} jaar.`
          ),
          m(
            "span.item-content",
            m(
              "i.material-icons",
              gender === "Man"
                ? "man"
                : gender === "Vrouw"
                ? "woman"
                : "question_mark"
            ),
            m("span", `${age} jaar`)
          )
        ),
        azcMonths &&
          m(
            "li.tooltip",
            m(
              "span.tooltiptext",
              `Respondent woont al ${azcMonths} maanden in een AZC.`
            ),
            m(
              "span.item-content",
              m("i.material-icons", "house"),
              `${azcMonths} maanden`
            )
          ),
        m(
          "li.tooltip",
          m(
            "span.tooltiptext",
            `Respondent heeft ${
              answeredCnt === questionCnt
                ? "alle"
                : `${answeredCnt} van de ${questionCnt}`
            } vragen ingevuld.`
          ),
          m(
            "span.item-content",
            m("i.material-icons", "check"),
            `${Math.round((answeredCnt * 100) / questionCnt)}%`
          )
        ),
        declinedCnt > 0 &&
          m(
            "li.tooltip",
            m(
              "span.tooltiptext",
              `Respondent heeft ${
                declinedCnt === 1 ? "1 vraag" : `${declinedCnt} vragen`
              } beantwoord met "Zeg ik liever niet".`
            ),
            m(
              "span.item-content",
              m("img", {
                width: "20px",
                height: "20px",
                alt: 'Aantal vragen beantwoord met "Zeg ik liever niet/"',
                src: silenceIcon,
              }),
              `${declinedCnt === 1 ? "1 vraag" : `${declinedCnt} vragen`}`
            )
          ),
        recOther &&
          m(
            "li.tooltip",
            m("span.tooltiptext", `Bewoner: “${recOther}”.`),
            m(
              "span.item-content",
              m("img", {
                width: "20px",
                height: "20px",
                alt: "Open vraag: Wil je wat kwijt?",
                src: otherRemarksIcon,
              }),
              m("span.truncate", `Bewoner: “${recOther}”.`)
            )
          )
      );
    },
  };
};

export const HomePage: MeiosisComponent = () => {
  return {
    oninit: ({
      attrs: {
        actions: { setPage },
      },
    }) => {
      setPage(Pages.HOME);
    },
    view: ({ attrs: { state, actions } }) => {
      const { model = EmptyDataModel(), selectedId, showAllFactors } = state;
      const { data = [] } = model;
      // data.sort((a, b) => (a.date > b.date ? -1 : 1));
      const userIdOptions = data.map((d) => ({
        id: d.uniqueCode,
        label: `${d.uniqueCode} (${d.status})`,
      }));

      const filteredData = selectedId
        ? data
            .filter((d) => d.uniqueCode == selectedId)
            .sort((a, b) => (a.date! > b.date! ? -1 : 1))
        : [];

      return [
        m(
          "#home-page.row.home.page",
          data.length === 0
            ? [
                m(
                  ".center.bold-text.large",
                  { style: { margin: "20% 0", fontSize: "3em" } },
                  t("NO_DATA_MSG", "TITLE"),
                  m("br"),
                  t("NO_DATA_MSG", "CONTENT")
                ),
              ]
            : [
                m(
                  ".col.s12.m8.l9",
                  selectedId &&
                    m(Stats, { data: filteredData[filteredData.length - 1] })
                ),
                m(Select, {
                  label: "Selecteer unieke gebruikerscode",
                  options: userIdOptions,
                  initialValue: selectedId,
                  placeholder: "Kies een code",
                  className: "col s12 m4 l3",
                  onchange: (v) => {
                    actions.update({ selectedId: v[0] });
                  },
                } as ISelectOptions<string | number>),
                selectedId
                  ? m(Tabs, {
                      className: "col s12",
                      tabs: [
                        {
                          id: "dashboard",
                          title: "Dashboard",
                          vnode: m(Dashboard, {
                            data: filteredData,
                            showAllFactors,
                            update: actions.update,
                          }),
                        },
                        {
                          id: "questions",
                          title: "Vragenlijst",
                          vnode: m(Questionnaire, {
                            data: filteredData,
                          }),
                        },
                      ],
                    })
                  : m(
                      ".col.s12.center.bold-text.large",
                      { style: { margin: "20% 0", fontSize: "3em" } },
                      "Selecteer een unieke gebruikerscode om de dashboard en vragenlijst te bekijken."
                    ),
              ]
        ),
      ];
    },
  };
};
