import { getSelected } from "../../../selection/index.js";
import { getBackgroundSize, setBackgroundSizeArray } from "./getBackgroundSize.js";
import { swap } from "./swap.js";
export function initDrag(container) {
  let isDragging = false;
  let startY = 0;
  let deltaY = 0;
  let target = null;
  let clone = null;
  let zoom=1
  container.addEventListener("mousedown", (e) => {
    if (
      e.target.classList.contains("candyDoc__inspectorBackgroundSizeItemDrag")
    ) {
      target = e.target.parentElement;

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
      zoom=window.devicePixelRatio
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
        ...container.querySelectorAll(".candyDoc__inspectorBackgroundSizeItem"),
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
    setBackgroundSizeArray(
      [...container.querySelectorAll(".candyDoc__inspectorBackgroundSizeItem")].map(
        (c) => {
          const sizeInputs = c.querySelectorAll("input");
          return [sizeInputs[0].value+"%", sizeInputs[1].value+"%"];
        }
      )
    );
    const selected = getSelected();
    if (!selected) return;
    selected.style.backgroundSize = getBackgroundSize(selected)
    .map((size) => {
      return `${size[0]} ${size[1]}`;
    })
    .join(", ");
  });
}
