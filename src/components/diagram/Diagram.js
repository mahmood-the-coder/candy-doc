import { findAncestor } from "../find-ancestor/index.js";
import { insert } from "../insert/index.js";
import { getAlignInspectorTools } from "../inspector/align-tools/index.js";
import { getInspectorBackgroundTools } from "../inspector/background-image-tools/index.js";
import { getInspectorBackgroundRepeatTools } from "../inspector/background-repeat-tools/index.js";
import { getInspectorBackgroundSizeTools } from "../inspector/background-size-tools/index.js";
import { getInspectorBorderColorTools } from "../inspector/border-color-tools/index.js";
import { getInspectorBorderImageTools } from "../inspector/border-image-tools/index.js";
import { getInspectorBorderRadiusTools } from "../inspector/border-radius-tools/index.js";
import { getInspectorBorderTools } from "../inspector/border-tools/index.js";
import { getInspectorBorderWidthTools } from "../inspector/border-width-tools/index.js";
import { getInspectorDiagramLinesTools } from "../inspector/diagram-lines-tools/index.js";
import { getInspectorDiagramTools } from "../inspector/diagram-nodes-tools/index.js";
import { getInspector } from "../inspector/index.js";
import { getInspectorTransformTools } from "../inspector/transform-tools/index.js";
import { initDiagramLine, updateArrowLinePath } from "./DiagramLine.js";
import { createRect } from "./DiagramRect.js";

export function insertDiagram() {
  if (isDiagramNode()) return;
  const diagramWrapper = createDiagram();
  diagramWrapper.style.zIndex = "1";
  insert(diagramWrapper);
}
function isDiagramNode() {
  const cursor = document.body.querySelector(".candyDoc__cursor");
  return cursor.parentElement?.classList.contains("diagram-node");
}

function createDiagram() {
  const diagram = createDiagramContainer();

  const rect = createRect();
  diagram.append(rect);
  rect.id = "node__" + Date.now().toString(16);

  rect.style.top = "37%";

  diagram.querySelectorAll(".diagram-node").forEach((node) => {
    node.onmousedown = (e) => {
      e.target.removeAttribute("data-offset-x");
      e.target.removeAttribute("data-offset-y");
    };
  });

  const diagramWrapper = document.createElement("div");
  diagramWrapper.classList.add(
    "candyDoc__diagramWrapper",
    "draggable",
    "removable",
    "resizable",
    "selectable"
  );
  diagramWrapper.append(diagram);
  return diagramWrapper;
}

function createDiagramContainer() {
  const container = document.createElement("div");
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  container.append(svg);
  svg.classList.add("candyDoc__diagramSVG");
  container.classList.add("candyDoc__diagram", "target");
  return container;
}

