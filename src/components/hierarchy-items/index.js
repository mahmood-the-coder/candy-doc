import { createHierarchyItemElement } from "../hierarchy-item-element/index.js";
import { container } from "../hierarchy/elements/container.js";
import { setHierarchySelect } from "../hierarchy/elements/select.js";




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
        if (c.selected == "true") {
          nested.style.outline = "2px solid var(--color)"
        }
      });


    if (!item.parentId) container.append(clone);
    if (item.selected == "true") {
      clone.style.outline = "2px solid var(--color)"
    }

  });

}


