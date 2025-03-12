import { getCenterLayoutElement } from "../../../../layout/index.js";
import { getSelected } from "../../../../selection/index.js";
import { getInspector } from "../../../index.js";
import { getInspectorShapesAttributesTools } from "../../attributes/index.js";
import { addRemoveHandle, makeDraggable } from "./functions.js";
export const curveIcon = document.createElement("div");
curveIcon.classList.add("candyDoc__icon");
curveIcon.innerHTML =
  /*html*/
  `
  <svg
  width="15px"
  height="15px"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    stroke-linecap="round"
    stroke-linejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    <path
      d="M19.14 7.72C19.43 8.47 20.15 9 21 9C22.1 9 23 8.1 23 7C23 5.9 22.1 5 21 5C20.15 5 19.43 5.53 19.14 6.28C19.09 6.27 19.05 6.25 19 6.25H15V5.5C15 4.68 14.32 4 13.5 4H10.5C9.68 4 9 4.68 9 5.5V6.25H5C4.95 6.25 4.91 6.27 4.86 6.28C4.57 5.53 3.85 5 3 5C1.9 5 1 5.9 1 7C1 8.1 1.9 9 3 9C3.85 9 4.57 8.47 4.86 7.72C4.91 7.73 4.95 7.75 5 7.75H7.57C5.52 9.27 4.25 11.79 4.25 14.5C4.25 14.67 4.26 14.83 4.28 15H4C3.17 15 2.5 15.67 2.5 16.5V18.5C2.5 19.33 3.17 20 4 20H6C6.22 20 6.42 19.95 6.61 19.86C7.13 19.64 7.5 19.11 7.5 18.5V16.5C7.5 15.67 6.83 15 6 15H5.77C5.77 14.97 5.78 14.94 5.78 14.91C5.76 14.77 5.76 14.64 5.76 14.5C5.76 12.03 7.03 9.77 9.02 8.6C9.06 9.37 9.71 10 10.5 10H13.5C14.29 10 14.94 9.37 14.99 8.6C16.98 9.77 18.25 12.04 18.25 14.5C18.25 14.64 18.24 14.77 18.23 14.91C18.23 14.94 18.24 14.97 18.24 15H18C17.17 15 16.5 15.67 16.5 16.5V18.5C16.5 19.11 16.87 19.64 17.39 19.86C17.58 19.95 17.78 20 18 20H20C20.83 20 21.5 19.33 21.5 18.5V16.5C21.5 15.67 20.83 15 20 15H19.72C19.74 14.83 19.75 14.67 19.75 14.5C19.75 11.79 18.48 9.27 16.43 7.75H19C19.05 7.75 19.09 7.73 19.14 7.72Z"
      fill="var(--color)"
    ></path>
  </g>
</svg>


`;

