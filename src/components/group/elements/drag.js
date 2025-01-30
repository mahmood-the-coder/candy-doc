import { findAncestor } from "../../find-ancestor/index.js";
import { getAlignInspectorTools } from "../../inspector/align-tools/index.js";
import { getInspectorBackgroundTools } from "../../inspector/background-image-tools/index.js";
import { getInspectorBackgroundRepeatTools } from "../../inspector/background-repeat-tools/index.js";
import { getInspectorBackgroundSizeTools } from "../../inspector/background-size-tools/index.js";
import { getInspectorBorderColorTools } from "../../inspector/border-color-tools/index.js";
import { getInspectorBorderImageTools } from "../../inspector/border-image-tools/index.js";
import { getInspectorBorderRadiusTools } from "../../inspector/border-radius-tools/index.js";
import { getInspectorBorderTools } from "../../inspector/border-tools/index.js";
import { getInspectorBorderWidthTools } from "../../inspector/border-width-tools/index.js";
import { getInspector } from "../../inspector/index.js";
import { getInspectorTransformTools } from "../../inspector/transform-tools/index.js";
import { isInside } from "../../intersection/index.js";
import { getCenterLayoutElement } from "../../layout/index.js";
export function initGroupDrag() {
  let isDragging = false;
  let startX, startY; // Coordinates where the drag starts
  let wrapper;
  let deltaY = 0;
  let deltaX=0
  let zoom=1
  // Event listener for starting the drag
  window.addEventListener("mousedown", (e) => {
    if (
      !e.target?.classList?.contains("candyDoc__content") &&
      !e.target?.classList?.contains("candyDoc__group") &&
      !findAncestor(e.target,"candyDoc__group")
    )
      return;
    if (!e.shiftKey) return;
    isDragging = true;
    startX = e.offsetX;
    startY = e.offsetY;
    deltaX = 0;
    deltaY = 0;
    const page=document.body.querySelector(".candyDoc__pagesWrapper")
  zoom=window.devicePixelRatio * (page.getBoundingClientRect().width/page.offsetWidth);
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
    wrapper.style.outline = "1px dashed rgba(255, 255, 255, 0.7)"; // Dashed border for visual feedback
    wrapper.style.backgroundColor = "rgba(255, 255, 255, 0.7)"; // Optional background color
    wrapper.style.width = "0px";
    wrapper.style.height = "0px";
    wrapper.append(group);
    wrapper.style.left = `${startX}px`;
    wrapper.style.top = `${startY}px`;
    e.target.append(wrapper);

    wrapper.classList.add(
      "selectable",
      "draggable",
      "removable",
      "resizable",
      "candyDoc__group"
    );
    wrapper.addEventListener("mousedown", () => {
      const inspector = getInspector();
      const scrollTop = inspector.scrollTop;
      inspector.innerHTML = "";
      getInspector().append(
        getInspectorTransformTools(),
        getAlignInspectorTools(),
        getInspectorBorderTools(),
        getInspectorBorderColorTools(),
        getInspectorBorderRadiusTools(),
        getInspectorBorderWidthTools(),
        getInspectorBackgroundTools(),
        getInspectorBackgroundSizeTools(),
        getInspectorBackgroundRepeatTools(),
        getInspectorBorderImageTools()
      );
      inspector.scrollTop = scrollTop;
    });
  });

  // Event listener for resizing the div while dragging
  window.addEventListener("mousemove", (e) => {
    if (isDragging) {
      deltaX += e.movementX/zoom;
      deltaY += e.movementY/zoom;
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
      wrapper.style.outline = "1px solid #ffffff"; // Solid border after drag
      wrapper.style.backgroundColor = "transparent"; // Solid border after drag
      const wrapperRect = wrapper.getBoundingClientRect();
      const others = [
        ...getCenterLayoutElement().querySelectorAll(".draggable"),
      ].filter((d) => d.id != wrapper.id);
      others.forEach((o) => {
        const otherRect = o.getBoundingClientRect();
        if (isInside(wrapperRect, otherRect)) {
          wrapper.append(o);
          const x =
            wrapper.parentElement.getBoundingClientRect().left -
            wrapper.getBoundingClientRect().left +
            o.offsetLeft;
          const y =
            wrapper.parentElement.getBoundingClientRect().top -
            wrapper.getBoundingClientRect().top +
            o.offsetTop;
          o.style.left = x + "px";
          o.style.top = y + "px";
        }
      });
    }
  });
}
