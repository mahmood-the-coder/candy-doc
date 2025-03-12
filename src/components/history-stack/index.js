import { findAncestor } from "../find-ancestor/index.js";
import { renderHierarchy } from "../hierarchy-items/index.js";
import { hierarchyContainer } from "../hierarchy/elements/container.js";
import { getSelected } from "../selection/index.js";

let history = [];
let redoStack = [];

function saveState() {
  let previousState = history[history.length-1]

  let currentState = { pages: getPagesData(), hierarchyItems: getHierarchyItems(hierarchyContainer) }
  if (JSON.stringify(currentState) != JSON.stringify(previousState)) {
    history.push(currentState);
    redoStack = [];

  }

}

function undo() {
  if (history.length > 1) {
    redoStack.push(history.pop());
    applyState(history[history.length - 1]);
  }
}

function redo() {
  if (redoStack.length > 0) {
    let state = redoStack.pop();
    history.push(state);
    applyState(state);
  }
}

function applyState(state) {
  document.body.querySelector(".candyDoc__pagesWrapper").innerHTML = state.pages
  renderHierarchy(state.hierarchyItems)

}

function getPagesData() {
  const pagesWrapperElement = document.body.querySelector(
    ".candyDoc__centerLayoutElement"
  );
  const pagesWrapperClone = pagesWrapperElement.cloneNode(true);
  pagesWrapperClone
    .querySelectorAll(".candyDoc__rulerHandle")
    .forEach((n) => n.remove());
  pagesWrapperClone
    .querySelectorAll(".candyDoc__resizeHandle")
    .forEach((n) => n.remove());
  pagesWrapperClone
    .querySelectorAll(".candyDoc__dragHandle")
    .forEach((n) => n.remove());
  pagesWrapperClone
    .querySelectorAll(".candyDoc__removeIcon")
    .forEach((n) => n.remove());
  pagesWrapperClone
    .querySelectorAll(".candyDoc__tableHandle")
    .forEach((n) => n.remove());
  pagesWrapperClone
    .querySelectorAll(".candyDoc__selectIndicator")
    .forEach((n) => n.remove());
  pagesWrapperClone
    .querySelectorAll(".candyDoc__gridHandle")
    .forEach((n) => n.remove());
  pagesWrapperClone.querySelector(".candyDoc__insertToolsWrapper")?.remove()
  return pagesWrapperClone.innerHTML;
}

export function initHistoryStack() {
  saveState()
  window.addEventListener("mouseup",(e)=>{
    setTimeout(() => {
      saveState()
    }, 20);
  })
  window.addEventListener("keyup", (e) => {
    if (e.ctrlKey && e.code == "KeyZ" && document.activeElement && !findAncestor(document.activeElement,"candyDoc__textBoxWrapper")) {
      undo()
    }
    else if (e.ctrlKey && e.code == "KeyY"  && document.activeElement && !findAncestor(document.activeElement,"candyDoc__textBoxWrapper")) {
      redo()
    }
  })
}


function getHierarchyItems(container) {
  return [...container.querySelectorAll(".candyDoc__hierarchyItemWrapper")].filter(item => !item.classList.contains("candyDoc__hierarchyDummy")).map((item, index) => {
    return {
      id: item.dataset.id,
      index: index,
      number: (index + 1).toString(),
      name: item.querySelector("input")?.value ?? "",
      parentId: item?.parentElement?.dataset?.id ?? null,
      innerHTML: document.body.querySelector(`[data-page-id='${item.dataset.id}']`)?.innerHTML ?? "",
      type: item.dataset.type
    };
  });



}