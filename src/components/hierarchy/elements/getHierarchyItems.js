

export function getHierarchyItems(container) {
  return [...container.querySelectorAll(".candyDoc__hierarchyItemWrapper")].filter(element => !element.classList.contains("candyDoc__hierarchyDummy")).map((el, index) => {
    return {
      id: el.dataset.id,
      index: index,
      number: (index + 1).toString(),
      name: el?.querySelector("input")?.value??"",
      parentId: el?.parentElement?.dataset?.id ?? null,
      innerHTML: document.body.querySelector(`[data-page-id='${el.dataset.id}']`)?.innerHTML ?? "",
      type: el.dataset.type,
      selected:el.dataset.selected
    };
  });

  


}