import { findAncestor } from "../find-ancestor/index.js";

export class InsertText {
    constructor({ api }) {
        this.className = ""; // Track the current selected class
        this.api = api;

        const options = [
            { label: "Dynamic Text", value: "none" },
            { label: "Book Title", value: "bookTitle" },
            { label: "Chapter Title", value: "parentName" },
            { label: "Page Title", value: "name" },
            { label: "Relative Number", value: "relativeIndex" },
            { label: "Absolute Number", value: "index" },
        ];

        const select = document.createElement("select");
        select.style.fontSize = "x-small";
        select.style.marginLeft = "5px";
        options.forEach(option => {
            const optionElement = document.createElement("option");
            optionElement.value = option.value;
            optionElement.label = option.label;
            select.append(optionElement);
        });

        select.addEventListener("input", (e) => {
            const page = findAncestor(e.target, "candyDoc__page");
            let value = page.dataset[e.target.value];

            if (e.target.value === "bookTitle") {
                value = document.title;
            } else if (!isNaN(value)) {
                value = parseInt(value) + 1;
            }

            this.className = e.target.value;
            const spanHTML = `<span class="${this.className}">${value}</span>`;
            document.execCommand("insertHTML", false, spanHTML);

            window.getSelection().selectAllChildren(page.querySelector("." + this.className));
        });

        this.button = select;
        this.button.classList.add("inline-tool-button");
    }

    static get isInline() {
        return true;
    }

    // Sanitize method should keep the class attribute for <span>
    static get sanitize() {
        return {
            span: {
                class: true,  // Keep any class attribute on <span> elements
            },
        };
    }

    render() {
        return this.button;
    }

    surround(range) {
        if (!range) return;
    }

    checkState() {
        return false;
    }

    // Serialize method: save the class and the inner HTML of the span element
    static serialize(element) {
        return {
            type: "insertText",  // The type of the tool
            class: element.classList[0],  // Save the dynamic class
            html: element.outerHTML,   // Save the whole HTML (preserves the span)
        };
    }

    // Deserialize method: restore the span element with class and text
    static deserialize(data) {
        const span = document.createElement("span");
        span.innerHTML = data.html || '';  // Use the saved HTML directly
        return span;
    }
}



export function UpdateDynamicText() {
    const dynamicTextSelectors = [
        "bookTitle",
        "parentName",
        "name",
        "relativeIndex",
        "index",
    ]
    dynamicTextSelectors.forEach(selector => {
        document.body.querySelectorAll("." + selector).forEach(dynamicElement => {

            const page = findAncestor(dynamicElement, "candyDoc__page");
            let value = page?.dataset[selector] ?? "";
            if (selector == "bookTitle") {
                value = document.title;
            }
            else if (!isNaN(value)) {
                value = parseInt(value) + 1
            }

            dynamicElement.textContent = value

        })
    })
}