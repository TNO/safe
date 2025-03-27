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
  userEntryToScore,
} from "../services";
import {
  Collapsible,
  IInputOption,
  InputCheckbox,
  Select,
  Tabs,
} from "mithril-materialized";
import fist from "../assets/icons/noun-fist-hand-5029035.svg";
import middleFinger from "../assets/icons/noun-middle-finger-5029034.svg";
import { EmojiScoreComponent } from "./ui/emoji";

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

export const PhysicalAgression: FactoryComponent<{ score: number }> = () => {
  return {
    view: ({ attrs: { score } }) => {
      return m(
        ".flex-item",
        {
          style: {
            position: "relative",
            width: "130px",
            height: "130px",
          },
        },

        m("img", {
          src: fist,
          alt: "Fysieke agressie",
          width: 130,
          height: 130,
          style: { opacity: 0.08 },
        }),
        m(EmojiScoreComponent, {
          value: score,
          size: 70,
          style: {
            position: "absolute",
            bottom: "10px",
            left: "42px",
            translate: "rotate(45deg)",
          },
        })
      );
    },
  };
};

export const NonPhysicalAgression: FactoryComponent<{ score: number }> = () => {
  return {
    view: ({ attrs: { score } }) => {
      return m(
        ".flex-item",
        {
          style: {
            position: "relative",
            width: "130px",
            height: "130px",
          },
        },

        m("img", {
          src: middleFinger,
          alt: "Niet fysieke agressie",
          width: 130,
          height: 130,
          style: { opacity: 0.08 },
        }),
        m(EmojiScoreComponent, {
          value: score,
          size: 70,
          style: {
            position: "absolute",
            bottom: "10px",
            left: "42px",
            translate: "rotate(45deg)",
          },
        })
      );
    },
  };
};

export const Dashboard: FactoryComponent<{ data: UserEntry[] }> = () => {
  let showAllItems = false;

  return {
    view: ({ attrs: { data } }) => {
      const scores = data.map(userEntryToScore);
      console.log(scores);
      const scoreItems = scores.reduce((acc, s) => {
        const {
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
        } = s;
        acc.push(
          ...[
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
          ].map(({ title, svg, score }) => ({
            title,
            svgIcon: svg,
            score1: score[0],
            score2: score[1],
            description: "",
          }))
        );
        return acc;
      }, [] as Array<{ title: string; svgIcon: string; score1: number; score2: number; description: string }>);
      console.log(scoreItems);

      return m(".row", [
        m(InputCheckbox, {
          label: "Toon alle aspecten",
          className: "right",
          checked: showAllItems,
          onchange: (v) => (showAllItems = v),
        }),
        scoreItems.length > 0 &&
          m(Collapsible, {
            accordion: true,
            className: "col s12",
            items: scoreItems
              .filter(
                (i) =>
                  showAllItems ||
                  Math.abs(i.score1) >= 1 ||
                  Math.abs(i.score2) >= 1
              )
              .map(({ title, svgIcon, score1, score2, description }) => {
                return {
                  header: m(".flex-container", [
                    // Likert Scales (Traffic Lights) in header
                    // m(
                    //   ".scores",
                    //   {
                    //     // style: "display: flex; gap: 20px; align-items: center;",
                    //   },
                    [
                      m(
                        ".flex-item",
                        // Title
                        m(
                          "span",
                          {
                            style: {
                              fontSize: "24px",
                              fontWeight: "bold",
                              verticalAlign: "top",
                              textAlign: "center",
                            },
                          },
                          title
                        ),
                        m("img", {
                          style:
                            "display: block; width: 70px; height: 70px; vertical-align: middle;",
                          src: svgIcon,
                        })
                      ),

                      m(PhysicalAgression, { score: score1 }),
                      m(NonPhysicalAgression, { score: score2 }),
                    ],
                    // ),
                  ]),
                  body: m(
                    "p",
                    {
                      style:
                        "font-size: 14px; padding: 15px; line-height: 1.5;",
                    },
                    description
                  ),
                };
              }),
          }),
      ]);
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

      const filteredData = data.filter((d) => d.uniqueCode == selectedCode);

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
                      vnode: m(Dashboard, {
                        data: filteredData,
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
