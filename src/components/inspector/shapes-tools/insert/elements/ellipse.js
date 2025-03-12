import { getCenterLayoutElement } from "../../../../layout/index.js";
import { getSelected } from "../../../../selection/index.js";
import { getInspector } from "../../../index.js";
import { getInspectorShapesAttributesTools } from "../../attributes/index.js";
import {
  addRemoveHandle,
  makeDraggable,
  updateRemoveHandle,
} from "./functions.js";
export const ellipseIcon = document.createElement("div");
ellipseIcon.classList.add("candyDoc__icon");
ellipseIcon.innerHTML =
  /*html*/
  `
  <svg
  viewBox="0 0 20 20"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  fill="var(--color)"
>
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    strokeLinecap="round"
    strokeLinejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    <g id="layer1">
      <path
        d="M 10 3 C 7.5494704 3 5.3212279 3.7550444 3.6855469 5.0058594 C 2.0498658 6.2566743 1 8.0283922 1 10 C 1 11.971608 2.0498658 13.743326 3.6855469 14.994141 C 5.3212279 16.244956 7.5494704 17 10 17 C 12.45053 17 14.678772 16.244956 16.314453 14.994141 C 17.950134 13.743326 19 11.971608 19 10 C 19 8.0283922 17.950134 6.2566743 16.314453 5.0058594 C 14.678772 3.7550444 12.45053 3 10 3 z M 10 4 C 12.243891 4 14.266317 4.6990589 15.707031 5.8007812 C 17.147745 6.9025036 18 8.3817569 18 10 C 18 11.618243 17.147745 13.097496 15.707031 14.199219 C 14.266317 15.300941 12.243891 16 10 16 C 7.7561092 16 5.7336826 15.300941 4.2929688 14.199219 C 2.8522549 13.097496 2 11.618243 2 10 C 2 8.3817569 2.8522549 6.9025036 4.2929688 5.8007812 C 5.7336826 4.6990589 7.7561092 4 10 4 z "
        style="fill: var(--color); fill-opacity: 1; stroke: none; stroke-width: 0px"
      ></path>
    </g>
  </g>
</svg>

`;

ellipseIcon.addEventListener("mousedown", (e) => {
  const selected = getSelected();
  if (!selected) return;
  if (!selected.classList.contains("candyDoc__shapeWrapper")) return;
  const SVG = selected.querySelector("svg");
  insertEllipse(SVG);
});

function insertEllipse(svg) {
  // Ensure the provided SVG element is valid

  const id = "ellipse__" + Date.now().toString(16);
  // Draw the ellipse
  const ellipse = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "ellipse"
  );
  ellipse.dataset.centerX = "100";
  ellipse.dataset.centerY = "50";
  ellipse.dataset.rx = "100";
  ellipse.dataset.ry = "50";
  ellipse.setAttribute("cx", 100);
  ellipse.setAttribute("cy", 50);
  ellipse.setAttribute("rx", 100);
  ellipse.setAttribute("ry", 50);
  ellipse.style.stroke="black"
  ellipse.style.strokeWidth="3"
  ellipse.style.fill="transparent"
  ellipse.style.strokeLinecap = "butt";
  ellipse.style.strokeLinejoin = "miter";
  ellipse.dataset.ellipse = id;
  ellipse.style.strokeDasharray = "0";
  ellipse.classList.add("candyDoc__shapeEllipse", "selectable");
  svg.appendChild(ellipse);

  // Handles for interactions
  const centerHandle = createHandle(
    parseFloat(ellipse.dataset.centerX),
    parseFloat(ellipse.dataset.centerY),
    "move"
  );
  centerHandle.classList.add("candyDoc__ellipseCenterHandle");
  const horizontalHandle = createHandle(
    parseFloat(ellipse.dataset.centerX) + parseFloat(ellipse.dataset.rx),
    parseFloat(ellipse.dataset.centerY),
    "pointer"
  );
  horizontalHandle.classList.add("candyDoc__ellipseHorizontalHandle");
  const verticalHandle = createHandle(
    parseFloat(ellipse.dataset.centerX),
    parseFloat(ellipse.dataset.centerY) + parseFloat(ellipse.dataset.ry),
    "pointer"
  );
  verticalHandle.classList.add("candyDoc__ellipseVerticalHandle");
  const { updateRemoveHandle, rect } = addRemoveHandle(
    svg,
    parseFloat(ellipse.dataset.centerX),
    parseFloat(ellipse.dataset.centerY),
    () => {
      [ellipse, centerHandle, horizontalHandle, verticalHandle].forEach(
        (el) => {
          if (el.parentNode) el.parentNode.removeChild(el);
        }
      ),
        id;
    }
  );
  rect.classList.add(
    "candyDoc__ellipseRemoveHandle",
    "candyDoc__ellipseHandle"
  );
  // Append handles to the SVG
  svg.appendChild(centerHandle);
  svg.appendChild(horizontalHandle);
  svg.appendChild(verticalHandle);

  // Function to update handle positions
  function updateHandles() {
    setHandlePosition(
      horizontalHandle,
      parseFloat(ellipse.dataset.centerX) + parseFloat(ellipse.dataset.rx),
      parseFloat(ellipse.dataset.centerY)
    );
    setHandlePosition(
      verticalHandle,
      parseFloat(ellipse.dataset.centerX),
      parseFloat(ellipse.dataset.centerY) + parseFloat(ellipse.dataset.ry)
    );
    setHandlePosition(
      centerHandle,
      parseFloat(ellipse.dataset.centerX),
      parseFloat(ellipse.dataset.centerY)
    );
    updateRemoveHandle(
      parseFloat(ellipse.dataset.centerX),
      parseFloat(ellipse.dataset.centerY)
    );
  }

  // Drag logic for the center handle (reposition the ellipse)
  makeDraggable(centerHandle, (x, y) => {
    ellipse.dataset.centerX = x.toString();
    ellipse.dataset.centerY = y.toString();
    ellipse.setAttribute("cx", parseFloat(ellipse.dataset.centerX));
    ellipse.setAttribute("cy", parseFloat(ellipse.dataset.centerY));
    updateHandles();
  });

  // Drag logic for the horizontal handle (resize width of ellipse)
  makeDraggable(horizontalHandle, (x, y) => {
    ellipse.dataset.rx = Math.abs(x - parseFloat(ellipse.dataset.centerX));
    ellipse.setAttribute("rx", parseFloat(ellipse.dataset.rx));
    updateHandles();
  });

  // Drag logic for the vertical handle (resize height of ellipse)
  makeDraggable(verticalHandle, (x, y, event) => {
    ellipse.dataset.ry = Math.abs(y - parseFloat(ellipse.dataset.centerY));
    ellipse.setAttribute("ry", parseFloat(ellipse.dataset.ry));
    updateHandles();
  });

  // Create a handle
  function createHandle(cx, cy, cursor) {
    const handle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    handle.setAttribute("cx", cx);
    handle.setAttribute("cy", cy);
    handle.setAttribute("r", 5);
    handle.setAttribute("fill", "var(--color)");
    handle.style.cursor = cursor;
    handle.dataset.handle = id;
    handle.classList.add("candyDoc__ellipseHandle", "candyDoc__shapeHandle");
    return handle;
  }

  // Set handle position
  function setHandlePosition(handle, cx, cy) {
    handle.setAttribute("cx", cx);
    handle.setAttribute("cy", cy);
  }
}
window.addEventListener("mouseup", (e) => {
  if (!getCenterLayoutElement().contains(e.target)) return;
   if (!e.target.classList.contains("candyDoc__shapeEllipse")) return;
   e.stopPropagation();
 
   const inspector = getInspector();
   const scrollTop = inspector.scrollTop;
   inspector.innerHTML = "";
   inspector.append(getInspectorShapesAttributesTools());
   inspector.scrollTop = scrollTop;
});
window.addEventListener("load", () => {
  setTimeout(() => {
    initEllipsesAll(getCenterLayoutElement());
  }, 100);
});
export function initEllipsesAll(container) {
  container.querySelectorAll(".candyDoc__shapeSVG").forEach((svg) => {
    svg.querySelectorAll(".candyDoc__shapeEllipse").forEach((ellipse) => {
      initEllipse(ellipse, svg);
    });
  });
}

