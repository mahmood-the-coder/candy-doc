import { renderHierarchy } from "../hierarchy-items/index.js";
import { container } from "../hierarchy/elements/container.js";
import { getHierarchyItems } from "../hierarchy/elements/getHierarchyItems.js";
import { sortPages } from "../hierarchy/elements/sortPages.js";
import { createPage } from "../pages/index.js";
import { userData } from "../user-data/userData.js";

export function generateTableOfContent() {
    const items = buildNestedList(userData.hierarchyItems).filter(i => i.name != "Table Of Content");
    const itemHeight = 20;
    document.body.querySelector(".candyDoc__pagesWrapper")?.querySelectorAll("[data-name='Table Of Content']").forEach(content => {
        content.remove()
    })
 
    userData.hierarchyItems = userData.hierarchyItems.filter(i => i.name != "Table Of Content")
    const listHeight = itemHeight * items.length
    const contentHeight = document.body.querySelector(".candyDoc__content").getBoundingClientRect().height;
    const pages = Math.ceil(listHeight / contentHeight)
    const itemsInEachPage = Math.floor(contentHeight / itemHeight)
    for (let index = 0; index < pages; index++) {
        const list = buildNestedHTMLList(items.slice(index * itemsInEachPage, (index + 1) * itemsInEachPage))
        const id = "item__" + Math.random().toString(16);
        const page = {
            index: 0,
            number: 0,
            id: id,
            name: "Table Of Content",
            parentId: null,
            type: "table",
            innerHTML: ""
        }
        userData.hierarchyItems.unshift(page)

        renderHierarchy(userData.hierarchyItems)
        const pageWrapper = document.body.querySelector(".candyDoc__pagesWrapper");
        const newPageElement = createPage(page);
        pageWrapper.insertBefore(newPageElement, pageWrapper.children[0]);
        sortPages();
        newPageElement.querySelector(".candyDoc__content").appendChild(list)



    }








}

function buildNestedHTMLList(items) {
    // Create a <ul> element to hold the list
    const ul = document.createElement('ol');

    // Loop through each item and create a corresponding <li>
    items.filter(i => i.name != "Table Of Content").forEach(item => {

        // Create the <li> element for the current item
        const li = document.createElement('li');
        li.dataset.id = item.id;
        // Create a text node or custom content for the item
        li.textContent = `${item.number} ... ${item.name}`;

        // If the item has children, recursively build the nested list for them
        if (item.children && item.children.length > 0) {
            const nestedUl = buildNestedHTMLList(item.children); // Recursive call
            li.appendChild(nestedUl); // Append the nested <ul> to the <li>
        }

        // Append the <li> to the main <ul>
        ul.appendChild(li);
    });

    return ul;
}

function buildNestedList(items) {
    const itemMap = {};
    const nestedList = [];

    // First, map each item by id for easy access
    items.forEach(item => {
        itemMap[item.id] = { ...item, children: [] };
    });

    // Now, build the nested structure
    items.forEach(item => {
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

export function updateTableOfContent() {

    const items = buildNestedList(getHierarchyItems(container));
    const itemHeight = 20;

    const listHeight = itemHeight * items.length
    const contentHeight = document.body.querySelector(".candyDoc__content").getBoundingClientRect().height;
    const pages = Math.ceil(listHeight / contentHeight)
    const itemsInEachPage = Math.floor(contentHeight / itemHeight)
    for (let index = 0; index < pages; index++) {
        const list = buildNestedHTMLList(items.slice(index * itemsInEachPage, (index + 1) * itemsInEachPage))
        const id = "item__" + Math.random().toString(16);
        const page = {
            index: 0,
            number: 0,
            id: id,
            name: "Table Of Content",
            parentId: null,
            type: "table",
            innerHTML: ""
        }

        const newPageElement = createPage(page);
        newPageElement.querySelector(".candyDoc__content").append(list)
        document.body.querySelector(".candyDoc__pagesWrapper").querySelectorAll("[data-name='Table Of Content']").forEach(tablePage => {
            newPageElement.dataset.pageId = tablePage.dataset.pageId
            tablePage.parentElement.replaceChild(newPageElement, tablePage)
        })
      
       



    }









}