curveIcon.addEventListener("mousedown", (e) => {
  const selected = getSelected();
  if (!selected) return;
  if (!selected.classList.contains("candyDoc__shapeWrapper")) return;
  const SVG = selected.querySelector("svg");
  insertCurve(SVG);
});
function insertCurve(svg) {
  // Create the curve
  const id = "curve__" + Date.now().toString(16);
  const curve = document.createElementNS("http://www.w3.org/2000/svg", "path");

  curve.dataset.startX = "5";
  curve.dataset.startY = "5";
  curve.dataset.endX = "50";
  curve.dataset.endY = "50";
  curve.dataset.cp1X = "25";
  curve.dataset.cp1Y = "25";
  curve.dataset.cp2X = "25";
  curve.dataset.cp2Y = "25";
  curve.style.stroke="black"
  curve.style.strokeWidth="3"
  curve.style.fill="transparent"
  curve.style.strokeLinecap = "butt";
  curve.style.strokeLinejoin = "miter";
  curve.style.strokeDasharray = "0";
  curve.dataset.curve = id;
  curve.classList.add("candyDoc__shapeCurve", "selectable");
  curve.setAttribute(
    "d",
    `M${curve.dataset.startX},${curve.dataset.startY} C${curve.dataset.cp1X},${curve.dataset.cp1Y} ${curve.dataset.cp2X},${curve.dataset.cp2Y} ${curve.dataset.endX},${curve.dataset.endY}`
  );

  svg.appendChild(curve);

  curve.addEventListener("mousedown", (e) => {
    e.stopPropagation();
    const inspector = getInspector();
    const scrollTop = inspector.scrollTop;
    inspector.innerHTML = "";

    inspector.append(getInspectorShapesAttributesTools());
    inspector.scrollTop = scrollTop;
  });

  // Create the handles
  const startHandle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  startHandle.dataset.handle = id;
  startHandle.setAttribute("cx", parseFloat(curve.dataset.startX));
  startHandle.setAttribute("cy", parseFloat(curve.dataset.startY));
  startHandle.setAttribute("r", "5");
  startHandle.setAttribute("fill", "var(--color)");
  startHandle.setAttribute("cursor", "pointer");
  startHandle.classList.add(
    "candyDoc__curveStartHandle",
    "candyDoc__shapeHandle"
  );
  svg.appendChild(startHandle);

  const endHandle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  endHandle.dataset.handle = id;
  endHandle.setAttribute("cx", parseFloat(curve.dataset.endX));
  endHandle.setAttribute("cy", parseFloat(curve.dataset.endY));
  endHandle.setAttribute("r", "5");
  endHandle.setAttribute("fill", "var(--color)");
  endHandle.setAttribute("cursor", "pointer");
  svg.appendChild(endHandle);
  endHandle.classList.add("candyDoc__curveEndHandle", "candyDoc__shapeHandle");
  const cp1Handle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  cp1Handle.dataset.handle = id;
  cp1Handle.setAttribute("cx", parseFloat(curve.dataset.cp1X));
  cp1Handle.setAttribute("cy", parseFloat(curve.dataset.cp1Y));
  cp1Handle.setAttribute("r", "5");
  cp1Handle.setAttribute("fill", "var(--color)");
  cp1Handle.setAttribute("cursor", "pointer");
  cp1Handle.classList.add("candyDoc__curveCp1Handle", "candyDoc__shapeHandle");
  svg.appendChild(cp1Handle);

  const cp2Handle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  cp2Handle.dataset.handle = id;
  cp2Handle.setAttribute("cx", parseFloat(curve.dataset.cp2X));
  cp2Handle.setAttribute("cy", parseFloat(curve.dataset.cp2Y));
  cp2Handle.setAttribute("r", "5");
  cp2Handle.setAttribute("fill", "var(--color)");
  cp2Handle.setAttribute("cursor", "pointer");
  cp2Handle.classList.add("candyDoc__curveCp2Handle", "candyDoc__shapeHandle");
  svg.appendChild(cp2Handle);
  const {updateRemoveHandle,rect} = addRemoveHandle(
    svg,
    parseFloat(curve.dataset.endX),
    parseFloat(curve.dataset.endY),
    () => {
      startHandle.remove();
      endHandle.remove();
      curve.remove();
      cp1Handle.remove();
      cp2Handle.remove();
    },
    id
  );
  rect.classList.add("candyDoc__curveRemoveHandle")

  // Function to update the curve's position
  function updateCurve() {
    curve.setAttribute(
      "d",
      `M${curve.dataset.startX},${curve.dataset.startY} C${curve.dataset.cp2X},${curve.dataset.cp1Y} ${curve.dataset.cp2X},${curve.dataset.cp2Y} ${curve.dataset.endX},${curve.dataset.endY}`
    );
    updateRemoveHandle(
      parseFloat(curve.dataset.endX),
      parseFloat(curve.dataset.endY),
    );
  }

  // Attach drag functionality to handles
  makeDraggable(startHandle, (x, y) => {
    curve.dataset.startX = x.toString();
    curve.dataset.startY = y.toString();
    startHandle.setAttribute("cx", x);
    startHandle.setAttribute("cy", y);
    updateCurve();
  });

  makeDraggable(endHandle, (x, y) => {
    curve.dataset.endX = x.toString();
    curve.dataset.endY = y.toString();
    endHandle.setAttribute("cx", x);
    endHandle.setAttribute("cy", y);
    updateCurve();
  });
  makeDraggable(cp1Handle, (x, y) => {
    curve.dataset.cp1X = x.toString();
    curve.dataset.cp1Y = y.toString();
    cp1Handle.setAttribute("cx", x);
    cp1Handle.setAttribute("cy", y);
    updateCurve();
  });

  makeDraggable(cp2Handle, (x, y) => {
    curve.dataset.cp2X = x.toString();
    curve.dataset.cp2Y = y.toString();
    cp2Handle.setAttribute("cx", x);
    cp2Handle.setAttribute("cy", y);
    updateCurve();
  });
}

window.addEventListener("load", () => {
  setTimeout(() => {
    initCurvesAll(getCenterLayoutElement());
  }, 100);
});

