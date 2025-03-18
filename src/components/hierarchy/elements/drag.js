import { UpdateDynamicText } from "../../dynamic-text/index.js";
import { numberPages } from "../../pages/elements/numberPages.js";
import { sortPages } from "../../pages/elements/sortPages.js";
import { generateTableOfContent } from "../../table-of-content/index.js";
import { userData } from "../../user-data/userData.js";
import { hierarchyContainer } from "./container.js";
import { getHierarchyItems } from "./getHierarchyItems.js";
import { swap } from "./swap.js";

export function initHierarchyDrag() {
  let isDragging = false;
  let startY = 0;
  let deltaY = 0;
  let target = null;
  let clone = null;
  let zoom = 1;
  
  window.addEventListener("mousedown", (e) => {

    if (e.target.classList.contains("candyDoc__hierarchyItemDragIcon")) {

      zoom = window.devicePixelRatio
      target = e.target.parentElement.parentElement;
      isDragging = true;
      startY =
        target.getBoundingClientRect().y -
        hierarchyContainer.getBoundingClientRect().y + hierarchyContainer.scrollTop + 14.9
      deltaY = 0;
      target.classList.add("dragging");
      clone = target.cloneNode();
      clone.style.height = "5px";
      clone.style.padding = "0";
      clone.style.width = "100%";
      clone.style.backgroundColor = "var(--color)";
      clone.style.opacity = "0.5";
      clone.style.top = startY + "px";
      clone.style.position = "absolute";
      clone.style.zIndex = "100";
      clone.style.cursor = "row-resize";
      target.style.opacity = "0";
      hierarchyContainer.append(clone);
    }
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    deltaY += e.movementY / zoom;
    let y = startY + deltaY;
    const minY = 0;
    const maxY = hierarchyContainer.offsetHeight + hierarchyContainer.scrollTop - target.offsetHeight;
    if (y < minY) y = minY;
    if (y > maxY) y = maxY;
    clone.style.top = y + "px";
    swap(clone, target, [
      ...hierarchyContainer.querySelectorAll(".candyDoc__hierarchyItemWrapper"),
    ].filter((c) => !c.classList.contains("dragging")));
  });
  window.addEventListener("mouseup", () => {

    if (!isDragging) return;
    isDragging = false;
    target?.classList.remove("dragging");
    target.style.opacity = "1";
    target = null;
    clone.remove();
   

    setTimeout(() => {
      sortPages()
      numberPages()
      if (document.body.querySelector(".candyDoc__tableOfContent")) {
        generateTableOfContent()

      }
      userData.hierarchyItems = getHierarchyItems(hierarchyContainer)

      UpdateDynamicText()
    }, 200);
  });
}
