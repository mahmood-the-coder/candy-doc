import { findAncestor } from "../find-ancestor/index.js";

export function initDiagramLine() {
  let svg = null;
  let currentLine = null;
  let currentArrow = null;
  let isDragging = false;
  let isDraggingArrow = false;
  let startX = 0;
  let startY = 0;
  let deltaX = 0;
  let deltaY = 0;
  let origin = null;
  let end = null;
  let zoom=1
  window.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("candyDoc__diagramNodePoint")) {
      origin = e.target;
      svg =
        findAncestor(e.target, "candyDoc__diagramWrapper")?.querySelector(
          ".candyDoc__diagramSVG"
        ) ?? null;
    }

    if (e.target.classList.contains("candyDoc__diagramLineArrow")) {
      isDraggingArrow = true;
      svg = e.target.closest("svg");
      currentArrow = e.target;
      const id = currentArrow.dataset.arrow;
      currentLine = svg.querySelector(`[data-line="${id}"]`);
      startX = parseFloat(currentLine.getAttribute("x1"));
      startY = parseFloat(currentLine.getAttribute("y1"));
      return;
    }

    if (!svg) return;
    const page=document.body.querySelector(".candyDoc__page")
    const pageScale=page.getBoundingClientRect().width/page.offsetWidth
    zoom=window.devicePixelRatio * pageScale
    isDragging = true;
    deltaX = 0;
    deltaY = 0;
    startX =
      e.target.getBoundingClientRect().left +
      e.target.offsetWidth / 2 -
      svg.getBoundingClientRect().left;
    startY =
      e.target.getBoundingClientRect().top +
      e.target.offsetHeight / 2 -
      svg.getBoundingClientRect().top;
    const id = "line__" + Date.now().toString(16);
    currentArrow = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon"
    );
    currentArrow.dataset.arrow = id;
    currentArrow.classList.add("candyDoc__diagramLineArrow");
    currentArrow.setAttribute("points", "0,0 -10,-5 -10,5");
    currentArrow.setAttribute("fill", "black");
    currentArrow.setAttribute("stroke", "black");
    currentArrow.setAttribute("stroke-width", "1");
    currentLine = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    currentLine.classList.add("candyDoc__diagramLine","selectable");
    currentLine.dataset.line = id;
    currentLine.dataset.origin = origin.dataset.point;
    currentLine.dataset.fromNode = origin.parentElement.dataset.node;

    currentLine.style.stroke="black"
    currentLine.style.strokeWidth="3px"
    currentLine.style.strokeDasharray="0"
    updateArrowLinePath(
      svg,
      currentLine,
      currentArrow,
      { x: startX, y: startY },
      { x: startX, y: startY }
    );
  });

  window.addEventListener("mousemove", (e) => {
    if (!svg) return;

    if (isDraggingArrow) {
      const newX = e.clientX - svg.getBoundingClientRect().left;
      const newY = e.clientY - svg.getBoundingClientRect().top;
      updateArrowLinePath(
        svg,
        currentLine,
        currentArrow,
        { x: startX, y: startY },
        { x: newX, y: newY }
      );
      if (isOnEndPoint(e, currentLine)) {
        const endX =
          e.target.getBoundingClientRect().left +
          e.target.offsetWidth / 2 -
          svg.getBoundingClientRect().left;
        const endY =
          e.target.getBoundingClientRect().top +
          e.target.offsetHeight / 2 -
          svg.getBoundingClientRect().top;
        currentLine.dataset.end = e.target.dataset.point;
        updateArrowLinePath(
          svg,
          currentLine,
          currentArrow,
          { x: startX, y: startY },
          { x: endX, y: endY }
        );
        return;
      }
      return;
    }

    if (!isDragging) return;
    if (!currentLine) return;
    if (isOnEndPoint(e, currentLine)) {
      const endX =
        e.target.getBoundingClientRect().left +
        e.target.offsetWidth / 2 -
        svg.getBoundingClientRect().left;
      const endY =
        e.target.getBoundingClientRect().top +
        e.target.offsetHeight / 2 -
        svg.getBoundingClientRect().top;
      currentLine.dataset.end = e.target.dataset.point;
      updateArrowLinePath(
        svg,
        currentLine,
        currentArrow,
        { x: startX, y: startY },
        { x: endX, y: endY }
      );
      return;
    }
    deltaX += e.movementX/zoom;
    deltaY += e.movementY/zoom;
    updateArrowLinePath(
      svg,
      currentLine,
      currentArrow,
      { x: startX, y: startY },
      { x: startX + deltaX, y: startY + deltaY }
    );
  });

  window.addEventListener("mouseup", (e) => {
    if (isDragging) {
      isDragging = false;
      if (!isOnEndPoint(e, currentLine)) {
        currentLine?.remove();
        currentArrow?.remove();
      }
      currentLine = null;
      currentArrow = null;
      svg = null;
    }

    if (isDraggingArrow) {
      if (!isOnEndPoint(e, currentLine)) {
        currentLine?.remove()
        currentArrow?.remove()
      }
      isDraggingArrow = false;
      currentLine = null;
      currentArrow = null;
      svg = null;
    }
  });
}

function isOnEndPoint(e, currentLine) {
  return (
    e.target.classList.contains("candyDoc__diagramNodePoint") &&
    e.target.dataset.point != currentLine.dataset.origin &&
    e.target.parentElement.dataset.node != currentLine.dataset.fromNode
  );
}

export function updateArrowLinePath(
  svgContainer,
  lineElement,
  arrowElement,
  startPoint,
  endPoint
) {
  lineElement.setAttribute("x1", startPoint.x);
  lineElement.setAttribute("y1", startPoint.y);
  lineElement.setAttribute("x2", endPoint.x);
  lineElement.setAttribute("y2", endPoint.y);

  const dx = endPoint.x - startPoint.x;
  const dy = endPoint.y - startPoint.y;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  arrowElement.setAttribute(
    "transform",
    `translate(${endPoint.x}, ${endPoint.y}) rotate(${angle})`
  );

  if (!svgContainer.contains(lineElement)) {
    svgContainer.appendChild(lineElement);
  }
  if (!svgContainer.contains(arrowElement)) {
    svgContainer.appendChild(arrowElement);
  }
}
