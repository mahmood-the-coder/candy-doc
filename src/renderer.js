import "../coloris/index.js"
import "../apex-chart-js/index.js"
import "../HTML2PDF/index.js"
import "../editor-js/index.js"
import "../editor-js/list.js"
import "../editor-js/code.js"
import "../editor-js/header.js"
import { initDraggable } from "./components/drag/index.js";
import { initGrouping } from "./components/group/index.js";
import { initHierarchySelect } from "./components/hierarchy/elements/select.js"
import {initHierarchyDrag} from "./components/hierarchy/elements/drag.js"
import { getHierarchy, getHierarchyHeader } from "./components/hierarchy/index.js"
import { cursor, initCursor } from "./components/insert/cursor.js";
import {
  getInspector,
  getInspectorHeader,
} from "./components/inspector/index.js";
import {
  getBottomLayoutElement,
  getCenterLayoutElement,
  getLayout,
  getLeftSideLayoutElement,
  getRightSidLayoutElement,
} from "./components/layout/index.js";
import { createPages } from "./components/pages/index.js";
import { getPreference } from "./components/preference/index.js";
import { initRemovable } from "./components/removable/removable.js";
import { initResizable } from "./components/resize/index.js";
import { initRuler } from "./components/ruler/index.js";
import { getPageActions } from "./components/page-actions/index.js";
import { initMultiSelection, initSelectable } from "./components/selection/index.js";
import { initTable } from "./components/table/Table.js";
import { initToolTip } from "./components/tooltip/index.js";
import { getImportTool } from "./components/import-tools/index.js";
import { getViewTool } from "./components/view-tools/index.js";
import {  initLoad, initSave } from "./components/user-data/userData.js";
import { initEditorJS } from "./components/editor-js/index.js";
import { initDuplication } from "./components/duplication/index.js"
import { initCopy } from "./components/copy/index.js"
import { initHistoryStack } from "./components/history-stack/index.js"
import { numberPages } from "./components/pages/elements/numberPages.js"


initSave()






document.body.append(getLayout());

getCenterLayoutElement().append(createPages());

getLeftSideLayoutElement().append(getInspectorHeader(), getInspector());


getRightSidLayoutElement().append(getHierarchyHeader(), getHierarchy());


getBottomLayoutElement().append(getPreference(),getViewTool(),getImportTool(),getPageActions())


document.querySelector(".candyDoc__content").append(cursor);
initTable()
initCursor();
initRemovable()
initResizable();
initDraggable();
initSelectable();
initRuler();
initHierarchyDrag()
initHierarchySelect()
initGrouping()

initMultiSelection()
initToolTip()
initEditorJS()
initDuplication()
initCopy()
initHistoryStack()
document.body.querySelectorAll("*").forEach((el) => {
  el.addEventListener("dragstart", (e) => e.preventDefault());
});







initLoad()




