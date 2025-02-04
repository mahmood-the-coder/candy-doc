import { findAncestor } from "../../../../find-ancestor/index.js";
import { getSelected } from "../../../../selection/index.js";
import { bottom } from "./elements/bottom.js";
import { left } from "./elements/left.js";
import { right } from "./elements/right.js";
import { top } from "./elements/top.js";
import { wrapper } from "./elements/wrapper.js";
export function getInspectorTableBorderTools() {

  return wrapper;
}

window.addEventListener("mouseup", (e) => {
  if (!findAncestor(e.target, "candyDoc__TableWrapper")) return
  const selected = getSelected();
  if (!selected) return;


  const cells = [...selected?.querySelectorAll(".candyDoc__tableCell") ?? []]

  console.log(cells[0].style.borderTop + ":border");



  if (cells[0].style.borderTop == "none") {
    top.classList.remove("candyDoc__activeIcon");
  } else {
    top.classList.add("candyDoc__activeIcon");
  }
  if (
    cells[0].style.borderBottom == "none"
  ) {
    bottom.classList.remove("candyDoc__activeIcon");
  } else {
    bottom.classList.add("candyDoc__activeIcon");
  }
  if (cells[0].style.borderLeft == "none") {
    left.classList.remove("candyDoc__activeIcon");
  } else {
    left.classList.add("candyDoc__activeIcon");
  }
  if (
    cells[0].style.borderRight == "none"
  ) {
    right.classList.remove("candyDoc__activeIcon");
  } else {
    right.classList.add("candyDoc__activeIcon");
  }


});
