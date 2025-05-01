import { meiosisSetup } from "meiosis-setup";
import { MeiosisCell, MeiosisConfig, Service } from "meiosis-setup/types";
import m, { FactoryComponent } from "mithril";
import { routingSvc } from ".";
import { DataModel, Pages, Settings } from "../models";
import { User, UserRole } from "./login-service";
import { scrollToTop } from "../utils";

// const settingsSvc = restServiceFactory<Settings>('settings');
const MODEL_KEY = "COA_SAFE_MODEL";
const USER_ROLE = "USER_ROLE";
export const APP_TITLE = "SAFE";
export const APP_TITLE_SHORT = "SAFE";

export interface State {
  page: Pages;
  model: DataModel;
  loggedInUser?: User;
  role: UserRole;
  settings: Settings;
  searchFilter: string;
  searchResults: any[];
  selectedId?: string | number;
  showAllFactors?: boolean;
}

export interface Actions {
  setPage: (page: Pages, info?: string) => void;
  changePage: (
    page: Pages,
    params?: Record<string, string | number | undefined>,
    query?: Record<string, string | number | undefined>
  ) => void;
  saveModel: (ds: DataModel) => void;
  saveSettings: (settings: Settings) => Promise<void>;
  setRole: (role: UserRole) => void;
  setSearchFilter: (searchFilter?: string) => Promise<void>;
  login: () => void;
  update: (state: Partial<State>) => void;
}

export type MeiosisComponent<T extends { [key: string]: any } = {}> =
  FactoryComponent<{
    state: State;
    actions: Actions;
    options?: T;
  }>;

export const appActions: (cell: MeiosisCell<State>) => Actions = ({
  update /* states */,
}) => ({
  // addDucks: (cell, amount) => {
  //   cell.update({ ducks: (value) => value + amount });
  // },
  update: (state) => update(state),
  setPage: (page, info) => {
    document.title = `${APP_TITLE} | ${page.replace("_", " ")}${
      info ? ` | ${info}` : ""
    }`;
    // const curPage = states().page;
    // if (curPage === page) return;
    update({
      page: () => {
        scrollToTop();
        return page;
      },
    });
  },
  changePage: (page, params, query) => {
    routingSvc && routingSvc.switchTo(page, params, query);
    document.title = `${APP_TITLE} | ${page.replace("_", " ")}`;
    update({ page });
  },
  saveModel: (model) => {
    model.lastUpdate = Date.now();
    model.version = model.version ? model.version++ : 1;
    localStorage.setItem(MODEL_KEY, JSON.stringify(model));
    // console.log(JSON.stringify(model, null, 2));
    update({ model: () => model });
  },
  saveSettings: async (settings: Settings) => {
    // await settingsSvc.save(settings);
    update({
      settings: () => settings,
    });
  },
  setSearchFilter: async (searchFilter?: string) => {
    if (searchFilter) {
      // localStorage.setItem(SEARCH_FILTER_KEY, searchFilter);
      update({ searchFilter });
    } else {
      update({ searchFilter: undefined });
    }
  },
  setRole: (role) => {
    localStorage.setItem(USER_ROLE, role);
    update({ role });
  },
  login: () => {},
});

export const setSearchResults: Service<State> = {
  onchange: (state) => state.searchFilter,
  run: (cell) => {
    const state = cell.getState();
    const { searchFilter } = state;
    console.log(`Searching ${searchFilter}`);
    cell.update({ searchResults: () => [] });
  },
};

const config: MeiosisConfig<State> = {
  app: {
    initial: {
      page: Pages.HOME,
      loggedInUser: undefined,
      role: "user",
      settings: {} as Settings,
    } as State,
    services: [setSearchResults],
  },
};
export const cells = meiosisSetup<State>(config);

cells.map(() => {
  // console.log('...redrawing');
  m.redraw();
});

const loadData = async () => {
  const role = (localStorage.getItem(USER_ROLE) || "user") as UserRole;
  const ds = localStorage.getItem(MODEL_KEY);
  const model: DataModel = ds ? JSON.parse(ds) : {};
  // const settings = (await settingsSvc.loadList()).shift() || ({} as Settings);

  cells().update({
    role,
    model: () => model,
    // settings: () => settings,
  });
};
loadData();
