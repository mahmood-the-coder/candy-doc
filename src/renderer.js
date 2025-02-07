import "../coloris/index.js"
import "../apex-chart-js/index.js"
import "../HTML2PDF/index.js"
import "../editor-js/index.js"
import "../editor-js/list.js"
import "../editor-js/code.js"
import "../editor-js/header.js"
import { initDraggable } from "./components/drag/index.js";
import { initGrouping } from "./components/group/index.js";
import { initHierarchyDrag } from "./components/hierarchy/drag.js";
import {
  getHierarchy,
  getHierarchyHeader,
} from "./components/hierarchy/index.js";
import { initHierarchySelect } from "./components/hierarchy/select.js";
import { initHistory } from "./components/history-stack/index.js";
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
import { getRunningFooterEditor } from "./components/running-footer/index.js";
import { getRunningHeaderEditor } from "./components/running-header/index.js";
import { initMultiSelection, initSelectable } from "./components/selection/index.js";
import { initTable } from "./components/table/Table.js";
import { initToolTip } from "./components/tooltip/index.js";
import { getImportTool } from "./components/import-tools/index.js";
import { getViewTool } from "./components/view-tools/index.js";
import { initUserData } from "./components/user-data/userData.js";
import { initEditorJS } from "./components/editor-js/index.js";



initUserData()





document.body.append(getRunningFooterEditor(),getRunningHeaderEditor(),getLayout());

getCenterLayoutElement().append(createPages());

getLeftSideLayoutElement().append(getInspectorHeader(), getInspector());


getRightSidLayoutElement().append(getHierarchyHeader(), getHierarchy());


getBottomLayoutElement().append(getPreference(),getViewTool(),getImportTool())


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
initHistory()
initMultiSelection()
initToolTip()
initEditorJS()
document.body.querySelectorAll("*").forEach((el) => {
  el.addEventListener("dragstart", (e) => e.preventDefault());
});












