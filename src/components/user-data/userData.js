import { save } from "../DB/save.js";
import { load } from "../DB/load.js";
import { getHierarchyItems } from "../hierarchy-items/index.js";
import { cursor } from "../insert/cursor.js";


export const userData = {
  id: "user-data",
  pagesWrapper: "",
  runningHeader: "",
  runningFooter: "",
  hierarchyItems: [],
  editorsJs:[]
};

export function initUserData() {
  load("user-data")
    .then((data) => {
      const pagesWrapperElement = document.body.querySelector(
        ".candyDoc__pagesWrapper"
      );
      pagesWrapperElement.innerHTML = data.pagesWrapper;
      const RunningHeaderEditor=document.body.querySelector(".candyDoc__runningHeaderEditor");
      RunningHeaderEditor.innerHTML=data.runningHeader;
      const RunningFooterEditor=document.body.querySelector(".candyDoc__runningFooterEditor");
      RunningFooterEditor.innerHTML=data.runningFooter;
      userData.editorsJs=data.editorsJs        
    })
    .catch(() => {
      const pagesWrapperElement = document.body.querySelector(
        ".candyDoc__pagesWrapper"
      );
      userData.pagesWrapper = pagesWrapperElement.innerHTML;
     
      userData.hierarchyItems = getHierarchyItems();

      const runningHeaderEditor=document.body.querySelector(".candyDoc__runningHeaderEditor");
      userData.runningHeader=runningHeaderEditor?.innerHTML??"";
      const runningFooterEditor=document.body.querySelector(".candyDoc__runningFooterEditor");
      userData.runningFooter=runningFooterEditor?.innerHTML??"";
      save(userData);
    })
    .finally(() => {
      const content =
        document.body.querySelector(".candyDoc__content");
      content.append(cursor);
    });

  initSave();
}
function initSave() {
  
  window.addEventListener("mouseup", (e) => {
    setTimeout(() => {
      const pagesWrapper = document.body.querySelector(
        ".candyDoc__pagesWrapper"
      );
      if (pagesWrapper?.innerHTML != userData?.pagesWrapper)
        setPagesData(pagesWrapper);
      const runningHeaderEditor = document.body.querySelector(
        ".candyDoc__runningHeaderEditor"
      );
      if (runningHeaderEditor?.innerHTML != userData?.runningHeader)
        if(runningHeaderEditor)
        setRunningHeaderData(runningHeaderEditor);
      const runningFooterEditor = document.body.querySelector(
        ".candyDoc__runningFooterEditor"
      );
      if (runningFooterEditor?.innerHTML != userData?.runningFooter)
        if(runningFooterEditor)
        setRunningFooterData(runningFooterEditor);

      save(userData);
    }, 10);
  });
  window.addEventListener("keyup", (e) => {
    setTimeout(() => {
      const pagesWrapper = document.body.querySelector(
        ".candyDoc__pagesWrapper"
      );
      if (pagesWrapper.innerHTML != userData.pagesWrapper)
        setPagesData(pagesWrapper);
      const runningHeaderEditor = document.body.querySelector(
        ".candyDoc__runningHeaderEditor"
      );
      if (runningHeaderEditor?.innerHTML != userData.runningHeader)
        setRunningHeaderData(runningHeaderEditor);
      const runningFooterEditor = document.body.querySelector(
        ".candyDoc__runningFooterEditor"
      );
      if (runningFooterEditor?.innerHTML != userData.runningFooter)
        setRunningFooterData(runningFooterEditor);
      save(userData);
    }, 10);
  });
}
function setPagesData(pagesWrapper) {
  const pagesWrapperClone = pagesWrapper.cloneNode(true);
  pagesWrapperClone.querySelectorAll(".candyDoc__runningEditor").forEach(re=>re.remove())
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
 
  userData.pagesWrapper = pagesWrapperClone.innerHTML;
  userData.hierarchyItems = getHierarchyItems();
}

function setRunningHeaderData(editor) {
  if(!editor)return;
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

  userData.runningHeader = editorClone.innerHTML;
}
function setRunningFooterData(editor) {
  if(!editor)return;
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
  
  userData.runningFooter = editorClone.innerHTML;
}