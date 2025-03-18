import { createNodeWrapper } from "./nodeWrapper.js";
export function createRect() {
  const rect = document.createElement("div");
  const wrapper = createNodeWrapper();
  wrapper.id = "node__" + Date.now().toString(16);
  rect.contentEditable = "false";

  rect.classList.add("candyDoc__diagramRect", "target");
  wrapper.appendChild(rect);
  wrapper.classList.add(
    "removable",
    "resizable",
    "draggable",
    "selectable",
    
  );
  const textBox = document.createElement("div");

  textBox.contentEditable = "plaintext-only";
  textBox.classList.add("candyDoc__diagramNodeTextBox");
  rect.appendChild(textBox);
  rect.dataset.id = Date.now().toString();
  return wrapper;
}
