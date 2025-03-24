import m from "mithril";
import M from "materialize-css";
import {
  Languages,
  MeiosisComponent,
  UserRole,
  handleCsvUpload,
  i18n,
  routingSvc,
  t,
} from "../../services";
import {
  FlatButton,
  ISelectOptions,
  ModalPanel,
  Select,
} from "mithril-materialized";
import { DataModel, Page, Pages, EmptyDataModel } from "../../models";
import { isActivePage } from "../../utils";
import { LanguageSwitcher } from "./language-switcher";

export const SideNav: MeiosisComponent = () => {
  const handleSelection = (
    option: string,
    saveModel: (model: DataModel) => void
  ) => {
    switch (option) {
      case "clear":
        console.log("CLEARING DATA");
        saveModel(EmptyDataModel());
        break;
      case "upload_csv": {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = ".csv";
        fileInput.onchange = handleCsvUpload(saveModel);
        fileInput.click();
        break;
      }
    }
  };

  return {
    view: ({
      attrs: {
        state,
        actions: { saveModel, setRole, changePage },
      },
    }) => {
      const { role, page } = state;
      const roleIcon =
        role === "user"
          ? "person"
          : role === "editor"
          ? "edit"
          : "manage_accounts";

      const isActive = isActivePage(page);

      return m(
        "ul#slide-out.sidenav.row",
        {
          oncreate: ({ dom }) => {
            M.Sidenav.init(dom);
          },
        },
        [
          routingSvc
            .getList()
            .filter(
              (d) =>
                d.id !== Pages.LANDING &&
                ((typeof d.visible === "boolean"
                  ? d.visible
                  : d.visible(state)) ||
                  isActive(d))
            )
            .map((d: Page) =>
              m("li.hide-on-med-and-up", { class: isActive(d) }, [
                m(FlatButton, {
                  label: d.title,
                  className: d.iconClass ? ` ${d.iconClass}` : "",
                  // style,
                  iconName:
                    typeof d.icon === "string"
                      ? d.icon
                      : d.icon
                      ? d.icon()
                      : "",
                  // href: routingSvc.href(d.id),
                  onclick: () => changePage(d.id),
                }),
                // ),
              ])
            ),
          m(
            "li",
            m(FlatButton, {
              label: t("CLEAR"),
              iconName: "clear",
              modalId: "clear_model",
            })
          ),
          m(
            "li",
            m(FlatButton, {
              label: t("UPLOAD"),
              onclick: () => handleSelection("upload_csv", saveModel),
              iconName: "upload",
            })
          ),
          m(
            "li",
            m(Select, {
              checkedId: role,
              label: t("ROLE"),
              iconName: roleIcon,
              options: [
                { id: "user", label: t("USER") },
                { id: "editor", label: t("EDITOR") },
                { id: "admin", label: t("ADMIN") },
              ],
              onchange: (role) => {
                setRole(role[0]);
              },
            } as ISelectOptions<UserRole>)
          ),
          m(
            "li",
            m(LanguageSwitcher, {
              onLanguageChange: async (language: Languages) => {
                await i18n.loadAndSetLocale(language as Languages);
              },
              currentLanguage: i18n.currentLocale,
            })
          ),
        ]
        // m(ModalPanel, {
        //   id: 'clear_model',
        //   title: t('DELETE_ITEM', 'TITLE', { item: t('MODEL') }),
        //   description: t('DELETE_ITEM', 'DESCRIPTION', { item: t('MODEL').toLowerCase() }),
        //   buttons: [
        //     { label: t('CANCEL'), iconName: 'cancel' },
        //     {
        //       label: t('DELETE'),
        //       iconName: 'delete',
        //       onclick: () => {
        //         handleSelection('clear', model, saveModel);
        //       },
        //     },
        //   ],
        // })
      );
    },
  };
};

export const SideNavTrigger: MeiosisComponent<{}> = () => {
  return {
    view: ({
      attrs: {
        actions: { saveModel },
      },
    }) => {
      return [
        m(
          "a",
          {
            href: "#!",
            "data-target": "slide-out",
            class: "sidenav-trigger",
            style: "position: absolute;margin-left: 10px;top: 75px;",
          },
          m("i.material-icons", "menu")
        ),
        m(ModalPanel, {
          id: "clear_model",
          title: t("DELETE_ITEM", "TITLE", { item: t("MODEL") }),
          description: t("DELETE_ITEM", "DESCRIPTION", {
            item: t("MODEL").toLowerCase(),
          }),
          buttons: [
            { label: t("CANCEL"), iconName: "cancel" },
            {
              label: t("DELETE"),
              iconName: "delete",
              onclick: () => {
                saveModel(EmptyDataModel());
              },
            },
          ],
        }),
      ];
    },
  };
};
