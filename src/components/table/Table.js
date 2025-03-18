import { findAncestor } from "../find-ancestor/index.js";
import { insert } from "../insert/index.js";
import { getAlignInspectorTools } from "../inspector/align-tools/index.js";
import { getInspectorBorderColorTools } from "../inspector/border-color-tools/index.js";
import { getInspectorBorderImageTools } from "../inspector/border-image-tools/index.js";
import { getInspectorBorderRadiusTools } from "../inspector/border-radius-tools/index.js";
import { getInspectorBorderTools } from "../inspector/border-tools/index.js";
import { getInspectorBorderWidthTools } from "../inspector/border-width-tools/index.js";
import { getInspector } from "../inspector/index.js";
import { getInspectorTableBorderTools } from "../inspector/table-tools/elements/table-border-tools/index.js";
import { getInspectorTableTools } from "../inspector/table-tools/index.js";
import { getInspectorTransformTools } from "../inspector/transform-tools/index.js";
import { initTableResize } from "./table-resize/TableResize.js";
import { initAddTableCol } from "./TableAddCol.js";
import { initAddTableRow } from "./TableAddRow.js";
import { createTableCell } from "./TableCell.js";
import { initCellTableDrag } from "./TableCellDrag.js";
import { initTableColNames } from "./TableColNames.js";
import { initTableMerge } from "./TableMerge.js";
import { initTableProcess } from "./TableProcess.js";
import { initRemoveTableCol } from "./TableRemoveCol.js";
import { initRemoveTableRow } from "./TableRemoveRow.js";
import { initResizeCols } from "./TableResizeCols.js";
import { initResizeRows } from "./TableResizeRows.js";
import { initTableRowNames } from "./TableRowNames.js";
import { initTableSplit } from "./TableSplit.js";
import { initSwapCols } from "./TableSwapCols.js";
import { initSwapRows } from "./TableSwapRows.js";
import { getTemplateCols, getTemplateRows } from "./TableTemplate.js";
import { initTransformProcess } from "./TransformProcess.js";
export function insertTable() {
  const tableWrapper = document.createElement("div");
  tableWrapper.dataset.gridTemplateColumns = "100px 100px 100px 100px";
  tableWrapper.dataset.gridTemplateRows = "100px 100px 100px 100px";
  const table = document.createElement("div");
  table.classList.add("candyDoc__table", "target");
  tableWrapper.append(table);
  table.contentEditable = "false";
  tableWrapper.classList.add(
    "candyDoc__tableWrapper",
    "draggable",
    "removable",
    "selectable",
    "selected",
    "table-resize"
  );
  tableWrapper.style.width = 400 + "px";
  tableWrapper.style.height = 400 + "px";
  tableWrapper.id = "table__" + Date.now().toString(16);
  table.style.gridTemplateColumns = getTemplateCols(tableWrapper).join(" ");
  table.style.gridTemplateRows = getTemplateRows(tableWrapper).join(" ");
  insert(tableWrapper);
  renderTable(tableWrapper);

  getTableColorsData(tableWrapper, "borderColor");
  getTableColorsData(tableWrapper, "color");
  getTableColorsData(tableWrapper, "backgroundColor");
}
export function initTable() {
  initTableMerge();
  initTableSplit();
  initCellTableDrag();
  initTableResize();
  initSwapRows();
  initSwapCols();
  initResizeRows();
  initResizeCols();
  initAddTableRow();
  initAddTableCol();
  addInspectorTools();
  initRemoveTableRow();
  initRemoveTableCol();
  initTableRowNames();
  initTableColNames();
  initTableProcess();
  initTransformProcess();

}

export function renderTable(table) {

  table.querySelector(".candyDoc__table").innerHTML = "";


  for (let index = 0; index < 16; index++) {
    const rowIndex = Math.floor(index / getTemplateCols(table).length);
    const colIndex = index % getTemplateCols(table).length;

    const area = `${rowIndex + 1} / ${colIndex + 1} / ${rowIndex + 2} / ${colIndex + 2
      }`;

    const cell = createTableCell(area, "", rowIndex, colIndex);
    table.querySelector(".candyDoc__table").append(cell);

  }



  const { tableHeight, tableWidth } = getTableDimensions(table);

  table.style.height = tableHeight + "px";
  table.style.width = tableWidth + "px";



}

export function getTableColorsData(table, colorsName) {
  table.dataset["row_" + colorsName] = "[]";
  table.dataset["col_" + colorsName] = "[]";
}
export function applyRowColors(table) {
  const cells = [...table.querySelectorAll(".candyDoc__tableCell")];

  const rowColors = JSON.parse(table?.dataset?.row_textColors??"[]");
  const rowBorderColors = JSON.parse(table?.dataset?.row_borderColors??"[]");
  const rowBackgroundColors = JSON.parse(table?.dataset?.row_backgroundColors??"[]");
  cells.forEach((cell) => {
    const row = parseInt(cell.dataset.row)-1
    cell.style.color = rowColors[row % rowColors.length];
    cell.style.borderColor = rowBorderColors[row % rowBorderColors.length];
    cell.style.backgroundColor =
      rowBackgroundColors[row % rowBackgroundColors.length];
  });
}
export function applyColColors(table) {
  const cells = [...table.querySelectorAll(".candyDoc__tableCell")];
  const colColors = JSON.parse(table?.dataset?.col_textColors??"[]");
  const colBorderColors = JSON.parse(table?.dataset?.col_borderColors??"[]");
  const colBackgroundColors = JSON.parse(table?.dataset?.col_backgroundColors??"[]");

  

  // Group cells by column (modular result)
  cells.forEach((cell) => {
    const col = parseInt(cell.dataset.col)-1;
    cell.style.color = colColors[col % colColors.length];
    cell.style.borderColor = colBorderColors[col % colBorderColors.length];
    cell.style.backgroundColor =
      colBackgroundColors[col % colBackgroundColors.length];
  });
}
export function getTableDimensions(table) {
  const tableWidth = getTemplateCols(table).reduce((a, v) => {
    return a + parseFloat(v.replace("px", ""));
  }, 0);

  const tableHeight = getTemplateRows(table).reduce((a, v) => {
    return a + parseFloat(v.replace("px", ""));
  }, 0);
  return { tableHeight, tableWidth };
}

function addInspectorTools() {
  window.addEventListener("mousedown", (e) => {
    const textBox = findAncestor(e.target, "candyDoc__tableCell")
    if (textBox) {
      const inspector = getInspector();
      inspector.innerHTML = "";
      const scrollTop = inspector.scrollTop;
      getInspector().append(
        getInspectorTransformTools(),
        getInspectorBorderRadiusTools(),
        getInspectorBorderTools(),
        getInspectorBorderWidthTools(),
        getInspectorBorderColorTools(),
        getInspectorBorderImageTools()
      );

      inspector.scrollTop = scrollTop;
      return;
    }
    const table = findAncestor(e.target, "candyDoc__tableWrapper");
    if (!table) return;
    const inspector = getInspector();
    inspector.innerHTML = "";
    const scrollTop = inspector.scrollTop;
    getInspector().append(
      getInspectorTransformTools(),
      getInspectorTableBorderTools(),
      getInspectorTableTools(),
      getAlignInspectorTools(),
      getInspectorBorderRadiusTools(),
      getInspectorBorderTools(),
      getInspectorBorderWidthTools(),
      getInspectorBorderColorTools(),
      getInspectorBorderImageTools()
    );
    inspector.scrollTop = scrollTop;
  });
}
