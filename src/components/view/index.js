import { getExportsOptions } from "../export/index.js";
import { getPagesData } from "../pages/elements/getPageData.js";
import { backIcon } from "../view-tools/elements/backIcon.js";
import { exportIcon } from "../view-tools/elements/exportIcon.js";
import { viewToolWrapper } from "../view-tools/elements/viewToolWrapper.js";

export function createView() {
 
  const pagesWrapper = document.createElement("div");
  pagesWrapper.classList.add( "candyDoc__viewPagesWrapper","candyDoc__scroll")
  pagesWrapper.innerHTML = getPagesData().innerHTML
  document.body.append(pagesWrapper);
  const backIconWrapper = viewToolWrapper.cloneNode(true);
  backIconWrapper.append(backIcon)
  backIconWrapper.classList.add("candyDoc__viewBackIconWrapper")
  const exportIconWrapper = viewToolWrapper.cloneNode(true);
  exportIconWrapper.append(exportIcon)
  exportIconWrapper.classList.add("candyDoc__viewExportIconWrapper")
  exportIconWrapper.append(getExportsOptions())
  document.body.append(backIconWrapper, exportIconWrapper)
  document.body.classList.add("candyDoc__viewMode")
  pagesWrapper.querySelectorAll("*").forEach(el => el.style.pointerEvents = "none")


}

