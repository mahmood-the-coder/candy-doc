import { getCenterLayoutElement } from "../../layout/index.js";
import { getSelected } from "../../selection/index.js";
import {  addTableColsBackgroundColors } from "./elements/colBackgroundColors/colors.js";
import { initColBackgroundColorsDrag } from "./elements/colBackgroundColors/drag.js";
import { addTableColsBorderColors } from "./elements/colBorderColors/colors.js";
import { initColBorderColorsDrag } from "./elements/colBorderColors/drag.js";
import { addTableColsTextColors } from "./elements/colColors/colors.js";
import { initColColorsDrag } from "./elements/colColors/drag.js";
import { addTableRowsBackgroundColors } from "./elements/rowBackgroundColors/colors.js";
import { initRowBackgroundColorsDrag } from "./elements/rowBackgroundColors/drag.js";
import { addTableRowsBorderColors } from "./elements/rowBorderColors/colors.js";
import { initRowBorderColorsDrag } from "./elements/rowBorderColors/drag.js";
import { addTableRowsTextColors } from "./elements/rowColors/colors.js";
import { initRowColorsDrag } from "./elements/rowColors/drag.js";
import { rowNumber } from "./elements/rowNumber.js";
import { wrapper } from "./elements/wrapper.js";
export function getInspectorTableTools() {
  initRowBackgroundColorsDrag(
    wrapper.querySelector(".candyDoc__inspectorTableBackgroundColors")
  );
  initRowBorderColorsDrag(
    wrapper.querySelector(".candyDoc__inspectorTableRowBorderColors")
  );
  initRowColorsDrag(wrapper.querySelector(".candyDoc__inspectorTableRowTextColors"));

  initColBackgroundColorsDrag(
    wrapper.querySelector(".candyDoc__inspectorTableColBackgroundColors")
  );
  initColBorderColorsDrag(
    wrapper.querySelector(".candyDoc__inspectorTableColBorderColors")
  );
  initColColorsDrag(wrapper.querySelector(".candyDoc__inspectorTableColTextColors"));
  return wrapper;
}

window.addEventListener("mouseup", (e) => {
  const selected = getSelected();
  if (!getCenterLayoutElement().contains(e.target)) return;
  if (!selected) return;
  if (!selected?.querySelectorAll) return;
  const rowNumberIcons = rowNumber.querySelectorAll(".candyDoc__icon");
  if (!selected.dataset.rowNumber) {
    rowNumberIcons[2].classList.add("candyDoc__toggleIcon");
    rowNumberIcons[1].classList.remove("candyDoc__toggleIcon");
    rowNumberIcons[0].classList.remove("candyDoc__toggleIcon");
  }
  if (selected.dataset.rowNumber == "number") {
    rowNumberIcons[0].classList.add("candyDoc__toggleIcon");
    rowNumberIcons[1].classList.remove("candyDoc__toggleIcon");
    rowNumberIcons[2].classList.remove("candyDoc__toggleIcon");
  }
  if (selected.dataset.rowNumber == "bullet") {
    rowNumberIcons[1].classList.add("candyDoc__toggleIcon");
    rowNumberIcons[0].classList.remove("candyDoc__toggleIcon");
    rowNumberIcons[2].classList.remove("candyDoc__toggleIcon");
  }
  if (selected.dataset.rowNumber == "none") {
    rowNumberIcons[2].classList.add("candyDoc__toggleIcon");
    rowNumberIcons[1].classList.remove("candyDoc__toggleIcon");
    rowNumberIcons[0].classList.remove("candyDoc__toggleIcon");
  }

  addTableRowsBackgroundColors(
    JSON.parse(selected?.dataset?.row_backgroundColors ?? "[]")
  );
  addTableColsBackgroundColors(
    
    JSON.parse(selected?.dataset?.col_backgroundColors ?? "[]")
  )
  addTableRowsBorderColors(
    JSON.parse(selected?.dataset?.row_borderColors ?? "[]")
  );
  
  addTableColsBorderColors(
    JSON.parse(selected?.dataset?.col_borderColors ?? "[]")

  )
  addTableColsTextColors(
    JSON.parse(selected?.dataset?.col_textColors ?? "[]")
  )
  addTableRowsTextColors(
    JSON.parse(selected?.dataset?.row_textColors ?? "[]")
  )
});
