import { findAncestor } from "../find-ancestor/index.js";
import { createHierarchyItemElement } from "../hierarchy-item-element/index.js";
import { container } from "../hierarchy/elements/container.js";
import { getCenterLayoutElement } from "../layout/index.js";
let hierarchyItems = [
  {
    index: 0,
    id: "0",
    number: 1,
    name: "page 1",
    type: "page",
    innerHTML: /*html*/ `
    `,
    parentId: "1",
  },
  {
    index: 1,
    id: "1",
    number: 1,
    name: "chapter 1",
    type: "parent",
    parentId: null,
  },
];
export function getHierarchyItems() {
  return hierarchyItems;
}
export function setHierarchyITems(newItems) {
  hierarchyItems = newItems;
}
export function sortHierarchyItems() {
  const itemElements = [
    ...container.querySelectorAll(".candyDoc__hierarchyItemWrapper"),
  ];
  hierarchyItems = itemElements
    .filter((el) => el?.dataset?.id)
    .map((el, index) => {
      const page = getCenterLayoutElement().querySelector(
        `[data-page-id='${el.dataset.id}']`
      );

      return {
        index: index,
        id: el.dataset.id,
        number: index + 1,
        name: el.dataset.type == "page" ? "page " + (index + 1) : "new chapter",
        type: el.dataset.type,
        innerHTML: page?.innerHTML ?? null,
        parentId:
          findAncestor(el, "candyDoc__hierarchyItemWrapper")?.dataset?.id ??
          null,
      };
    });
    
    
}
 
export function renderHierarchy(items) {

  container.innerHTML = "";
  items.forEach((item) => {
   
    
    const clone = createHierarchyItemElement(item);
    const nest = clone.querySelector(".nest");
    items
      .filter((i) => i?.parentId == item.id)
      .forEach((c) => {
        const nested = createHierarchyItemElement(c);
        nest.append(nested);
      });

    if (!item.parentId) container.append(clone);
  });
}


export function removeItem(index)
{
  hierarchyItems.splice(index,1)
  
}