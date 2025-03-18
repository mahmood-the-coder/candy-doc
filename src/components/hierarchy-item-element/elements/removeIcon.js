import { setHierarchySelect } from "../../hierarchy/elements/select.js";
import { numberPages } from "../../pages/elements/numberPages.js";
import { sortPages } from "../../pages/elements/sortPages.js";
import { generateTableOfContent } from "../../table-of-content/index.js";
import { userData } from "../../user-data/userData.js";

export const removeIcon = document.createElement("div");
removeIcon.classList.add("candyDoc__hierarchyRemoveIcon","candyDoc__icon");
removeIcon.innerHTML = /*html*/ `

<svg
  width="10px"
  height="10px"
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

`;
export function initHierarchyRemove() {
    window.addEventListener("mousedown", (e) => {
        const icon = e.target.closest(".candyDoc__hierarchyRemoveIcon");
        if (!icon) return;



        let itemElement = icon.parentElement.parentElement;
        if (!itemElement) return;


        removeAll(itemElement); // Remove children before deleting the main element
        setHierarchySelect(null);
        itemElement.remove();

       setTimeout(() => {
        if (document.body.querySelector(".candyDoc__tableOfContent")) {
          numberPages();
          sortPages()
          generateTableOfContent();
      }
       }, 10);




    });
}
export function removeAll(element) {
    if (!element) return;
    element.querySelectorAll(".candyDoc__hierarchyItemWrapper").forEach(item => {
        userData.hierarchyItems = userData.hierarchyItems.filter(i => i.id != item.dataset.id);

        document.body.querySelectorAll(`[data-page-id='${item.dataset.id}']`).forEach(page => {
            page.remove();

        });
    });
    document.body.querySelectorAll(`[data-page-id='${element.dataset.id}']`).forEach(page => {
        page.remove();
    });
    userData.hierarchyItems = userData.hierarchyItems.filter(i => i.id != element.dataset.id);
    element?.remove();
}

