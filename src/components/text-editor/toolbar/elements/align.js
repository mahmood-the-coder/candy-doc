import { findAncestor } from "../../../find-ancestor/index.js";
import { getRange } from "../../../range/index.js";

export const align = document.createElement("select");
align.classList.add("candyDoc__textEditorToolbarSelect");
const left = document.createElement("option");
left.value = "left"
left.label = "Left"
const right = document.createElement("option");
right.value = "right"
right.label = "Right"
const center = document.createElement("option");
center.classList.add("candyDoc__icon")
center.value = "center"
center.label = "Center"

const justify = document.createElement("option");
justify.value = "justify"
justify.label = "Justify";


align.append(left, center, right, justify)

align.addEventListener("change", (e) => {
    const range = getRange();
    if (!range) return;
    let current=range.startContainer;
    while(current.nodeName!="DIV")
    {
        current=current.parentElement;
    }
    current.style.textAlign = e.target.value

})
align.addEventListener("mousedown", (e) => {
    e.stopPropagation()
})