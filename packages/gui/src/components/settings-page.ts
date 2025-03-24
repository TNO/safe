import m from "mithril";
import { Pages } from "../models";
import { MeiosisComponent } from "../services";

export const SettingsPage: MeiosisComponent = () => {
  return {
    oninit: ({
      attrs: {
        actions: { setPage },
      },
    }) => {
      setPage(Pages.SETTINGS);
    },
    view: () => {
      return m("#settings-page.settings.page", m(".row", []));
    },
  };
};
