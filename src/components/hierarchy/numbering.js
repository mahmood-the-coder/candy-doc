import { container } from "./elements/container.js";

export function numberHierarchyItemElements() {
  const itemElements = [
    ...container.querySelectorAll(".candyDoc__hierarchyItemWrapper"),
  ];
  itemElements
    .filter((el) => el.dataset.type != "parent")
    .forEach((el, index) => {
      const numberEl = el.querySelector(".candyDoc__hierarchyItemNumber");
      if (numberEl) numberEl.innerHTML = index + 1;
    });

  itemElements
    .filter((el) => el.dataset.type == "parent")
    .forEach((el, index) => {
        const numberEl = el.querySelector(".candyDoc__hierarchyItemNumber");
        if (numberEl) numberEl.innerHTML = index + 1;
    });
}
