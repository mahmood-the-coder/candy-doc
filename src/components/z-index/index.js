import { isCollide } from "../collision/index.js";

export function setZIndex(target,othersClassName="draggable") {
  if (target.classList.contains("braces")) return;
  if (window.getComputedStyle(target).zIndex == "auto") {
    target.style.zIndex = "1";
  }
  let nodes = target.parentElement.querySelectorAll("."+othersClassName);
  nodes = [...nodes].filter(
    (n) => n.id != target.id
  );
  nodes.forEach((node) => {
    if (
      isCollide(target.getBoundingClientRect(), node.getBoundingClientRect())
    ) {
      target.style.zIndex = parseInt(window.getComputedStyle(node).zIndex) + 1;
    }
  });
}
