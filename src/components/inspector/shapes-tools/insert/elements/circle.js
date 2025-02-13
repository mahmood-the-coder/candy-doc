import { getCenterLayoutElement } from "../../../../layout/index.js";
import { getSelected } from "../../../../selection/index.js";
import { getInspector } from "../../../index.js";
import { getInspectorShapesAttributesTools } from "../../attributes/index.js";
import { addRemoveHandle, updateRemoveHandle } from "./functions.js";
export const circleIcon = document.createElement("div");
circleIcon.classList.add("candyDoc__icon");
circleIcon.innerHTML =
  /*html*/
  `
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    strokeLinecap="round"
    strokeLinejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    <path
      d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
      stroke="var(--color)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </g>
</svg>
`;

circleIcon.addEventListener("mousedown", (e) => {
  const selected = getSelected();
  if (!selected) return;
  if (!selected.classList.contains("candyDoc__shapeWrapper")) return;
  const svg = selected.querySelector("svg");
  insertCircle(svg);
});

function insertCircle(svg) {
  const svgNS = "http://www.w3.org/2000/svg";

  // Initial circle properties
  let centerX = 50;
  let centerY = 50;
  let radius = 50;
  const id = "circle__" + Date.now().toString(16);
  // Create the circle
  const circle = document.createElementNS(svgNS, "circle");
  circle.dataset.centerX = "50";
  circle.dataset.centerY = "50";
  circle.dataset.radius = "50";
  circle.style.stroke = "black";
  circle.style.strokeWidth = 3;
  circle.style.fill="transparent"
  circle.style.strokeLinecap = "butt";
  circle.style.strokeLinejoin = "miter";
  circle.setAttribute("cx", centerX);
  circle.setAttribute("cy", centerY);
  circle.setAttribute("r", radius);
  circle.style.strokeDasharray = "0";
  circle.dataset.circle = id;
  circle.classList.add("candyDoc__shapeCircle", "selectable");
  svg.appendChild(circle);

  // Create handles
  const outerHandle = createHandle(centerX + radius, centerY);
  outerHandle.classList.add(
    "candyDoc__circleOuterHandle",
    "candyDoc__circleHandle"
  );
  const centerHandle = createHandle(centerX, centerY);
  centerHandle.classList.add(
    "candyDoc__circleCenterHandle",
    "candyDoc__circleHandle"
  );
  outerHandle.dataset.handle = id;
  centerHandle.dataset.handle = id;
  svg.appendChild(outerHandle);
  svg.appendChild(centerHandle);

  // Add drag functionality to outer handle (resize the circle)
  outerHandle.addEventListener("mousedown", startResize);

  function startResize(e) {
    e.stopPropagation();
    const onMouseMove = (event) => {
      const rect = svg.getBoundingClientRect();
      const mouseSVGX = event.clientX - rect.left;
      radius = Math.abs(mouseSVGX - centerX);
      circle.setAttribute("r", radius);
      updateHandles();
      circle.dataset.radius = radius;
    };
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }

  // Add drag functionality to center handle (reposition the circle)
  centerHandle.addEventListener("mousedown", startDrag);

  function startDrag(e) {
    e.stopPropagation();
    const onMouseMove = (event) => {
      const rect = svg.getBoundingClientRect();
      centerX = event.clientX - rect.left;
      centerY = event.clientY - rect.top;
      circle.setAttribute("cx", centerX);
      circle.setAttribute("cy", centerY);
      updateHandles();
      circle.dataset.centerX = centerX;
      circle.dataset.centerY = centerY;
    };
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }

  // Create remove handle
  const { updateRemoveHandle, rect } = addRemoveHandle(
    svg,
    parseFloat(circle.dataset.centerX) + parseFloat(circle.dataset.radius)/2 + 5,
    parseFloat(circle.dataset.centerY) + parseFloat(circle.dataset.radius)/2 + 5,
    () => {
      circle.remove()
      outerHandle.remove();
      centerHandle.remove()
   
    },
    id
  );
  rect.classList.add(
    "candyDoc__circleRemoveHandle",
    "candyDoc__circleHandle"
  );
 

  function updateHandles() {
    outerHandle.setAttribute("cx", centerX + radius);
    outerHandle.setAttribute("cy", centerY);
    centerHandle.setAttribute("cx", centerX);
    centerHandle.setAttribute("cy", centerY);
    updateRemoveHandle(
      parseFloat(circle.dataset.centerX) +
        parseFloat(circle.dataset.radius)/2,
      parseFloat(circle.dataset.centerY) +
        parseFloat(circle.dataset.radius)/2 
    );
  }

  // Helper function to create a draggable handle
  function createHandle(x, y) {
    const handle = document.createElementNS(svgNS, "circle");
    handle.setAttribute("cx", x);
    handle.setAttribute("cy", y);
    handle.setAttribute("r", 5);
    handle.setAttribute("fill", "var(--color)");
    handle.setAttribute("cursor", "pointer");
    handle.classList.add("candyDoc__shapeHandle");
    return handle;
  }

}
window.addEventListener("mouseup", (e) => {
   if (!getCenterLayoutElement().contains(e.target)) return;
    if (!e.target.classList.contains("candyDoc__shapeCircle")) return;
    e.stopPropagation();

  
    const inspector = getInspector();
    const scrollTop = inspector.scrollTop;
    inspector.innerHTML = "";
    inspector.append(getInspectorShapesAttributesTools());
    inspector.scrollTop = scrollTop;
});
window.addEventListener("load", () => {
  setTimeout(() => {
    initCirclesAll(getCenterLayoutElement());
  }, 100);
});

