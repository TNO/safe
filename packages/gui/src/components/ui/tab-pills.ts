import m, { Attributes, FactoryComponent, Vnode } from "mithril";
import { uniqueId } from "mithril-materialized";
import "../../css/tab-pills.css";

export interface ITabItem {
  /** Title of the tab */
  title: string | Vnode<any, any> | Array<string | Vnode<any, any>>;
  /** Content to render: may be empty in case of a using the tab as a hyperlink. */
  content?: string | Vnode<any, any> | Array<string | Vnode<any, any>>;
  /** ID of the tab element. Default the title in lowercase */
  id?: string;
  /** If the tab should be active */
  active?: boolean;
  /** Only used in combination with a set target to make the tab act as a regular hyperlink. */
  href?: string;
}
export interface TabPillAttrs extends Partial<M.TabsOptions>, Attributes {
  id?: string;
  /** Selected tab id */
  selectedTabId?: string;
  /** List of tab items */
  tabs: ITabItem[];
}

export const TabPills: FactoryComponent<TabPillAttrs> = () => {
  let elId: string;
  let selectedIndex: number = 0;

  return {
    oninit: ({ attrs: { id } }) => {
      elId = id ?? uniqueId();
    },
    view: ({ attrs: { tabs = [], selectedTabId } }) => {
      if (selectedTabId) {
        const found = tabs.findIndex((tab) => tab.id === selectedTabId);
        if (found >= 0) selectedIndex = found;
      } else {
        const found = tabs
          .map((tab, index) => ({ tab, index }))
          .filter((i) => i.tab);
        if (found.length === 1) selectedIndex = found[0].index;
      }

      return m(
        ".wrapper",
        m(
          ".tabs_wrap",
          m(
            "ul",
            tabs.map((tab, index) =>
              m(
                "li",
                {
                  "data-tabs": tab.id || elId + "-" + index,
                  className: selectedIndex === index ? "active" : undefined,
                  onclick: () => {
                    selectedIndex = index;
                  },
                },
                tab.title
              )
            )
          )
        ),
        selectedIndex >= 0 && selectedIndex < tabs.length
          ? tabs[selectedIndex].content
          : undefined
      );
    },
  };
};
