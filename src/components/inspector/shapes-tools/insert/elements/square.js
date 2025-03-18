import { getCenterLayoutElement } from "../../../../layout/index.js";
import { getSelected } from "../../../../selection/index.js";
import { getInspector } from "../../../index.js";
import { getInspectorShapesAttributesTools } from "../../attributes/index.js";
import {
  addRemoveHandle,
  makeDraggable,
  updateRemoveHandle,
} from "./functions.js";
export const squareIcon = document.createElement("div");
squareIcon.classList.add("candyDoc__icon");
squareIcon.innerHTML =
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
    <rect
      parseFloat(square.dataset.x)="4"
      y="4"
      width="16"
      height="16"
      rx="2"
      stroke="var(--color)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></rect>
  </g>
</svg>

`;

squareIcon.addEventListener("mousedown", (e) => {
  const selected = getSelected();
  if (!selected) return;
  if (!selected.classList.contains("candyDoc__shapeWrapper")) return;
  const SVG = selected.querySelector("svg");
  insertSquare(SVG);
});

function insertSquare(svg) {
  // Create the SVG element if not already passed in
  svg = typeof svg === "string" ? document.querySelector(svg) : svg;

  const id = "square__" + Date.now().toString(16);
  // Create the square
  const square = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  square.setAttribute("x", 5);
  square.setAttribute("y", 5);
  square.setAttribute("width", 50);
  square.setAttribute("height", 50);
  square.style.stroke = "black";
  square.style.strokeWidth = "3";
  square.style.fill = "transparent";
  square.style.strokeLinecap = "butt";
  square.style.strokeLinejoin = "miter";
  square.style.strokeDasharray = "0";
  square.classList.add("candyDoc__shapeSquare");
  svg.appendChild(square);
  square.dataset.square = id;
  square.dataset.x = "5";
  square.dataset.y = "5";
  square.dataset.width = "50";
  square.dataset.height = "50";
  // Create handles
  const repositionHandle = createHandle(
    parseFloat(square.dataset.x) + parseFloat(square.dataset.width) / 2,
    parseFloat(square.dataset.y) + parseFloat(square.dataset.height) / 2,
    "move"
  );
  const widthHandle = createHandle(
    parseFloat(square.dataset.x) + parseFloat(square.dataset.width),
    parseFloat(square.dataset.y) + parseFloat(square.dataset.height) / 2,
    "ew-resize"
  );
  const heightHandle = createHandle(
    parseFloat(square.dataset.x) + parseFloat(square.dataset.width) / 2,
    parseFloat(square.dataset.y) + parseFloat(square.dataset.height),
    "ns-resize"
  );
  repositionHandle.classList.add("candyDoc__squareRepositionHandle");
  widthHandle.classList.add("candyDoc__squareWidthHandle");
  heightHandle.classList.add("candyDoc__squareHeightHandle");
  // Function to create a draggable handle
  function createHandle(cx, cy, cursor) {
    const handle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    handle.setAttribute("cx", cx);
    handle.setAttribute("cy", cy);
    handle.setAttribute("r", 5);
    handle.setAttribute("fill", "var(--color)");
    handle.setAttribute("cursor", cursor);
    handle.classList.add("candyDoc__shapeHandle");
    svg.appendChild(handle);
    handle.dataset.handle = id;
    return handle;
  }

  // Update positions of handles
  function updateHandles() {
    repositionHandle.setAttribute(
      "cx",
      parseFloat(square.dataset.x) + parseFloat(square.dataset.width) / 2
    );
    repositionHandle.setAttribute(
      "cy",
      parseFloat(square.dataset.y) + parseFloat(square.dataset.height) / 2
    );
    widthHandle.setAttribute(
      "cx",
      parseFloat(square.dataset.x) + parseFloat(square.dataset.width)
    );
    widthHandle.setAttribute(
      "cy",
      parseFloat(square.dataset.y) + parseFloat(square.dataset.height) / 2
    );
    heightHandle.setAttribute(
      "cx",
      parseFloat(square.dataset.x) + parseFloat(square.dataset.width) / 2
    );
    heightHandle.setAttribute(
      "cy",
      parseFloat(square.dataset.y) + parseFloat(square.dataset.height)
    );
  }

  // Create the remove handle and update function
  const { updateRemoveHandle, rect } = addRemoveHandle(
    svg,
    parseFloat(square.dataset.x) + parseFloat(square.dataset.width),
    parseFloat(square.dataset.y) + parseFloat(square.dataset.height),
    () => {
      square.remove();
      heightHandle.remove();
      widthHandle.remove();
      repositionHandle.remove();
    },
    id
  );

  rect.classList.add("candyDoc__shapeHandle", "candyDoc__squareRemoveHandle");
  // Update the rectangle
  function updateRect() {
    square.setAttribute("x", parseFloat(square.dataset.x));
    square.setAttribute("y", square.dataset.y);
    square.setAttribute("width", parseFloat(square.dataset.width));
    square.setAttribute("height", parseFloat(square.dataset.height));
    updateHandles();
    updateRemoveHandle(
      parseFloat(square.dataset.x) + parseFloat(square.dataset.width),
      parseFloat(square.dataset.y) + parseFloat(square.dataset.height)
    );
  }

  // Drag logic for handles

  // Attach drag functionality to handles
  makeDraggable(repositionHandle, (x, y) => {
    square.dataset.x = x - parseFloat(square.dataset.width) / 2; // Update x
    square.dataset.y = y - parseFloat(square.dataset.height) / 2;
    updateHandles();
    updateRect(); // Update y
  });

  makeDraggable(widthHandle, (x, y) => {
    square.dataset.width = Math.max(10, x - parseFloat(square.dataset.x));
    updateHandles();
    updateRect(); // Ensure minimum width
  });

  makeDraggable(heightHandle, (x, y) => {
    square.dataset.height = Math.max(10, y - parseFloat(square.dataset.y));
    updateHandles();
    updateRect(); // Ensure minimum height
  });
}

window.addEventListener("load", () => {
  setTimeout(() => {
    initSquareAll(getCenterLayoutElement());
  }, 100);


});

export function initSquareAll(container) {


  container.querySelectorAll(".candyDoc__shapeSVG").forEach((svg) => {
     
    svg.querySelectorAll(".candyDoc__shapeSquare").forEach((square) => {
      initSquare(square, svg);
      console.log(square);

    });
  });
}

function initSquare(square, svg) {
  const handles = [
    ...svg.querySelectorAll(`[data-handle='${square.dataset.square}']`),
  ];

  // Create handles
  const repositionHandle = handles.find((h) =>
    h.classList.contains("candyDoc__squareRepositionHandle")
  );
  const widthHandle = handles.find((h) =>
    h.classList.contains("candyDoc__squareWidthHandle")
  );
  const heightHandle = handles.find((h) =>
    h.classList.contains("candyDoc__squareHeightHandle")
  );
  const removeHandle = handles.find((h) =>
    h.classList.contains("candyDoc__squareRemoveHandle")
  );

  // Update positions of handles
  function updateHandles() {
    repositionHandle.setAttribute(
      "cx",
      parseFloat(square.dataset.x) + parseFloat(square.dataset.width) / 2
    );
    repositionHandle.setAttribute(
      "cy",
      parseFloat(square.dataset.y) + parseFloat(square.dataset.height) / 2
    );
    widthHandle.setAttribute(
      "cx",
      parseFloat(square.dataset.x) + parseFloat(square.dataset.width)
    );
    widthHandle.setAttribute(
      "cy",
      parseFloat(square.dataset.y) + parseFloat(square.dataset.height) / 2
    );
    heightHandle.setAttribute(
      "cx",
      parseFloat(square.dataset.x) + parseFloat(square.dataset.width) / 2
    );
    heightHandle.setAttribute(
      "cy",
      parseFloat(square.dataset.y) + parseFloat(square.dataset.height)
    );
    updateRemoveHandle(
      removeHandle.parentElement,
      parseFloat(square.dataset.x) + parseFloat(square.dataset.width),
      parseFloat(square.dataset.y) + parseFloat(square.dataset.height)
    );
  }

  // Create the remove handle and update function

  // Remove logic
  function removeElement() {
    square.remove();
    repositionHandle.remove();
    widthHandle.remove();
    heightHandle.remove();
    removeHandle.parentElement.remove();
  }

  removeHandle.addEventListener("click", removeElement);

  function updateRect() {
    square.setAttribute("x", parseFloat(square.dataset.x));
    square.setAttribute("y", parseFloat(square.dataset.y));
    square.setAttribute("width", parseFloat(square.dataset.width));
    square.setAttribute("height", parseFloat(square.dataset.height));
    updateHandles();
  }

  // Attach drag functionality to handles
  makeDraggable(repositionHandle, (x, y) => {
    square.dataset.x = x - parseFloat(square.dataset.width) / 2; // Update x
    square.dataset.y = y - parseFloat(square.dataset.height) / 2;
    updateHandles();
    updateRect(); // Update y
  });

  makeDraggable(widthHandle, (x, y) => {
    square.dataset.width = Math.max(10, x - parseFloat(square.dataset.x));
    updateHandles();
    updateRect(); // Ensure minimum width
  });

  makeDraggable(heightHandle, (x, y) => {
    square.dataset.height = Math.max(10, y - parseFloat(square.dataset.y));
    updateHandles();
    updateRect(); // Ensure minimum height
  });
}

window.addEventListener("mouseup", (e) => {
  if (!getCenterLayoutElement().contains(e.target)) return;
  if (!e.target.classList.contains("candyDoc__shapeSquare")) return;
  e.stopPropagation();


  const inspector = getInspector();
  const scrollTop = inspector.scrollTop;
  inspector.innerHTML = "";
  inspector.append(getInspectorShapesAttributesTools());
  inspector.scrollTop = scrollTop;

});
