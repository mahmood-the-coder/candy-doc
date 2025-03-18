import { findAncestor } from "../../find-ancestor/index.js";
import { hierarchyContainer } from "./container.js";

let selected = null;
export function getHierarchySelect() {
  return selected;
}
export function setHierarchySelect(newSelect) {
  selected = newSelect


  if (selected) {
    selected.style.border = "2px solid var(--color)"
    selected.dataset.selected = "true"

  }
}
export function initHierarchySelect() {
  window.addEventListener("mousedown", (e) => {
    hierarchyContainer
      .querySelectorAll(".candyDoc__hierarchyItemWrapper")
      .forEach((s) => {
        s.style.border = "1px solid var(--color)";
        s.dataset.selected = "false"
      });

    if (e.target.classList.contains("candyDoc__hierarchyItemWrapper")) {
      selected = e.target;
    } else if (findAncestor(e.target, "candyDoc__hierarchyItemWrapper")) {
      selected = findAncestor(e.target, "candyDoc__hierarchyItemWrapper")
    }
    else {
      if (selected) {
        selected.style.border = "1px solid var(--color)"
        selected.dataset.selected = "false"
      }
      selected = null;
    }


    if (selected) {
      selected.style.border = "2px solid var(--color)"
      selected.dataset.selected = "true"
    }

  });
}
