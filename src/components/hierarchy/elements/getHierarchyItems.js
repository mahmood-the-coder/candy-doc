

export function getHierarchyItems(container) {
  return [...container.querySelectorAll(".candyDoc__hierarchyItemWrapper")].filter(item => !item.classList.contains("candyDoc__hierarchyDummy")).map((item, index) => {
    return {
      id: item.dataset.id,
      index: index,
      number: (index + 1).toString(),
      name: item.querySelector("input")?.value ?? "",
      parentId: item?.parentElement?.dataset?.id ?? null,
      innerHTML: document.body.querySelector(`[data-page-id='${item.dataset.id}']`)?.innerHTML ?? "",
      type: item.dataset.type
    };
  });

  


}