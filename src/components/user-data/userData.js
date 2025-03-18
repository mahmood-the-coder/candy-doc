import { save } from "../DB/save.js";
import { load } from "../DB/load.js";
import { cursor } from "../insert/cursor.js";
import { hierarchyContainer } from "../hierarchy/elements/container.js";
import { getHierarchyItems } from "../hierarchy/elements/getHierarchyItems.js";


export const userData = {
  id: "user-data",
  pagesWrapper: "",
  hierarchyItems: [{
    index: 0,
    id: "0",
    number: 1,
    name: "new page",
    type: "page",
    parentId: null,
    innerHTML: ""
  }],
  editorsJs: []
};

export function initLoad() {
  window.addEventListener("load", () => {
    load("user-data")
      .then((data) => {
        const pagesWrapperElement = document.body.querySelector(
          ".candyDoc__pagesWrapper"
        );
        pagesWrapperElement.innerHTML = data.pagesWrapper;
        userData.editorsJs = data.editorsJs
      })
      .catch(() => {
        const pagesWrapper = document.body.querySelector(
          ".candyDoc__pagesWrapper"
        );
        userData.pagesWrapper = pagesWrapper.innerHTML;
        save(userData);
      })
      .finally(() => {
        const content =
          document.body.querySelector(".candyDoc__content");
        if (!document.body.querySelector(".candyDoc__cursor"))
          content?.append(cursor);
      });
  })

}
export function initSave() {

  window.addEventListener("load",()=>{
    saveData()
  })
  window.addEventListener("mouseup", (e) => {
    saveData();
  });
  window.addEventListener("keyup", (e) => {
    saveData()
  });
}
function saveData() {
  setTimeout(() => {
    userData.hierarchyItems=getHierarchyItems(hierarchyContainer)
    const pagesWrapper = document.body.querySelector(
      ".candyDoc__pagesWrapper"
    );
    if (pagesWrapper?.innerHTML != userData?.pagesWrapper)
      setPagesData(pagesWrapper);
    save(userData);

  }, 100);
}



function setPagesData(pagesWrapper) {
  const pagesWrapperClone = pagesWrapper.cloneNode(true);
  pagesWrapperClone.querySelectorAll(".ce-toolbar__actions").forEach(t => t.remove())
  pagesWrapperClone.querySelectorAll(".ce-popover__container").forEach(t => t.remove())
  pagesWrapperClone.querySelectorAll(".candyDoc__tableCellTransformedIcon").forEach(t => t.remove())
  pagesWrapperClone.querySelectorAll(".candyDoc__runningEditor").forEach(re => re.remove())
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

}

