import { renderHierarchy } from "../hierarchy-items/index.js";
import { container } from "../hierarchy/elements/container.js";

let history = [];
let redoStack = [];

function saveState(state) {
    history.push(state);
    redoStack = []; 
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
    document.body.querySelector(".candyDoc__pagesWrapper").innerHTML=state.pages
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
    return pagesWrapperClone.innerHTML;
  }
  
export function initHistoryStack()
{
    window.addEventListener("mouseup",(e)=>{
        setTimeout(() => {
            
            saveState({pages:getPagesData(),hierarchyItems:getHierarchyItems(container)})
        }, 10);
      })
    
      window.addEventListener("keyup",(e)=>{
        if(e.ctrlKey && e.code=="KeyZ")
        {
            undo()
        }
        else if(e.ctrlKey && e.code=="KeyY")
        {
            redo()
        }
      })
}


   function getHierarchyItems(container) {
    return [...container.querySelectorAll(".candyDoc__hierarchyItemWrapper")].filter(item => !item.classList.contains("candyDoc__hierarchyDummy")).map((item,index) => {
      return {
        id: item.dataset.id,
        index:index,
        number:(index+1).toString(),
        name: item.querySelector("input")?.value??"",
        parentId: item?.parentElement?.dataset?.id ?? null,
        innerHTML: document.body.querySelector(`[data-page-id='${item.dataset.id}']`)?.innerHTML??"",
        type:item.dataset.type
      };
    });
   
    
  
  }