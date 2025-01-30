import { findAncestor } from "../find-ancestor/index.js";
import { getInspector } from "../inspector/index.js";
import { isInside } from "../intersection/index.js";
import { getCenterLayoutElement } from "../layout/index.js";
let currentTarget;

export function initSelectable() {
  window.addEventListener("mousedown", (e) => {
    if (!getCenterLayoutElement().contains(e.target)) return;
    if (e.target.id == "clr-picker") return;
    if (findAncestor(e.target, "clr-picker")) return;
    if (getInspector().contains(e.target)) return;
    document.querySelectorAll(".selectable").forEach((s) => {
      s.classList.remove("selected");
    });
    if (e.target.classList.contains("selectable")) {
      currentTarget = e.target;
      currentTarget?.classList.add("selected");
      
      
    } else {
      currentTarget = findAncestor(e.target, "selectable");
      currentTarget?.classList.add("selected");
    }
    console.log(currentTarget);
  });
}

export function getSelected() {
  return currentTarget;
}
export function setSelected(newTarget) {
  currentTarget = newTarget;
}

export function initMultiSelection() {
  let selectedElements = [];
  let isDragging = false;
  let startX, startY; // Coordinates where the drag starts
  let wrapper;
  let deltaX = 0;
  let deltaY = 0;
  // Event listener for starting the drag
  window.addEventListener("mousedown", (e) => {
    if(e.ctrlKey)return;
    if (!e.target.classList.contains("candyDoc__content")) return;
    selectedElements = [];
    isDragging = true;
    startX = e.offsetX;
    startY = e.offsetY;
    deltaX = 0;
    deltaY = 0;
    // Create a new div element and append it to the body
    wrapper = document.createElement("div");
    wrapper.id = "group__" + Date.now().toString(16);
    wrapper.classList.add("candyDoc__groupWrapper");
    const group = document.createElement("div");
    group.classList.add("target");
    group.style.width = "100%";
    group.style.height = "100%";
    group.style.position = "relative";
    wrapper.style.position = "absolute";
    wrapper.style.maxWidth = "100%";
    wrapper.style.maxHeight = "100%";
    wrapper.style.outline = "1px dashed #ffffff"; // Dashed border for visual feedback
    wrapper.style.backgroundColor = "rgba(255, 255, 255, 0.1)"; // Optional background color
    wrapper.style.width = "0px";
    wrapper.style.height = "0px";
    wrapper.append(group);
    wrapper.style.left = `${startX}px`;
    wrapper.style.top = `${startY}px`;
    e.target.append(wrapper);

    wrapper.classList.add("candyDoc__multiSelectionWrapper");
  });

  // Event listener for resizing the div while dragging
  window.addEventListener("mousemove", (e) => {
    if (isDragging) {
      deltaX += e.movementX;
      deltaY += e.movementY;
      const width = 0 + deltaX;
      const height = 0 + deltaY;

      wrapper.style.width = `${Math.abs(width)}px`;
      wrapper.style.height = `${Math.abs(height)}px`;

      // Adjust position if dragging in the reverse direction
      if (width < 0) {
        wrapper.style.left = `${startX + width}px`;
      }
      if (height < 0) {
        wrapper.style.top = `${startY + height}px`;
      }
    }
  });

  // Event listener for finishing the drag
  window.addEventListener("mouseup", (e) => {
    if (isDragging) {
      isDragging = false;
      const others = [...wrapper.parentElement.children]
        .filter((c) => !c.classList.contains("candyDoc__multiSelectionWrapper"))
        .filter((c) => !c.classList.contains("candyDoc__cursor"));
      const wrapperRect = wrapper.getBoundingClientRect();
      others.forEach((o) => {
        o.classList.remove("selected");
        if (isInside(wrapperRect, o.getBoundingClientRect(), 1)) {
          selectedElements.push(o);
        }
      });
      selectedElements.forEach((s) => s.classList.add("selected"));

      wrapper?.remove();
    }
  });
}








