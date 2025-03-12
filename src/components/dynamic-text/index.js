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
            { label: "Relative Number", value: "relativeNumber" },
            { label: "Absolute Number", value: "number" },
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

        select.addEventListener("change", (e) => {
            const page = findAncestor(e.target, "candyDoc__page");
            let value = page.dataset[e.target.value];

            if (e.target.value === "bookTitle") {
                value = document.title;
            } 
            this.className = e.target.value;
            const toolTip = select.querySelector(`[value=${e.target.value}]`).label;
            const spanHTML = `<span data-tooltip="${toolTip}" class="${this.className}" data-value="${value}">${value}</span>`;
            document.execCommand("insertHTML", false, spanHTML);

            
        });

        this.button = select;
        this.button.classList.add("inline-tool-button");
    }

    static get isInline() {
        return true;
    }

    static get sanitize() {
        return {
            span: true
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

    static serialize(element) {
        // Copy dataset to serialize it
        const dataset = { ...element.dataset };

        return {
            type: "insertText",  // The type of the tool
            class: element.classList[0],  
            html: element.outerHTML,
            dataset: dataset,  // Add dataset to the serialized data
        };
    }

    static deserialize(data) {
        const span = document.createElement("span");
        span.innerHTML = data.html || '';  // Use the saved HTML

        // Restore the dataset attributes
        if (data.dataset) {
            Object.keys(data.dataset).forEach(key => {
                span.dataset[key] = data.dataset[key];
            });
        }

        return span;
    }
}


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
            

            dynamicElement.textContent = value??""

        })
    })
}