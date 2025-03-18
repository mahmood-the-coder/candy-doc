import { findAncestor } from "../../find-ancestor/index.js";
import { getCenterLayoutElement } from "../../layout/index.js";
import { getRange } from "../../range/index.js";
import { wrapper } from "./elements/wrapper.js";

export function initTextEditorToolBar() {
    
    window.addEventListener("mouseup", (e) => {
        setTimeout(() => {
            const range = getRange();
            if (!range) {
                wrapper?.remove()
                return;
            };
            if (range.toString().length == 0) {
                wrapper?.remove()
                return;
            };
            if (!getCenterLayoutElement().contains(range.startContainer)) {
                wrapper?.remove()
                return;
            }
            if(range.startOffset==range.endOffset){
                wrapper?.remove()
                return;
            };
            document.body.append(wrapper)
            wrapper.style.left=range.getBoundingClientRect().x+"px"
            wrapper.style.top=range.getBoundingClientRect().y+50+"px"
        }, 10);
    })
}