import { getExportsOptions } from "../export/index.js";
import { getPagesData } from "../pages/elements/getPageData.js";
import { backIcon } from "../view-tools/elements/backIcon.js";
import { exportIcon } from "../view-tools/elements/exportIcon.js";
import { wrapper } from "../view-tools/elements/wrapper.js";

export function createView() {

  const pagesWrapper = document.createElement("div");
  pagesWrapper.classList.add("candyDoc__viewPagesWrapper", "candyDoc__scroll")
  pagesWrapper.innerHTML = getPagesData().innerHTML
  document.body.append(pagesWrapper);
  const backIconWrapper = wrapper.cloneNode(true);
  backIconWrapper.append(backIcon)
  backIconWrapper.classList.add("candyDoc__viewBackIconWrapper")
  const exportIconWrapper = wrapper.cloneNode(true);
  exportIconWrapper.append(exportIcon)
  exportIconWrapper.classList.add("candyDoc__viewExportIconWrapper")
  exportIconWrapper.append(getExportsOptions())
  document.body.append(backIconWrapper, exportIconWrapper)
  document.body.classList.add("candyDoc__viewMode")
  pagesWrapper.querySelectorAll("*").forEach(el => el.classList.remove("selectable"))
  pagesWrapper.querySelectorAll("[contenteditable='true']").forEach(el => el.style.userSelect = "auto")
  pagesWrapper.querySelector(".candyDoc__textEditorToolbarWrapper")?.remove()


}

