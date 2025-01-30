import { findAncestor } from "../find-ancestor/index.js";
import { isInside } from "../intersection/index.js";
import { getCenterLayoutElement } from "../layout/index.js";
import { createNodeWrapper } from "./nodeWrapper.js";
export function createBraces() {
  const braces = document.createElement("div");
  const wrapper = createNodeWrapper();
  wrapper.dataset.children = "[]";
  wrapper.id = "node__" + Date.now().toString(16);
  wrapper.appendChild(braces);
  braces.classList.add("candyDoc__diagramBraces", "target");
  wrapper.classList.add(
    "removable",
    "resizable",
    "draggable",
    "selectable",
    "diagram-node",
    "braces"
  );

  braces.dataset.id = Date.now().toString();
  let currentBrace = null;
  window.onmousedown = (e) => {
    if (e.target.classList.contains("candyDoc__diagramBraces"))
      currentBrace = e.target;
    else if (findAncestor(e.target, "candyDoc__diagramBraces"))
      currentBrace = findAncestor(e.target, "candyDoc__diagramBraces");
    if(currentBrace)
    setZIndex(currentBrace)
  };
  window.onmouseup = (e) => {
    if (currentBrace) setZIndex(currentBrace);
  };
  window.onmousemove = (e) => {
    if (currentBrace) setZIndex(currentBrace);
  };

   

  return wrapper;
}
function setZIndex(container) {
  const nodes = getCenterLayoutElement().querySelectorAll(".diagram-node");
  nodes.forEach((node) => {
    if (node.dataset.id == container.dataset.id) return;

    if (
      isInside(container.getBoundingClientRect(), node.getBoundingClientRect())
    ) {
      node.style.zIndex = parseInt(container.style.zIndex) + 1;
    }
  });
}
