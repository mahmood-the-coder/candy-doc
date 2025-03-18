import { initDrag } from "./elements/drag.js";
import { createPageItem, getPagesItems, pagesArray, pagesArrayWrapper } from "./elements/pagesTools.js";
import { wrapper } from "./elements/wrapper.js";
import { setPagesItems } from "./elements/pagesTools.js";
import { getCenterLayoutElement } from "../../layout/index.js";
import { color, font, fontSize, setChapterData } from "./elements/chaptersFont.js";
import { setPageData } from "./elements/PagesFont.js";
export function getTableOfContentInspectorTools() {
    initDrag(pagesArrayWrapper)
    return wrapper
}

window.addEventListener("mouseup", (e) => {
    if (!getCenterLayoutElement().contains(e.target)) return;
    setTimeout(() => {
        const tableOfContent = document.body.querySelector(".candyDoc__tableOfContentPage");
        const data = JSON.parse(tableOfContent?.dataset?.tableOfContent ?? "null");

        if (!data) return;
        const pagesLiData = data?.pagesLis ?? [];
        
    
        setPagesItems(pagesLiData)
        const pagesItems = getPagesItems()
        pagesArray.innerHTML = ""
        pagesItems.forEach((i, index) => {
            const newItemElement = createPageItem(i)
            newItemElement.dataset.index = index
            pagesArray.append(newItemElement)
        })

    }, 100);
})