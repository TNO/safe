import m, { FactoryComponent } from "mithril";
import { UserEntry, userEntryToScore } from "../../services";
import { Collapsible, InputCheckbox } from "mithril-materialized";
import physAgres from "../../assets/icons/physical_agression.svg";
import bodyLang from "../../assets/icons/noun-angry-expression-7476146.svg";
import { EmojiScoreComponent } from "../ui/emoji";
import { SlimdownView } from "mithril-ui-form";

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
          `Fysieke agressie ${showScore ? `(${score.toFixed(1)})` : ""}`
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
          `Niet-fysieke agressie ${showScore ? `(${score.toFixed(1)})` : ""}`
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
      console.table({ scores });
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
            agressionStaffsView,
            agressionResidentsView,
            ptsd,
            victim,
            depression,
            meaning,
            honesty,
            connection,
            appreciation,
            kindness,
          ].map(({ svg, score, ...params }) => ({
            ...params,
            svgIcon: svg,
            score1: score[0],
            score2: score[1],
          }))
        );
        return acc;
      }, [] as Array<{ title: string; svgIcon: string; score1: number; score2: number; colors?: [string, string]; desc?: [string, string]; activity?: [string, string]; moreIsBetter?: boolean; category?: string; notAnsweredPerc?: number }>);

      // TODO Remove in production
      const showScore = true; //true;

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
                }) => {
                  const explanation =
                    notAnsweredPerc === 100
                      ? "Geen enkele vraag werd beantwoord, dus probeer met de bewoner te bespreken wat de reden hiervan is."
                      : desc?.filter(Boolean).join("\n\n<hr/>\n");
                  const activityDesc =
                    notAnsweredPerc === 100
                      ? undefined
                      : activity?.filter(Boolean).join("\n\n<hr/>\n");
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
                          m("img.unselectable", {
                            style:
                              "display: block; width: 90px; height: 90px; vertical-align: middle;",
                            src: svgIcon,
                          }),
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
                      ],
                      // ),
                    ]),
                    body: m(
                      ".row",
                      m(
                        ".col.s12.m6",
                        explanation &&
                          m(SlimdownView, {
                            md: "### Wat betekent dit?\n\n" + explanation,
                          })
                      ),
                      m(
                        ".col.s12.m6",
                        activityDesc &&
                          m(SlimdownView, {
                            md: "### Wat kan ik doen?\n\n" + activityDesc,
                          })
                      )
                    ),
                  };
                }
              ),
          }),
        ])
      );
    },
  };
};
