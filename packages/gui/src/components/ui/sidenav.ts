import m from "mithril";
import M from "materialize-css";
import {
  MeiosisComponent,
  handleCsvUpload,
  routingSvc,
  t,
} from "../../services";
import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";
import { FlatButton, ModalPanel } from "mithril-materialized";
import { DataModel, Page, Pages, EmptyDataModel } from "../../models";
import { isActivePage } from "../../utils";
import Papa from "papaparse";

const createPermalink = (model: DataModel) => {
  const permLink = document.createElement("input") as HTMLInputElement;
  document.body.appendChild(permLink);
  if (!permLink) {
    return;
  }
  const compressed = compressToEncodedURIComponent(JSON.stringify(model));
  const url = `${window.location.href}${
    /\?/.test(window.location.href) ? "&" : "?"
  }model=${compressed}`;
  permLink.value = url;
  permLink.select();
  permLink.setSelectionRange(0, 999999); // For mobile devices
  try {
    const successful = document.execCommand("copy");
    if (successful) {
      M.toast({
        html: t("PERMALINK_MSG"),
        classes: "yellow black-text",
      });
    }
  } catch (err) {
    M.toast({
      html: "Failed copying link to clipboard: " + err,
      classes: "red",
    });
  } finally {
    document.body.removeChild(permLink);
  }
};

/** Get a query parameter from the URL */
function getQueryParameter(param = "model"): string | null {
  // 1. Get the full query string from the current URL (e.g., "?model=X1&year=2024")
  const queryString = window.location.search;

  // 2. Create a URLSearchParams object from the query string
  const urlParams = new URLSearchParams(queryString);

  // 3. Get the value of the 'model' parameter
  // The return type is string | null (if the parameter doesn't exist)
  const modelValue = urlParams.get(param);

  return modelValue;
}

/** Convert a model base64 encoded string to the data model */
const usePermalink = (saveModel: (model: DataModel) => void) => {
  const uriModel = getQueryParameter();
  if (!uriModel) {
    return;
  }
  try {
    const decompressed = decompressFromEncodedURIComponent(uriModel);
    if (!decompressed) {
      return;
    }
    const model = JSON.parse(decompressed);
    saveModel(model);
  } catch (err) {
    console.error(err);
  }
};

export const SideNav: MeiosisComponent = () => {
  const handleSelection = (
    option: "clear" | "upload_csv" | "download_csv",
    saveModel: (model: DataModel) => void,
    model: DataModel
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
      case "download_csv": {
        const dlAnchorElem = document.createElement("a"); // Use 'a' tag instead of 'anchor'
        if (!dlAnchorElem) {
          return;
        }

        const dataStr =
          "data:text/csv;charset=utf-8," +
          encodeURIComponent(
            Papa.unparse(model.data, { header: true, delimiter: ";" })
          );

        dlAnchorElem.href = dataStr; // Use href property instead of setAttribute
        dlAnchorElem.download = `COA_COMPASS_samengevoegd.csv`; // Use download property instead of setAttribute
        dlAnchorElem.target = "_blank"; // Use target property instead of setAttribute

        document.body.appendChild(dlAnchorElem); // Append to the document so the click works
        dlAnchorElem.click();
        document.body.removeChild(dlAnchorElem); // Clean up the element
        break;
      }
    }
  };

  return {
    oninit: ({
      attrs: {
        actions: { saveModel },
      },
    }) => {
      usePermalink(saveModel);
    },
    view: ({
      attrs: {
        state,
        actions: { saveModel, changePage },
      },
    }) => {
      const { page, model } = state;
      // const roleIcon =
      //   role === "user"
      //     ? "person"
      //     : role === "editor"
      //     ? "edit"
      //     : "manage_accounts";

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
              label: t("UPLOAD"),
              onclick: () => handleSelection("upload_csv", saveModel, model),
              iconName: "upload",
            })
          ),
          m(
            "li",
            m(FlatButton, {
              label: t("DOWNLOAD"),
              onclick: () => handleSelection("download_csv", saveModel, model),
              iconName: "download",
            })
          ),
          m(
            "li",
            m(FlatButton, {
              label: t("PERMALINK"),
              onclick: () => createPermalink(model),
              iconName: "link",
            })
          ),
          m(
            "li",
            m(FlatButton, {
              label: t("CLEAR"),
              iconName: "clear",
              modalId: "clear_model",
            })
          ),
          // m(
          //   "li",
          //   m(Select, {
          //     checkedId: role,
          //     label: t("ROLE"),
          //     iconName: roleIcon,
          //     options: [
          //       { id: "user", label: t("USER") },
          //       { id: "editor", label: t("EDITOR") },
          //       { id: "admin", label: t("ADMIN") },
          //     ],
          //     onchange: (role) => {
          //       setRole(role[0]);
          //     },
          //   } as ISelectOptions<UserRole>)
          // ),
          // m(
          //   "li",
          //   m(LanguageSwitcher, {
          //     onLanguageChange: async (language: Languages) => {
          //       await i18n.loadAndSetLocale(language as Languages);
          //     },
          //     currentLanguage: i18n.currentLocale,
          //   })
          // ),
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
