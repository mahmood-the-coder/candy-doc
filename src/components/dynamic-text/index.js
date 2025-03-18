import { findAncestor } from "../find-ancestor/index.js";
import { getRange } from "../range/index.js";


export function UpdateDynamicText() {
    const dynamicTextSelectors = [
        "bookTitle",
        "parentName",
        "name",
        "relativeNumber",
        "number",
    ]
    dynamicTextSelectors.forEach(selector => {
        document.body.querySelectorAll("." + selector).forEach(dynamicElement => {


            const page = findAncestor(dynamicElement, "candyDoc__page");
            let value = page?.dataset[selector] ?? "";


            if (selector == "bookTitle") {
                value = document.title;
            }


            dynamicElement.textContent = value ?? ""

        })
    })
}

export function getDynamicText() {
    const options = [
        { label: "Book Title", value: "bookTitle" },
        { label: "Chapter Title", value: "parentName" },
        { label: "Page Title", value: "name" },
        { label: "Relative Number", value: "relativeNumber" },
        { label: "Absolute Number", value: "number" },
    ];
    const toggle = document.createElement("div");
    toggle.classList.add("candyDoc__icon", "candyDoc__dynamicTextToggle")
    toggle.innerHTML = "Dynamic Text"
    let visibility = "hidden"
    window.addEventListener("mousedown", () => {
        select.style.visibility = "hidden"
        visibility = "hidden"
    })
    toggle.addEventListener("mousedown", (e) => {

        e.stopPropagation()
        if (visibility == "hidden") {
            visibility = "visible"
        }
        else {
            visibility = "hidden"
        }
        select.style.visibility = visibility


    })
    const wrapper = document.createElement("div")
    wrapper.classList.add("candyDoc__dynamicTextWrapper")
    const select = document.createElement("div");
    select.classList.add("candyDoc__dynamicTextSelect");
    select.style.fontSize = "x-small";
    select.style.marginLeft = "5px";
    options.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option.value;
        optionElement.label = option.label;
        select.append(optionElement);
        optionElement.addEventListener("mousedown", (e) => {
            e.preventDefault()
        })
        optionElement.addEventListener("mousedown", (e) => {
            e.stopPropagation()

            const range = getRange();
            console.log(range);
            if (!range) return;
            const page = findAncestor(range.startContainer, "candyDoc__page");
            let value = page.dataset[e.target.value];

            if (e.target.value === "bookTitle") {
                value = document.title;
            }
            const id = "dynamicText__" + Math.random().toString(16)
            const className = e.target.value;
            const toolTip = select.querySelector(`[value=${e.target.value}]`).label;
            const spanHTML = `<span id='${id}' data-tooltip="${toolTip}" class="${className}" data-value="${value}">${value}</span>`;
            document.execCommand("insertHTML", false, spanHTML)
           
                const inserted = document.getElementById(id);
                window.getSelection().selectAllChildren(inserted)
         



        });
    });

    wrapper.addEventListener("mousedown", (e) => {
        e.preventDefault()
    })

    toggle.classList.add("candyDoc__dynamicTextToggle");
    wrapper.append(toggle, select)
    return wrapper

}