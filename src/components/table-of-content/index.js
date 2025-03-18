import { findAncestor } from "../find-ancestor/index.js";
import { createHierarchyItemElement } from "../hierarchy-item-element/index.js";
import { hierarchyContainer } from "../hierarchy/elements/container.js";
import { getHierarchyItems } from "../hierarchy/elements/getHierarchyItems.js";
import { getAlignInspectorTools } from "../inspector/align-tools/index.js";
import { getInspectorBackgroundTools } from "../inspector/background-image-tools/index.js";
import { getInspectorBackgroundRepeatTools } from "../inspector/background-repeat-tools/index.js";
import { getInspectorBackgroundSizeTools } from "../inspector/background-size-tools/index.js";
import { getInspectorBorderColorTools } from "../inspector/border-color-tools/index.js";
import { getInspectorBorderImageTools } from "../inspector/border-image-tools/index.js";
import { getInspectorBorderRadiusTools } from "../inspector/border-radius-tools/index.js";
import { getInspectorBorderTools } from "../inspector/border-tools/index.js";
import { getInspectorBorderWidthTools } from "../inspector/border-width-tools/index.js";
import { getInspector } from "../inspector/index.js";
import { getTableOfContentInspectorTools } from "../inspector/table-of-content-tools/index.js";
import { getInspectorTransformTools } from "../inspector/transform-tools/index.js";
import { createPage } from "../pages/index.js";
import { userData } from "../user-data/userData.js";
const TABLE_OF_CONTENT_ITEM_HEIGHT = 20.1;
const TABLE_OF_CONTENT_HEIGHT = 822;

export function generateTableOfContent() {

    const items = buildNestedList(userData.hierarchyItems)
    const itemHeight = TABLE_OF_CONTENT_ITEM_HEIGHT;
    const contentHeight = document.body.querySelector(".candyDoc__content")?.getBoundingClientRect()?.height ?? TABLE_OF_CONTENT_HEIGHT;
    const itemsInEachPage = Math.floor(contentHeight / itemHeight)
    for (let index = 0; index < items.length; index += itemsInEachPage) {
        const tableOfContentWrapper = document.createElement("div");
        tableOfContentWrapper.classList.add("candyDoc__tableOfContentWrapper", "resizable", "draggable", "selectable");
        const list = buildNestedHTMLList(items.slice(index, index + itemsInEachPage))
        list.classList.add("target", "candyDoc__tableOfContent")
        tableOfContentWrapper.append(list)
        list.classList.add("candyDoc__tableOfContentList")
        const id = "table__" + index;
        const item = {
            index: 0,
            number: 0,
            id: id,
            name: "Table Of Content",
            parentId: null,
            type: "table",
            innerHTML: ""
        }

        const hierarchyElementExist = hierarchyContainer.querySelector(`[data-id='${item.id}']`)
        if (!hierarchyElementExist) {
            const HierarchyElement = createHierarchyItemElement(item);
            HierarchyElement.classList.add("candyDoc__tableOfContentHierarchyItem")
            hierarchyContainer.insertBefore(HierarchyElement, hierarchyContainer.childNodes[0])
            userData.hierarchyItems = getHierarchyItems(hierarchyContainer)

        }

        const pagesWrapper = document.querySelector(".candyDoc__pagesWrapper");
        const pageExist = pagesWrapper.querySelector(`[data-page-id='${item.id}']`);
        if (!pageExist) {
            const newPage = createPage(item);
            newPage.dataset.tableOfContent=JSON.stringify({
                chapter:{},
                page:{},
                pageLis:[],

            })
            newPage.classList.add("candyDoc__tableOfContentPage")
            pagesWrapper.insertBefore(newPage, pagesWrapper.children[0]);
            newPage.querySelector(".candyDoc__content").append(tableOfContentWrapper)
            item.innerHTML = newPage.querySelector(".candyDoc__content").innerHTML
        }
        else {
            pageExist.querySelector(".candyDoc__content").innerHTML = ""
            pageExist.querySelector(".candyDoc__content").append(tableOfContentWrapper)
            item.innerHTML = pageExist.querySelector(".candyDoc__content").innerHTML
        }




    }


}

