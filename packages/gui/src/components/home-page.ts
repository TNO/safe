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
import { IInputOption, Select, Tabs } from "mithril-materialized";
import { Dashboard } from "./ui/dashboard";
const silenceIcon =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwMCIgaGVpZ2h0PSIxNjAwIiB2aWV3Qm94PSIwIDAgMTIwMCAxMjAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik02MDAgMEMyNjkuMTUgMCAwIDI2OS4xNSAwIDYwMGMwIDE1NCA1OC44MDEgMzAwLjY1IDE2NS42IDQxMi45NSA2LjIgNi40NSAxNS4zMDEgOS4yNSAyMy45NDkgNy4wNSA4LjctMi4xIDE1LjYwMi04LjY0OCAxOC4xMDItMTcuMjUgMjAuNzUtNzAuNDQ4IDg3LjI1LTEyNi4xIDE3My42LTE0NS4yIDEyLjI1LTIuNjk4IDIwLjYwMi0xNC4xMDEgMTkuNS0yNi42NDctLjA1NS0uMzUyLS43MDMtNS41MDQtLjc1NC01LjkwMyAwLTI4LjQ0OSAxNi4xMDItNTQuMTAyIDQyLTY2Ljg5OCA2LjM5OC0zLjE0OCAxMS4xNDgtOC45NDkgMTMuMDUxLTE1LjhDNDY5Ljg1IDY4Ny45NDggNTE5LjE5NiA2NTAgNTc0Ljk5OCA2NTBjNTIuMzUyIDAgOTkuNDUgMzMuNSAxMTcuMjUgODMuMzk4IDMuNSA5Ljk1IDEzIDE2LjYwMiAyMy41NTEgMTYuNjAyaDkuMmM0MS4zNTEgMCA3NSAzMy42NDggNzUgNzVzLTMzLjY0OSA3NS03NSA3NWMtMTMuODAyIDAtMjUgMTEuMi0yNSAyNXYxMjVjMCAzNi41LTEyLjA1MiA3MS4yNS0zNS44NTMgMTAzLjI1LTYgOC4xNDktNi42MDEgMTkuMDUxLTEuMzUxIDI3Ljc1YTI0Ljk2MSAyNC45NjEgMCAwMDIxLjQ0OSAxMi4yYzEuMTk5IDAgMi40NDktLjEwMiAzLjY0OC0uMjUgMjkxLjk2LTQzIDUxMi4xMS0yOTcuOSA1MTIuMTEtNTkyLjk1IDAtMzMwLjg1LTI2OS4xNS02MDAtNjAwLTYwMHpNMzc1IDUwMGMtNDEuMzUyIDAtNzUtMzMuNjQ4LTc1LTc1czMzLjY0OC03NSA3NS03NSA3NSAzMy42NDggNzUgNzUtMzMuNjQ4IDc1LTc1IDc1em00NTAgMGMtNDEuMzUyIDAtNzUtMzMuNjQ4LTc1LTc1czMzLjY0OC03NSA3NS03NSA3NSAzMy42NDggNzUgNzUtMzMuNjQ4IDc1LTc1IDc1eiIvPjxwYXRoIGQ9Ik03MjUgODUwSDYyNWMtMTMuODAxIDAtMjUtMTEuMTk5LTI1LTI1czExLjE5OS0yNSAyNS0yNWgxMDBjMTMuODAxIDAgMjUgMTEuMTk5IDI1IDI1cy0xMS4xOTkgMjUtMjUgMjV6bS0yMDAgMGgtNTBjLTEzLjgwMSAwLTI1LTExLjE5OS0yNS0yNXMxMS4xOTktMjUgMjUtMjVoNTBjMTMuODAxIDAgMjUgMTEuMTk5IDI1IDI1cy0xMS4xOTkgMjUtMjUgMjV6Ii8+PHBhdGggZD0iTTU3NSA3MDBjLTQxLjM1MiAwLTc1IDMzLjY0OC03NSA3NXYxMjUuOTVjLTIyLjg1Mi0uOC00OS42MDItLjk1LTUwLS45NS0xMTAuMyAwLTIwMCA2Ny4zMDItMjAwIDE1MHM4OS42OTkgMTUwIDIwMCAxNTAgMjAwLTY3LjMgMjAwLTE1MFY3NzVjMC00MS4zNTEtMzMuNjQ4LTc1LTc1LTc1eiIvPjwvc3ZnPg==";

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
        Object.entries(questionnaire).map(([key, question]) =>
          m(
            "tr",
            m("td", question),
            data.map((d) =>
              m(
                "td",
                likertScaleProp.includes(key)
                  ? likertToText(d[key] as LikertScale)
                  : d[key] ?? ""
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
          answeredCnt,
          declinedCnt,
          gender,
          age,
          azcMonths,
        },
      },
    }) => {
      return m(
        "ul.list-inline.stats",
        m(
          "li.tooltip",
          m(
            "i.material-icons",
            gender === "Man"
              ? "man"
              : gender === "Vrouw"
              ? "woman"
              : "question_mark"
          ),
          `${age} jaar`,
          m(
            "span.tooltiptext",
            `Respondent is een ${
              gender ? gender.toLowerCase() : "?"
            } van ${age} jaar.`
          )
        ),
        azcMonths &&
          m(
            "li.tooltip",
            m("i.material-icons", "house"),
            `${azcMonths} maanden`,
            m(
              "span.tooltiptext",
              `Respondent woont al ${azcMonths} maanden in een AZC.`
            )
          ),
        m(
          "li.tooltip",
          m("i.material-icons", "check"),
          `${Math.round((answeredCnt * 100) / questionCnt)}%`,
          m(
            "span.tooltiptext",
            `Respondent heeft ${
              answeredCnt === questionCnt
                ? "alle"
                : `${answeredCnt} van de ${questionCnt}`
            } vragen beantwoord.`
          )
        ),
        declinedCnt > 0 &&
          m(
            "li.tooltip",
            m("img", {
              width: "20px",
              height: "20px",
              alt: 'Aantal vragen beantwoord met "Zeg ik liever niet/"',
              src: silenceIcon,
            }),
            `${declinedCnt === 1 ? "1 vraag" : `${declinedCnt} vragen`}`,
            m(
              "span.tooltiptext",
              `Respondent heeft ${
                declinedCnt === 1 ? "1 vraag" : `${declinedCnt} vragen`
              } beantwoordt met "Zeg ik liever niet".`
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
            .sort((a, b) => (a.date > b.date ? -1 : 1))
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
                }),
                selectedId &&
                  m(Tabs, {
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
                  }),
              ]
        ),
      ];
    },
  };
};
