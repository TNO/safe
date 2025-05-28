import m, { FactoryComponent } from "mithril";
import { categories, UserEntry, userEntryToScore } from "../../services";
import { Collapsible, InputCheckbox } from "mithril-materialized";
import { EmojiScoreComponent } from "../ui/emoji";
import physAgres from "../../assets/icons/noun-punch-3883530.svg";
import bodyLang from "../../assets/icons/noun-verbal-bullying-7108758.svg";
import lowHangingFruit from "../../assets/icons/low-hanging-fruit-colored.svg";
import { Feedback } from "./feedback";
import { TabPills } from "./tab-pills";

type AgressionAttr = {
  score: number;
  moreIsBetter?: boolean;
  showScore?: boolean;
  fillColor?: string;
};

export const PhysicalAgression: FactoryComponent<AgressionAttr> = () => {
  return {
    view: ({
      attrs: { score, fillColor, showScore = false, moreIsBetter },
    }) => {
      return m(
        ".flex-item.tooltip",
        {
          style: {
            position: "relative",
            width: "130px",
            height: "130px",
          },
        },

        m("img.unselectable", {
          src: physAgres,
          alt: "Fysieke agressie",
          width: 130,
          height: 130,
          style: { opacity: 0.15 },
        }),
        m(EmojiScoreComponent, {
          value: score,
          moreIsBetter,
          size: 70,
          fillColor,
          style: {
            position: "absolute",
            bottom: "10px",
            left: "55px",
            opacity: 0.9,
          },
        }),
        m(
          "span.tooltiptext",
          m.trust(
            `Fysieke agressie${
              showScore
                ? `<br>(-5 < ${moreIsBetter ? "" : "-"}${score.toFixed(
                    1
                  )} < +5)`
                : ""
            }`
          )
        )
      );
    },
  };
};

export const NonPhysicalAgression: FactoryComponent<AgressionAttr> = () => {
  return {
    view: ({
      attrs: { score, fillColor, showScore = false, moreIsBetter },
    }) => {
      return m(
        ".flex-item.tooltip",
        {
          style: {
            position: "relative",
            width: "130px",
            height: "130px",
          },
        },

        m("img", {
          src: bodyLang,
          alt: "Niet fysieke agressie",
          width: 130,
          height: 130,
          style: { opacity: 0.15 },
        }),
        m(EmojiScoreComponent, {
          value: score,
          moreIsBetter,
          size: 70,
          fillColor,
          style: {
            position: "absolute",
            bottom: "10px",
            left: "42px",
            opacity: 0.9,
          },
        }),
        m(
          "span.tooltiptext",
          m.trust(
            `Niet-fysieke agressie${
              showScore
                ? `<br>(-5 < ${moreIsBetter ? "" : "-"}${score.toFixed(
                    1
                  )} < +5)`
                : ""
            }`
          )
        )
      );
    },
  };
};

