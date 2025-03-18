import { createNodeWrapper } from "./nodeWrapper.js";

export function createDiamond() {
    const diamond = document.createElement("div");

    const wrapper=createNodeWrapper();
    

   diamond.classList.add("candyDoc__diagramDiamond","target");
    wrapper.classList.add("removable", "resizable", "draggable", "selectable", "diagram-node");
    const svg = document.createElement("div");
    svg.classList.add("candyDoc__diagramDiamondSVG")
   
    svg.innerHTML =/*html*/
        `
<svg
preserveAspectRatio="none"
class="color-target"
data-back-color-att="fill"
data-path-color-att="stroke"
fill="white"
stroke="black"
width="100%"
height="100%"
 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="1080" height="1080" viewBox="0 0 1080 1080" xml:space="preserve">
<g transform="matrix(1 0 0 1 540 540)" id="6c8b9e94-f526-411a-9676-474bda37edca">
</g>
<g transform="matrix(7.61 7.61 -7.61 7.61 540 540.71)" id="885a4045-2190-4a98-a9fd-73da59bccd4c">
<rect style=" stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4;  fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke" x="-33.0835" y="-33.0835" rx="0" ry="0" width="66.167" height="66.167"/>
</g>
</svg>
    `;
    const textBox = document.createElement("div");
   
    textBox.contentEditable = "plaintext-only";
    textBox.classList.add("candyDoc__diagramNodeTextBox")

    

    diamond.append(svg, textBox);
    wrapper.append(diamond)
    wrapper.id="node__"+Date.now().toString(16)
     ;
    diamond.dataset.id = Date.now().toString();
    return wrapper;
}
