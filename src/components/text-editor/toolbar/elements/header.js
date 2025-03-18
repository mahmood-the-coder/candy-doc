import { findAncestor } from "../../../find-ancestor/index.js";
import { getRange } from "../../../range/index.js";

export const headers = document.createElement("select");
headers.classList.add("candyDoc__textEditorToolbarSelect");
const h1 = document.createElement("option");
h1.value = "h1"
h1.label = "H1"
const h2 = document.createElement("option");
h2.value = "h2"
h2.label = "H2"
const h3 = document.createElement("option");
h3.classList.add("candyDoc__icon")
h3.value = "h3"
h3.label = "H3"

const h4 = document.createElement("option");
h4.value = "h4"
h4.label = "H4";
const normal = document.createElement("option");
normal.value = "div"
normal.label = "Normal";


headers.append(h1, h2, h3, h4, normal)

headers.addEventListener("change", (e) => {
 

    document.execCommand('formatBlock', false, `<${e.target.value}>`);
    


})
headers.addEventListener("mousedown", (e) => {
    e.stopPropagation()
})