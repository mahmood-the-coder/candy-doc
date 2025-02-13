import { findAncestor } from "../../find-ancestor/index.js";
import { container } from "./container.js";

let selected = null;
export function getHierarchySelect() {
  return selected;
}
export function setHierarchySelect(newSelect) {
  selected = newSelect
  container
    .querySelectorAll(".candyDoc__hierarchyItemWrapper")
    .forEach((s) => {
      s.style.border = "1px solid var(--color)";
    });


  if (selected) {
    selected.style.border = "2px solid var(--color)"
  }
}
export function initHierarchySelect() {
  window.addEventListener("mousedown", (e) => {
    container
      .querySelectorAll(".candyDoc__hierarchyItemWrapper")
      .forEach((s) => {
        s.style.border = "1px solid var(--color)";
      });

    if(e.target.classList.contains("candyDoc__hierarchyDummy") )return;
    if (e.target.classList.contains("candyDoc__hierarchyItemWrapper")) {
      selected = e.target;
    } else if (findAncestor(e.target, "candyDoc__hierarchyItemWrapper")) {
      selected = findAncestor(e.target, "candyDoc__hierarchyItemWrapper")
    }
    else {
      selected = null;
    }

    if (selected) {
      selected.style.border = "2px solid var(--color)"
    }

  });
}
