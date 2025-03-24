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

export const HomePage: MeiosisComponent = () => {
  let userIdOptions: IInputOption<string | number>[];
  let selectedCode: string | number;

  return {
    oninit: ({
      attrs: {
        state: {
          model: { data = [] },
        },
        actions: { setPage },
      },
    }) => {
      userIdOptions = data.map((d) => ({
        id: d.uniqueCode,
        label: `${d.uniqueCode} (${d.status})`,
      }));
      setPage(Pages.HOME);
    },
    view: ({ attrs: { state } }) => {
      const { model = EmptyDataModel() } = state;
      const { data = [] } = model;
      data.sort((a, b) => (a.faseId > b.faseId ? -1 : 1));

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
                m(Select, {
                  label: "Selecteer unieke gebruikerscode",
                  options: userIdOptions,
                  placeholder: "Kies een code",
                  className: "col s12 m4 l3 offset-m8 offset-l9",
                  onchange: (v) => {
                    selectedCode = v[0];
                  },
                }),
                m(Tabs, {
                  className: "col s12",
                  tabs: [
                    {
                      id: "dashboard",
                      title: "Dashboard",
                      vnode: m(Questionnaire, {
                        data: data.filter((d) => d.uniqueCode == selectedCode),
                      }),
                    },
                    {
                      id: "questions",
                      title: "Vragenlijst",
                      vnode: m(Questionnaire, {
                        data: data.filter((d) => d.uniqueCode == selectedCode),
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
