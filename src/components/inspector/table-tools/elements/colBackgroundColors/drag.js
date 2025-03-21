import { getSelected } from "../../../../selection/index.js";
import { applyColColors } from "../../../../table/Table.js";
import { swap } from "./swap.js";

export function initColBackgroundColorsDrag(container) {
  let isDragging = false;
  let startY = 0;
  let deltaY = 0;
  let target = null;
  let clone = null;
  let zoom=1
  container.addEventListener("mousedown", (e) => {
    if (
      e.target.classList.contains("candyDoc__inspectorTableColorItemDragIcon")
    ) {
      target = e.target.parentElement;
      zoom=devicePixelRatio
      isDragging = true;
      startY = target.offsetTop + e.offsetY;

      deltaY = 0;
      target.classList.add("dragging");
      clone = target.cloneNode();

      clone.style.height = "5px";
      clone.style.padding = "0";
      clone.style.width = target.offsetWidth + "px";
      clone.style.backgroundColor = "var(--color)";
      clone.style.opacity = "0.5";
      clone.style.top = startY + "px";
      clone.style.position = "absolute";
      clone.style.zIndex = "100";
      clone.style.cursor = "row-resize";
      clone.className = "";
      target.style.opacity = "0";
      container.append(clone);
    }
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    deltaY += e.movementY/zoom;
    let y = startY + deltaY;
    const minY = 0;
    const maxY = container.offsetHeight - clone.offsetHeight;
    if (y < minY) y = minY;
    if (y > maxY) y = maxY;
    clone.style.top = y + "px";
    swap(
      clone,
      target,
      [
        ...container.querySelectorAll(".candyDoc__inspectorTableColorDragItem"),
      ].filter((c) => !c.classList.contains("dragging"))
    );
  });
  window.addEventListener("mouseup", () => {
    if (!isDragging) return;

    isDragging = false;
    target?.classList.remove("dragging");
    target.style.opacity = "1";
    target = null;
    clone.remove();
    const selected=getSelected();
    if(!selected)return;
    const colors=[...container.querySelectorAll(".candyDoc__inspectorTableColColorItem")].map(i=>i.dataset.col_backgroundColor);
    [...container.querySelectorAll(".candyDoc__inspectorTableColColorItem")].forEach((item,index)=>item.dataset.index=index.toString())
    selected.dataset.col_backgroundColors=JSON.stringify(colors);
    applyColColors(selected);
  });
}
