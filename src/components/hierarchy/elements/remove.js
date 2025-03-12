import { generateTableOfContent } from "../../table-of-content/index.js";
import { userData } from "../../user-data/userData.js";
import { setHierarchySelect } from "./select.js";
export function initHierarchyRemove() {
    window.addEventListener("mousedown", (e) => {
        const icon = e.target.closest(".candyDoc__hierarchyRemoveIcon");
        if (!icon) return;



        let itemElement = icon.parentElement.parentElement;
        if (!itemElement) return;


        removeAll(itemElement); // Remove children before deleting the main element
        setHierarchySelect(null);
        itemElement.remove();

        if (document.body.querySelector(".candyDoc__tableOfContent")) {
            generateTableOfContent()
        }




    });
}

function removeAll(element) {
    if (!element) return;
    element.querySelectorAll(".candyDoc__hierarchyItemWrapper").forEach(item => {
        userData.hierarchyItems = userData.hierarchyItems.filter(i => i.id != item.dataset.id)

        document.body.querySelectorAll(`[data-page-id='${item.dataset.id}']`).forEach(page => {
            page.remove()

        })
    })
    document.body.querySelectorAll(`[data-page-id='${element.dataset.id}']`).forEach(page => {
        page.remove()
    })
    userData.hierarchyItems = userData.hierarchyItems.filter(i => i.id != element.dataset.id)
    element?.remove()
}