export function initCurvesAll(container) {
  container.querySelectorAll(".candyDoc__shapeSVG").forEach((svg) => {
    svg.querySelectorAll(".candyDoc__shapeCurve").forEach((curve) => {
      initCurve(curve, svg);
    });
  });
}

function initCurve(curve, svg) {
  curve.addEventListener("mousedown", (e) => {
    e.stopPropagation();
  
    const inspector = getInspector();
    const scrollTop = inspector.scrollTop;
    inspector.innerHTML = "";

    inspector.append(getInspectorShapesAttributesTools());
    inspector.scrollTop = scrollTop;
  });

  const handles = [
    ...svg.querySelectorAll(`[data-handle='${curve.dataset.curve}']`),
  ];
  const startHandle = handles.find((h) =>
    h.classList.contains("candyDoc__curveStartHandle")
  );
  const endHandle = handles.find((h) =>
    h.classList.contains("candyDoc__curveEndHandle")
  );
  const cp1Handle = handles.find((h) =>
    h.classList.contains("candyDoc__curveCp1Handle")
  );
  const cp2Handle = handles.find((h) =>
    h.classList.contains("candyDoc__curveCp2Handle")
  );

  // Function to update the curve's position
  function updateCurve() {
    curve.setAttribute(
      "d",
      `M${curve.dataset.startX},${curve.dataset.startY} C${curve.dataset.cp2X},${curve.dataset.cp1Y} ${curve.dataset.cp2X},${curve.dataset.cp2Y} ${curve.dataset.endX},${curve.dataset.endY}`
    );
    updateRemoveHandle(
      parseFloat(curve.dataset.endX),
      parseFloat(curve.dataset.endY),
    );
  }

  // Drag logic for handles
  function makeDraggable(handle, updateCallback) {
    let isDragging = false;

    handle.addEventListener("mousedown", () => {
      isDragging = true;
    });

    svg.addEventListener("mousemove", (event) => {
      if (isDragging) {
        const rect = svg.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        updateCallback(mouseX, mouseY); // Update the respective point
        updateCurve(); // Update the curve's position
      }
    });

    svg.addEventListener("mouseup", () => {
      isDragging = false;
    });
  }

  // Attach drag functionality to handles
  makeDraggable(startHandle, (x, y) => {
    curve.dataset.startX = x.toString();
    curve.dataset.startY = y.toString();
    startHandle.setAttribute("cx", x);
    startHandle.setAttribute("cy", y);
  });

  makeDraggable(endHandle, (x, y) => {
    curve.dataset.endX = x.toString();
    curve.dataset.endY = y.toString();
    endHandle.setAttribute("cx", x);
    endHandle.setAttribute("cy", y);
  });
  makeDraggable(startHandle, (x, y) => {
    curve.dataset.startX = x.toString();
    curve.dataset.startY = y.toString();
    startHandle.setAttribute("cx", x);
    startHandle.setAttribute("cy", y);
  });

  makeDraggable(endHandle, (x, y) => {
    curve.dataset.endX = x.toString();
    curve.dataset.endY = y.toString();
    endHandle.setAttribute("cx", x);
    endHandle.setAttribute("cy", y);
  });
  makeDraggable(cp1Handle, (x, y) => {
    curve.dataset.cp1X = x.toString();
    curve.dataset.cp1Y = y.toString();
    cp1Handle.setAttribute("cx", x);
    cp1Handle.setAttribute("cy", y);
  });

  makeDraggable(cp2Handle, (x, y) => {
    curve.dataset.cp2X = x.toString();
    curve.dataset.cp2Y = y.toString();
    cp2Handle.setAttribute("cx", x);
    cp2Handle.setAttribute("cy", y);
  });

  const removeRect = handles.find((h) =>
    h.classList.contains("candyDoc__curveRemoveHandle")
  );
  removeRect.addEventListener("mousedown", () => {
    removeElement();
  });

  function removeElement() {
    startHandle.remove();
    endHandle.remove();
    curve.remove();
    removeRect.parentElement.remove();
    cp1Handle.remove();
    cp2Handle.remove();
  }
}

window.addEventListener("mouseup", (e) => {
   if (!getCenterLayoutElement().contains(e.target)) return;
    if (!e.target.classList.contains("candyDoc__shapeCurve")) return;
    e.stopPropagation();
  
    const inspector = getInspector();
    const scrollTop = inspector.scrollTop;
    inspector.innerHTML = "";
    inspector.append(getInspectorShapesAttributesTools());
    inspector.scrollTop = scrollTop;
});
