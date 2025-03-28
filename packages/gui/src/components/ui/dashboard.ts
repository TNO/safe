import m, { FactoryComponent } from "mithril";
import { UserEntry, userEntryToScore } from "../../services";
import { Collapsible, InputCheckbox } from "mithril-materialized";
import fist from "../../assets/icons/noun-fist-hand-5029035.svg";
import middleFinger from "../../assets/icons/noun-middle-finger-5029034.svg";
import { EmojiScoreComponent } from "../ui/emoji";
import { SlimdownView } from "mithril-ui-form";

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

export const Dashboard: FactoryComponent<{
  data: UserEntry[];
  showAllFactors?: boolean;
  update: (state: { showAllFactors: boolean }) => void;
}> = () => {
  return {
    view: ({ attrs: { data, showAllFactors = false, update } }) => {
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
          ].map(({ title, svg, score, desc, activity }) => ({
            title,
            svgIcon: svg,
            score1: score[0],
            score2: score[1],
            description: desc
              ? desc[0] !== desc[1]
                ? desc.join(" ")
                : desc[0]
              : "",
            activity: activity
              ? activity[0] !== activity[1]
                ? activity.join(" ")
                : activity[0]
              : "",
          }))
        );
        return acc;
      }, [] as Array<{ title: string; svgIcon: string; score1: number; score2: number; description: string; activity: string }>);
      // console.log(scoreItems);

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
                ({ title, svgIcon, score1, score2, description, activity }) => {
                  return {
                    header: m(".flex-container", [
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
                      ".row",
                      m(
                        ".col.s12.m6",
                        description &&
                          m(SlimdownView, {
                            md: "### Wat betekent dit?\n\n" + description,
                          })
                      ),
                      m(
                        ".col.s12.m6",
                        activity &&
                          m(SlimdownView, {
                            md: "### Wat kan ik doen?\n\n" + activity,
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
