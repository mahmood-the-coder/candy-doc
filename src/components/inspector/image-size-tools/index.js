import { getSelectedElements } from "../../selection/index.js";
import { getInspector } from "../index.js";
import { contain } from "./elements/contain.js";
import { cover } from "./elements/cover.js";
import { fill } from "./elements/fill.js";
import { scaleDown } from "./elements/scaleDown.js";
import { wrapper } from "./elements/wrapper.js";

export function getInspectorImageSizeTools() {
    return wrapper;
}

window.addEventListener("mouseup", (e) => {
    if (getInspector().contains(e.target)) return;
    const selectedElements = getSelectedElements();
    const selected = selectedElements[selectedElements.length - 1];
    if (!selected) return;
    const image = selected.querySelector("img");
    if (!image) return;
    cover.classList.remove("candyDoc__toggleIcon")
    contain.classList.remove("candyDoc__toggleIcon")
    fill.classList.remove("candyDoc__toggleIcon")
    scaleDown.classList.remove("candyDoc__toggleIcon")
    
    if (image.style.objectFit == "cover") {

        cover.classList.add("candyDoc__toggleIcon")
    }
    else if (image.style.objectFit == "contain") {
        contain.classList.add("candyDoc__toggleIcon")
    }
    else if (image.style.objectFit == "fill") {
        fill.classList.add("candyDoc__toggleIcon")
    }
    else if (image.style.objectFit == "scale-down") {
        scaleDown.classList.add("candyDoc__toggleIcon")
    }


})