function buildNestedHTMLList(items) {

    const ol = document.createElement('ol');
    ol.classList.add("candyDoc__ol")
    items.forEach((item) => {


        const li = document.createElement('li');
        li.classList.add("candyDoc__li")
        li.dataset.id = item.id;
        li.dataset.type = item.type;
        const listItem = document.createElement("div")
        listItem.classList.add("candyDoc__tableOfContentItem")
        const name = document.createElement("div");
        name.innerText = item.name;
        name.classList.add("candyDoc__tableOfContentName")
        const trail = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        trail.classList.add("candyDoc__tableOfContentTrail")
        trail.setAttribute("width", "450px")
        trail.setAttribute("height", "25px")
        const width = 500;
        const height = 25;
        const centerY = height / 2; // Calculate center Y

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", "0");
        line.setAttribute("y1", centerY);
        line.setAttribute("x2", width);
        line.setAttribute("y2", centerY);
        line.setAttribute("stroke", "black");
        line.setAttribute("stroke-width", "1");
        line.setAttribute("stroke-linejoin", "bevel");
        line.setAttribute("stroke-linecap", "round");

        trail.append(line);
        const number = document.createElement("div");
        number.innerText = item.type == "page" ? item.number : ""
        number.classList.add("candyDoc__tableOfContentNumber")

        if (item.type == "page") {
            listItem.append(name, trail, number)
        }
        else {
            listItem.append(name, number)

        }
        li.append(listItem);

        if (item.children && item.children.length > 0) {

            const chapterOl = buildNestedHTMLList(item.children); // Recursive call
            li.append(chapterOl);

        }

        ol.appendChild(li);
    });

    return ol;
}

function buildNestedList(items) {
    const itemMap = {};
    const nestedList = [];

    // First, map each item by id for easy access
    items.filter(i => i.type != "table").forEach((item) => {
        itemMap[item.id] = { ...item, children: [] };
    });

    // Now, build the nested structure
    items.filter(i => i.type != "table").forEach(item => {
        if (item.parentId) {
            // If the item has a parentId, push it into the parent's children array
            itemMap[item.parentId].children.push(itemMap[item.id]);
        } else {
            // Otherwise, it's a root item
            nestedList.push(itemMap[item.id]);
        }
    });

    return nestedList;
}


window.addEventListener("mouseup", (e) => {

    if (!e.target.classList.contains("candyDoc__tableOfContentName")) return;
    if(!e.ctrlKey)return;
    const id = e.target.parentElement.parentElement.dataset.id
    const page = document.body.querySelector(".candyDoc__pagesWrapper").querySelector(`[data-page-id='${id}']`);


    page?.scrollIntoView()

})

window.addEventListener("mousedown", (e) => {
    if (!e.target.classList.contains("candyDoc__tableOfContentWrapper") && !findAncestor(e.target, "candyDoc__tableOfContentWrapper")) return
    if (e.target.tagName.toUpperCase() == "LI") return;
    const inspector = getInspector();
    const scrollTop = inspector.scrollTop;
    inspector.innerHTML = "";
    getInspector().append(
        getInspectorTransformTools(),
        getAlignInspectorTools(),
        getInspectorBorderTools(),
        getInspectorBorderColorTools(),
        getInspectorBorderRadiusTools(),
        getInspectorBorderWidthTools(),
        getInspectorBackgroundTools(),
        getInspectorBackgroundSizeTools(),
        getInspectorBackgroundRepeatTools(),
        getInspectorBorderImageTools(),
        getTableOfContentInspectorTools()
    );
    inspector.scrollTop = scrollTop;
})