function initEllipse(ellipse, svg) {
  const handles = [...svg.querySelectorAll(".candyDoc__ellipseHandle")];

  // Handles for interactions
  const centerHandle = handles.find((h) =>
    h.classList.contains("candyDoc__ellipseCenterHandle")
  );
  const horizontalHandle = handles.find((h) =>
    h.classList.contains("candyDoc__ellipseHorizontalHandle")
  );
  const verticalHandle = handles.find((h) =>
    h.classList.contains("candyDoc__ellipseVerticalHandle")
  );
  const removeHandle = handles.find((h) =>
    h.classList.contains("candyDoc__ellipseRemoveHandle")
  );
  // Function to update handle positions
  function updateHandles() {
    setHandlePosition(
      horizontalHandle,
      parseFloat(ellipse.dataset.centerX) + parseFloat(ellipse.dataset.rx),
      parseFloat(ellipse.dataset.centerY)
    );
    setHandlePosition(
      verticalHandle,
      parseFloat(ellipse.dataset.centerX),
      parseFloat(ellipse.dataset.centerY) + parseFloat(ellipse.dataset.ry)
    );
    setHandlePosition(
      centerHandle,
      parseFloat(ellipse.dataset.centerX),
      parseFloat(ellipse.dataset.centerY)
    );
    updateRemoveHandle(
      removeHandle.parentElement,
      parseFloat(ellipse.dataset.centerX),
      parseFloat(ellipse.dataset.centerY)
    );
  }

  // Drag logic for the center handle (reposition the ellipse)
  makeDraggable(centerHandle, (x, y) => {
    ellipse.dataset.centerX = x.toString();
    ellipse.dataset.centerY = y.toString();
    ellipse.setAttribute("cx", parseFloat(ellipse.dataset.centerX));
    ellipse.setAttribute("cy", parseFloat(ellipse.dataset.centerY));
    updateHandles();
  });

  // Drag logic for the horizontal handle (resize width of ellipse)
  makeDraggable(horizontalHandle, (x, y) => {
    ellipse.dataset.rx = Math.abs(
      x - parseFloat(ellipse.dataset.centerX)
    ).toString();
    ellipse.setAttribute("rx", parseFloat(ellipse.dataset.rx));
    updateHandles();
  });

  // Drag logic for the vertical handle (resize height of ellipse)
  makeDraggable(verticalHandle, (x, y) => {
    ellipse.dataset.ry = Math.abs(
      y - parseFloat(ellipse.dataset.centerY)
    ).toString();
    ellipse.setAttribute("ry", parseFloat(ellipse.dataset.ry));
    updateHandles();
  });

  // Set handle position
  function setHandlePosition(handle, cx, cy) {
    handle.setAttribute("cx", cx);
    handle.setAttribute("cy", cy);
  }

  // Remove element logic
  function removeElement() {
    [centerHandle, horizontalHandle, verticalHandle,ellipse,removeHandle.parentElement].forEach((el) => {
      if (el.parentNode) el.parentNode.removeChild(el);
    });
  }

  removeHandle.addEventListener("click", removeElement);
}
