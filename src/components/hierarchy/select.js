import { container } from "./elements/container.js";

let select = null;
export function getHierarchySelect() {
  return select;
}
export function initHierarchySelect() {
  window.addEventListener("mousedown", (e) => {
    container
      .querySelectorAll(".candyDoc__hierarchyItemWrapper")
      .forEach((s) => {
        s.style.border = "1px solid var(--color)";
      });
    if(e.target.classList.contains("candyDoc__pageItemName"))
    {
        select=e.target.parentElement.parentElement
    }
    
    if (e.target.classList.contains("candyDoc__hierarchyItemWrapper")) {
      select = e.target;
    } else if (
      e.target.classList?.parentElement?.contains(
        "candyDoc__hierarchyItemWrapper"
      )
    ) {
      select = e.target.parentElement;
    } else if (
      e.target.classList?.parentElement?.parentElement?.contains(
        "candyDoc__hierarchyItemWrapper"
      )
    ) {
      select = e.target.parentElement.parentElement;
    } 

    if (select) {
      select.style.border = "3px solid var(--color)";
    }
  });
}