export const Dashboard: FactoryComponent<{
  data: UserEntry[];
  showAllFactors?: boolean;
  update: (state: { showAllFactors: boolean }) => void;
}> = () => {
  return {
    view: ({ attrs: { data, showAllFactors = false, update } }) => {
      const scores = data.map(userEntryToScore);
      const scoreItems = scores.reduce(
        (acc, s) => {
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
              meaning,
              honesty,
              connection,
              appreciation,
              agressionStaffsView,
              agressionResidentsView,
              ptsd,
              victim,
              depression,
              kindness,
            ].map(({ svg, score, ...params }) => ({
              ...params,
              svgIcon: svg,
              score1: score[0],
              score2: score[1],
            }))
          );
          return acc;
        },
        [] as Array<{
          title: string;
          svgIcon: string;
          score1: number;
          score2: number;
          colors?: [string, string];
          desc?: [string, string];
          activity?: [string, string];
          moreIsBetter?: boolean;
          category?: string;
          notAnsweredPerc?: number;
          questions: string[];
          missingData: string;
        }>
      );

      // TODO Remove in production
      const showScore = false; //true;

      return (
        scoreItems.length > 0 &&
        m(".row", [
          m(InputCheckbox, {
            label: "Toon alle factoren",
            className: "right",
            checked: showAllFactors,
            onchange: (v) => {
              update({ showAllFactors: v });
            },
          }),

          m(Collapsible, {
            accordion: true,
            className: "col s12",
            items: scoreItems
              .filter(
                (i) =>
                  showAllFactors ||
                  Math.abs(i.score1) >= 1 ||
                  Math.abs(i.score2) >= 1
              )
              .map(
                ({
                  title,
                  svgIcon,
                  score1,
                  score2,
                  colors,
                  desc,
                  activity,
                  moreIsBetter,
                  category,
                  notAnsweredPerc = 0,
                  questions,
                  missingData,
                }) => {
                  const isPhysical =
                    (moreIsBetter && score1 > score2) ||
                    (!moreIsBetter && score1 < score2);
                  const explanation =
                    notAnsweredPerc === 100
                      ? "Geen enkele vraag werd beantwoord, dus probeer met de bewoner te bespreken wat de reden hiervan is."
                      : desc
                      ? desc[isPhysical ? 0 : 1] || desc[isPhysical ? 1 : 0]
                      : "";
                  const activityDesc =
                    notAnsweredPerc === 100
                      ? undefined
                      : activity
                      ? activity[isPhysical ? 0 : 1] ||
                        activity[isPhysical ? 1 : 0]
                      : "";
                  const partialData = data.map((d) =>
                    Object.entries(d).reduce((acc, [key, value]) => {
                      if (questions.includes(key) || key === "startDate") {
                        acc[key as keyof UserEntry] = value as any;
                      }
                      return acc;
                    }, {} as UserEntry)
                  );
                  // console.log(partialData);

                  return {
                    header: m(".flex-container", [
                      [
                        m(
                          ".flex-item",
                          // Title
                          m(
                            "span.unselectable",
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
                          notAnsweredPerc > 20 &&
                            m(
                              "span.tooltip",
                              m(
                                "span.tooltiptext",
                                notAnsweredPerc === 100
                                  ? "Geen enkele vraag werd beantwoord!"
                                  : `${notAnsweredPerc}% van de vragen niet beantwoord!`
                              ),
                              m(
                                "i.material-icons",
                                {
                                  style: {
                                    color: "red",
                                    verticalAlign: "middle",
                                    marginBottom: "-6px",
                                  },
                                },
                                "warning"
                              )
                            ),
                          m(
                            "ul.list-inline",
                            m(
                              "li",
                              m("img.unselectable", {
                                style:
                                  "display: block; width: 90px; height: 90px; vertical-align: middle;",
                                src: svgIcon,
                              })
                            ),
                            category === categories.needs &&
                              m(
                                "li",
                                m(
                                  ".flex-item",
                                  m("img.unselectable", {
                                    style:
                                      "display: block; width: 90px; height: 90px; vertical-align: middle;",
                                    src: lowHangingFruit,
                                  })
                                )
                              )
                          ),
                          category &&
                            m(
                              "span",
                              {
                                style: {
                                  fontSize: "10pt",
                                  fontStyle: "italic",
                                },
                              },
                              `Categorie: ${category}`
                            )
                        ),

                        category === categories.agression
                          ? [
                              m(PhysicalAgression, {
                                score: score1,
                                moreIsBetter,
                                showScore,
                                fillColor: colors ? colors[0] : undefined,
                              }),
                              m(NonPhysicalAgression, {
                                score: score2,
                                moreIsBetter,
                                showScore,
                                fillColor: colors ? colors[1] : undefined,
                              }),
                            ]
                          : isPhysical
                          ? m(PhysicalAgression, {
                              score: score1,
                              moreIsBetter,
                              showScore,
                              fillColor: colors ? colors[0] : undefined,
                            })
                          : m(NonPhysicalAgression, {
                              score: score2,
                              moreIsBetter,
                              showScore,
                              fillColor: colors ? colors[1] : undefined,
                            }),
                      ],
                    ]),
                    body:
                      category === categories.agression
                        ? m("div", [
                            m(TabPills, {
                              tabs: [
                                {
                                  title: [
                                    m("img.unselectable", {
                                      src: physAgres,
                                      alt: "Fysieke agressie",
                                      width: 48,
                                      height: 48,
                                    }),
                                    "Fysieke agressie",
                                  ],
                                  content: m(Feedback, {
                                    notAnsweredPerc,
                                    missingData,
                                    explanation: desc ? desc[0] : "",
                                    activityDesc: activity ? activity[0] : "",
                                    partialData,
                                  }),
                                },
                                {
                                  title: [
                                    m("img", {
                                      src: bodyLang,
                                      alt: "Niet fysieke agressie",
                                      width: 48,
                                      height: 48,
                                    }),
                                    "Niet-fysieke agressie",
                                  ],
                                  content: m(Feedback, {
                                    notAnsweredPerc,
                                    missingData,
                                    explanation: desc ? desc[1] : "",
                                    activityDesc: activity ? activity[1] : "",
                                    partialData,
                                  }),
                                },
                              ],
                            }),
                          ])
                        : m(Feedback, {
                            notAnsweredPerc,
                            missingData,
                            explanation,
                            activityDesc,
                            partialData,
                          }),
                  };
                }
              ),
          }),
        ])
      );
    },
  };
};
