import { createColorInput } from "../../../editor-UI/color/index.js";
import { findAncestor } from "../../../find-ancestor/index.js";
 let pagesItems = []
export function getPagesItems() {
  return pagesItems;
}
export function setPagesItems(newItems) {
  pagesItems = newItems
}
export const pagesArrayWrapper = document.createElement("div");
pagesArrayWrapper.classList.add("candyDoc__inspectorPageArrayWrapper")
export const pagesArray = document.createElement("div")
pagesArray.classList.add("candyDoc__inspectorPageArray")
const pagesArrayLabel = document.createElement("div");
pagesArrayLabel.innerText = "Pages Item"
pagesArrayLabel.classList.add("candyDoc__inspectorPagesArrayLabel");
pagesArrayWrapper.append(pagesArrayLabel, pagesArray)
const addButton = document.createElement("div");

addButton.classList.add("candyDoc__inspectorPageArrayAddButton", "candyDoc__icon")
addButton.innerHTML =/*html*/
  `
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
    <g id="Edit / Add_Plus">
      <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="var(--color)" stroke-width="2" stroke-linecap="round"
        stroke-linejoin="round"></path>
    </g>
  </g>
</svg>
`

addButton.addEventListener("mousedown", () => {
  pagesItems.push({
    id: Math.random().toString(16),
    color: "#000000",
    dashArray: "0",
    width: "1",
  })
  pagesArray.innerHTML=""
  pagesItems.forEach((i, index) => {
    const newItemElement = createPageItem(i)
    newItemElement.dataset.index = index
    pagesArray.append(newItemElement)
  })
  saveTableOfContent()

})
pagesArrayWrapper.append(addButton)
export function createPageItem(item) {
  if (!item) return;
  const removeIcon = document.createElement("div");
  removeIcon.classList.add("candyDoc__icon", "candyDoc__pagesArrayRemove")
  removeIcon.innerHTML =/*html*/
    `
  <svg
  width="15px"
  height="15px"
  viewBox="0 0 16.00 16.00"
  xmlns="http://www.w3.org/2000/svg"
  fill="var(--color)"
  stroke="var(--color)"
  strokeWidth="0.00016"
>
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    strokeLinecap="round"
    strokeLinejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    <path
      fill="var(--color)"
      d="M14,3 C14.5522847,3 15,3.44771525 15,4 C15,4.55228475 14.5522847,5 14,5 L13.846,5 L13.1420511,14.1534404 C13.0618518,15.1954311 12.1930072,16 11.1479,16 L4.85206,16 C3.80698826,16 2.93809469,15.1953857 2.8579545,14.1533833 L2.154,5 L2,5 C1.44771525,5 1,4.55228475 1,4 C1,3.44771525 1.44771525,3 2,3 L5,3 L5,2 C5,0.945642739 5.81588212,0.0818352903 6.85073825,0.00548576453 L7,0 L9,0 C10.0543573,0 10.9181647,0.815882118 10.9945142,1.85073825 L11,2 L11,3 L14,3 Z M11.84,5 L4.159,5 L4.85206449,14.0000111 L11.1479,14.0000111 L11.84,5 Z M9,2 L7,2 L7,3 L9,3 L9,2 Z"
    ></path>
  </g>
</svg>
  `
  const dragIcon = document.createElement("div");
  dragIcon.classList.add("candyDoc__icon", "candyDoc__inspectorPagesArrayItemDrag")
  dragIcon.innerHTML =/*html*/
    `
  <svg
  fill="var(--color)"
  width="15px"
  height="15px"
  viewBox="-268.8 -268.8 2457.60 2457.60"
  xmlns="http://www.w3.org/2000/svg"
  stroke="var(--color)"
  stroke-width="192"
>
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    stroke-linecap="round"
    stroke-linejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    <path
      d="M600 1440c132.36 0 240 107.64 240 240s-107.64 240-240 240-240-107.64-240-240 107.64-240 240-240Zm720 0c132.36 0 240 107.64 240 240s-107.64 240-240 240-240-107.64-240-240 107.64-240 240-240ZM600 720c132.36 0 240 107.64 240 240s-107.64 240-240 240-240-107.64-240-240 107.64-240 240-240Zm720 0c132.36 0 240 107.64 240 240s-107.64 240-240 240-240-107.64-240-240 107.64-240 240-240ZM600 0c132.36 0 240 107.64 240 240S732.36 480 600 480 360 372.36 360 240 467.64 0 600 0Zm720 0c132.36 0 240 107.64 240 240s-107.64 240-240 240-240-107.64-240-240S1187.64 0 1320 0Z"
      fill-rule="evenodd"
    ></path>
  </g>
</svg>
`;
  const id = item.id
  const pageItemElement = document.createElement("div");

  pageItemElement.classList.add("candyDoc__inspectorPageItem", "candyDoc__inspectorPagesArrayItem")

  const pageColorWrapper = document.createElement("div");
  pageColorWrapper.classList.add("candyDoc__pageColorWrapper")



  const pageColor = createColorInput()
  pageColor.value = item.color;
  pageColor.style.backgroundColor = item.color;
  pageColor.style.color = item.color;
  pageColor.classList.add("candyDoc__pageColor")

  const pageDashWrapper = document.createElement("div");
  pageDashWrapper.classList.add("candyDoc__pageDashWrapper")

  const pageDashLabel = document.createElement("div");
  pageDashLabel.classList.add("candyDoc__pageDashLabel")
  pageDashLabel.innerText = "Trail Dash"

  const pageDash = document.createElement("input");
  pageColor.value = item.dashArray;
  pageDash.classList.add("candyDoc__pageDash")
  pageDash.type = "range";
  pageDash.value = 0;
  pageDash.max = 100;
  pageDash.min = 0;

  const pageWidthWrapper = document.createElement("div")
  pageWidthWrapper.classList.add("candyDoc__pageWidthWrapper")

  const pageWidth = document.createElement("input")
  pageWidth.value = item.width;
  pageWidth.classList.add("candyDoc__pageWidth")
  pageWidth.type = "range"
  pageWidth.value = 1;
  pageWidth.max = 5;
  pageWidth.min = 0;

  const pageWidthLabel = document.createElement("div");
  pageWidthLabel.innerText = "Trail Width"
  pageWidthLabel.classList.add("candyDoc__pageWidthLabel")

  pageDashWrapper.append(pageDashLabel, pageDash)
  pageWidthWrapper.append(pageWidthLabel, pageWidth)
  pageColorWrapper.append(pageColor)
  pageItemElement.append(pageWidthWrapper, pageDashWrapper, pageColorWrapper, dragIcon, removeIcon)
  pageItemElement.dataset.index = pagesItems.length;

  pageItemElement.dataset.id = id
  pageItemElement.addEventListener("input", (e) => {
    const tableOfContents = document.body.querySelectorAll(".candyDoc__tableOfContentPage");

    const itemElement = findAncestor(e.target, "candyDoc__inspectorPageItem")
    const item = pagesItems.find(i => i.id == itemElement.dataset.id);
    item.color = itemElement.querySelector(".candyDoc__pageColor").value;
    item.width = itemElement.querySelector(".candyDoc__pageWidth").value;
    item.dashArray = itemElement.querySelector(".candyDoc__pageDash").value;

    let lis = []
    tableOfContents.forEach(t => {
      lis = [...t.querySelectorAll(".candyDoc__tableOfContentItem")].filter(i => i.dataset.type != "parent");
    })
    lis.forEach((li, index) => {
      li.style.color = pagesItems[index % pagesItems.length].color
      const line = li.querySelector("line");
      if (line) {
        line.style.strokeWidth = pagesItems[index % pagesItems.length].width;
        line.style.stroke = pagesItems[index % pagesItems.length].color;
        line.style.strokeDasharray = pagesItems[index % pagesItems.length].dashArray;
      }
    })
    saveTableOfContent()

  })
  return pageItemElement
}

window.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("candyDoc__pagesArrayRemove")) {
    const id = e.target.parentElement.dataset.id;
    const index = pagesItems.findIndex(i => i.id == id);
    pagesItems.splice(index, 1)
    e.target.parentElement?.remove()
    saveTableOfContent()
  }
})

function saveTableOfContent() {
  const tableOfContent = document.body.querySelector(".candyDoc__tableOfContentPage");
  tableOfContent.dataset.tableOfContent = JSON.stringify({
    pagesLis: pagesItems,
    chapter: {

    }
    ,
    font: {

    }
  })
}