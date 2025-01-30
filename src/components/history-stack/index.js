import { findAncestor } from "../find-ancestor/index.js";
import {
  getHierarchyItems,
  renderHierarchy,
} from "../hierarchy-items/index.js";
import { cursor } from "../insert/cursor.js";
const undo = [];
const redo = [];
function isDifferentState(newHistory) {
  const lastHistory = undo[undo.length - 1];
  return JSON.stringify(newHistory) != JSON.stringify(lastHistory);
}
export const addHistory = () => {
  const history = captureCurrentState();
  if (isDifferentState(history)) undo.push(history);
  
};

// Update cursor positioning logic (if needed)

function captureCurrentState() {
  const runningHeaderEditor = document.body.querySelector(
    ".candyDoc__runningHeaderEditor"
  );

  const runningFooterEditor = document.body.querySelector(
    ".candyDoc__runningFooterEditor"
  );
 
  const footerData = getEditorData(runningFooterEditor);

  const headerData = getEditorData(runningHeaderEditor);
  const pagesData = getPagesData();

  return {
    pagesWrapper: pagesData,
    runningHeader: headerData,
    runningFooter: footerData,
    hierarchyItems: getHierarchyItems(),
  };
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
    .querySelectorAll(".candyDoc__cursor")
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
  return pagesWrapperClone.innerHTML;
}

function getEditorData(editor) {
  if(!editor)return "";
  const editorClone = editor.cloneNode(true);
  editorClone
    .querySelectorAll(".candyDoc__rulerHandle")
    .forEach((n) => n.remove());
  editorClone
    .querySelectorAll(".candyDoc__resizeHandle")
    .forEach((n) => n.remove());
  editorClone
    .querySelectorAll(".candyDoc__dragHandle")
    .forEach((n) => n.remove());
  editorClone
    .querySelectorAll(".candyDoc__removeIcon")
    .forEach((n) => n.remove());
  editorClone.querySelectorAll(".candyDoc__cursor").forEach((n) => n.remove());
  editorClone
    .querySelectorAll(".candyDoc__tableHandle")
    .forEach((n) => n.remove());
  editorClone
    .querySelectorAll(".candyDoc__selectIndicator")
    .forEach((n) => n.remove());
  editorClone
    .querySelectorAll(".candyDoc__gridHandle")
    .forEach((n) => n.remove());
  return editorClone.innerHTML;
}

function setHistory(history) {
  const pagesWrapperElement = document.body.querySelector(
    ".candyDoc__pagesWrapper"
  );
  pagesWrapperElement.innerHTML = history.pagesWrapper;
  const RunningHeaderEditor = document.body.querySelector(
    ".candyDoc__runningHeaderEditor"
  );
  RunningHeaderEditor.innerHTML = history.runningHeader;
  const RunningFooterEditor = document.body.querySelector(
    ".candyDoc__runningFooterEditor"
  );
  RunningFooterEditor.innerHTML = history.runningFooter;
  renderHierarchy(history?.hierarchyItems ?? []);
  const contentElement =
    document.body.querySelector(".candyDoc__content");
  if (contentElement) contentElement.append(cursor);
}

export function initHistory() {
  undo.push(captureCurrentState());
  window.addEventListener("keyup", (e) => {
    if (!e.ctrlKey) return;
    if(findAncestor(e.target,"codex-editor"))return;
    const key = e.code.toLowerCase();
    if (key === "keyz") {
      const toRedo = undo.pop();
      if (toRedo) redo.push(toRedo);
      const previousState = undo[undo.length - 1];
      if (previousState) setHistory(previousState);
    } else if (key === "keyy") {
      const toUndo = redo.pop();
      if (toUndo) {
        undo.push(toUndo);
        setHistory(toUndo);
      }
    }
  });
  let lastCapture=null;
  window.addEventListener("mousedown",()=>{
    lastCapture=captureCurrentState()
  })
  window.addEventListener("mouseup",(e)=>{
    setTimeout(() => {
      const currentCapture=captureCurrentState();
      if(JSON.stringify(lastCapture)==JSON.stringify(currentCapture))return;
      addHistory();
    }, 1);
  })
}
