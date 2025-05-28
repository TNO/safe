import m, { FactoryComponent } from "mithril";
import { SlimdownView } from "mithril-ui-form";
import { Questionnaire } from "../home-page";
import { UserEntry } from "../../services";

export const Feedback: FactoryComponent<{
  notAnsweredPerc: number;
  missingData?: string;
  explanation?: string;
  activityDesc?: string;
  partialData: UserEntry[];
}> = () => {
  return {
    view: ({
      attrs: {
        notAnsweredPerc = 0,
        missingData,
        explanation,
        activityDesc,
        partialData,
      },
    }) => {
      return m(
        ".row",
        notAnsweredPerc !== 0 &&
          m(".col.s12", m(SlimdownView, { md: missingData })),
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
        ),
        m(
          ".col.s12",
          m(Questionnaire, {
            data: partialData,
            hideMissingQuestions: true,
          })
        )
      );
    },
  };
};