window.addEventListener("load", () => {
  window.addEventListener("mousedown",(e)=>{
    if(!e.target.classList.contains("candyDoc__diagramLine"))return;
  
    
    e.stopPropagation();
    const inspector = getInspector();
    const scrollTop = inspector.scrollTop;
    inspector.innerHTML = "";

    inspector.append(
     getInspectorDiagramLinesTools()
    );
    inspector.scrollTop = scrollTop;
  })
  window.addEventListener("mousedown", (e) => {
    if(e.target.classList.contains("candyDoc__diagramLine"))return;
    const diagram = findAncestor(e.target, "candyDoc__diagramWrapper");
    if (!diagram) return;
    const inspector = getInspector();
    const scrollTop = inspector.scrollTop;
    inspector.innerHTML = "";

    inspector.append(
      getInspectorDiagramTools(),
      getInspectorTransformTools(),
      getAlignInspectorTools(),
      getInspectorBorderTools(),
      getInspectorBorderRadiusTools(),
      getInspectorBorderWidthTools(),
      getInspectorBorderColorTools(),
      getInspectorBackgroundTools(),
      getInspectorBackgroundSizeTools(),
      getInspectorBackgroundRepeatTools(),
      getInspectorBorderImageTools()
    );
    inspector.scrollTop = scrollTop;
  });
  initDiagramLine();
  let isDragging = false;

  window.addEventListener("mousedown", (e) => {
    if (!e.target.classList.contains("candyDoc__dragHandle")) return;
    const node = findAncestor(e.target, "candyDoc__diagramNodeWrapper");
    if (!node) return;
    isDragging = true;
  });
  window.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    isDragging = false;
  });
  window.addEventListener("mousemove", (e) => {
    const node = findAncestor(e.target, "candyDoc__diagramNodeWrapper");
    if (!node) return;
    if (!isDragging) return;
    node.parentElement
      .querySelectorAll(".candyDoc__diagramLine")
      .forEach((line) => {
        const arrow = node.parentElement.querySelector(
          `[data-arrow='${line.dataset.line}']`
        );
        const endPoint = node.querySelectorAll(
          `[data-point='${line.dataset.end}']`
        );

        endPoint.forEach((end) => {
          const startPoint = node.parentElement.querySelector(
            `[data-point='${line.dataset.origin}']`
          );
          updateArrowLinePath(
            node.parentElement.querySelector(".candyDoc__diagramSVG"),
            line,
            arrow,
            {
              x:
                startPoint.getBoundingClientRect().left +
                startPoint.offsetWidth / 2 -
                node.parentElement.getBoundingClientRect().left,
              y:
                startPoint.getBoundingClientRect().top +
                startPoint.offsetHeight / 2 -
                node.parentElement.getBoundingClientRect().top,
            },
            {
              x:
                (end.getBoundingClientRect().left +
                end.offsetWidth / 2 )-
                node.parentElement.getBoundingClientRect().left,
              y:
               ( end.getBoundingClientRect().top +
                end.offsetHeight / 2) -
                node.parentElement.getBoundingClientRect().top,
            }
          );
        });
      });
    node.querySelectorAll(".candyDoc__diagramNodePoint").forEach((point) => {
      node.parentElement
        .querySelectorAll(`[data-origin='${point.dataset.point}']`)
        .forEach((line) => {
          const arrow = node.parentElement.querySelector(
            `[data-arrow='${line.dataset.line}']`
          );
          const startX =
            (point.getBoundingClientRect().left +
            point.offsetWidth / 2 )+
            -node.parentElement.getBoundingClientRect().left;
          const startY =
         (   point.getBoundingClientRect().top +
            point.offsetHeight / 2) +
            -node.parentElement.getBoundingClientRect().top;

          updateArrowLinePath(
            node.parentElement.querySelector(".candyDoc__diagramSVG"),
            line,
            arrow,
            { x: startX, y: startY },
            {
              x: getArrowPosition(arrow).translateX,
              y: getArrowPosition(arrow).translateY,
            }
          );
        });
    });
  });
});
function getArrowPosition(arrowPolygon) {
  if (!arrowPolygon || !arrowPolygon.getAttribute) {
    throw new Error("Invalid SVG polygon element.");
  }

  const transformAttr = arrowPolygon.getAttribute("transform");
  if (!transformAttr) {
    throw new Error("The polygon element does not have a transform attribute.");
  }

  // Extract translate(x, y) values
  const translateMatch = /translate\(([^,]+),\s*([^)]+)\)/.exec(transformAttr);
  if (!translateMatch) {
    throw new Error(
      "The transform attribute does not contain valid translate values."
    );
  }

  const translateX = parseFloat(translateMatch[1]);
  const translateY = parseFloat(translateMatch[2]);

  // Extract rotation angle
  const rotateMatch = /rotate\(([^)]+)\)/.exec(transformAttr);
  const rotationAngle = rotateMatch ? parseFloat(rotateMatch[1]) : 0;

  // Function to calculate rotated points based on rotation angle
  function calculateRotatedPoint(x, y) {
    const radians = (rotationAngle * Math.PI) / 180;
    const rotatedX = x * Math.cos(radians) - y * Math.sin(radians);
    const rotatedY = x * Math.sin(radians) + y * Math.cos(radians);
    return { x: rotatedX + translateX, y: rotatedY + translateY };
  }

  return {
    translateX,
    translateY,
    rotationAngle,
    calculateRotatedPoint,
  };
}