export function initCirclesAll(container) {
  container.querySelectorAll(".candyDoc__shapeSVG").forEach((svg) => {
    svg.querySelectorAll(".candyDoc__shapeCircle").forEach((circle) => {
      initCircle(circle, svg);
    });
  });
}

function initCircle(circle, svg) {
  const handles = [
    ...svg.querySelectorAll(`[data-handle='${circle.dataset.circle}']`),
  ];
  // Create handles
  const outerHandle = handles.find((h) =>
    h.classList.contains("candyDoc__circleOuterHandle")
  );
  const centerHandle = handles.find((h) =>
    h.classList.contains("candyDoc__circleCenterHandle")
  );

  // Add drag functionality to outer handle (resize the circle)
  outerHandle.addEventListener("mousedown", startResize);

  function startResize(e) {
    e.stopPropagation();
    const onMouseMove = (event) => {
      const rect = svg.getBoundingClientRect();
      const mouseSVGX = event.clientX - rect.left;
      circle.dataset.radius = Math.abs(
        mouseSVGX - parseFloat(circle.dataset.centerX)
      );
      circle.setAttribute("r", parseFloat(circle.dataset.radius));
      updateHandles();
    };
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }

  // Add drag functionality to center handle (reposition the circle)
  centerHandle.addEventListener("mousedown", startDrag);

  function startDrag(e) {
    e.stopPropagation();
    const onMouseMove = (event) => {
      const rect = svg.getBoundingClientRect();
      circle.dataset.centerX = (event.clientX - rect.left).toString();
      circle.dataset.centerY = (event.clientY - rect.top).toString();
      circle.setAttribute("cx", parseFloat(circle.dataset.centerX));
      circle.setAttribute("cy", parseFloat(circle.dataset.centerY));
      updateHandles();
    };
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }

  // Create remove handle
  const removeHandle = handles.find((h) =>
    h.classList.contains("candyDoc__circleRemoveHandle")
  );

  function updateHandles() {
    const centerX = parseFloat(circle.dataset.centerX);
    const centerY = parseFloat(circle.dataset.centerY);
    const radius = parseFloat(circle.dataset.radius);
    outerHandle.setAttribute("cx", centerX + radius);
    outerHandle.setAttribute("cy", centerY);
    centerHandle.setAttribute("cx", centerX);
    centerHandle.setAttribute("cy", centerY);
    updateRemoveHandle(removeHandle.parentElement, centerX, centerY);
  }

  // Helper function to create a draggable handle

  // Helper function to create and update the remove handle
  removeHandle.addEventListener("click", () => {
    circle.remove();
    outerHandle.remove()
    centerHandle.remove()
    removeHandle.parentElement.remove()
  });

  
}
