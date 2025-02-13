import { findAncestor } from "../find-ancestor/index.js";
import { createHierarchyItemElement } from "../hierarchy-item-element/index.js";
import { container } from "../hierarchy/elements/container.js";
import { getCenterLayoutElement } from "../layout/index.js";
import { userData } from "../user-data/userData.js";

export function sortHierarchyItems() {
  const itemElements = [
    ...container.querySelectorAll(".candyDoc__hierarchyItemWrapper"),
  ];
  userData.hierarchyItems = itemElements
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


