import { createNodeWrapper } from "./nodeWrapper.js";
export function createRepeat() {
  const repeat = document.createElement("div");
  const wrapper=createNodeWrapper();
  
  repeat.classList.add( "candyDoc__diagramRepeat","target")
  repeat.contentEditable = "false";

  wrapper.classList.add(
   
    "removable",
    "resizable",
    "draggable",
    "selectable",
    "diagram-node",
    "selectable",
    
  );
  const svg = document.createElement("div");
  svg.classList.add("candyDoc__diagramRepeatSVG");
  svg.innerHTML =
    /*html*/
    `
    <svg
    width="15px"
    height="15px"
    viewBox="0 0 16.00 16.00"
    xmlns="http://www.w3.org/2000/svg"
    fill="#000000"
    class="bi bi-caret-left-square-fill"
    stroke="#000000"
    strokeWidth="0.00016"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path
        d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm10.5 10V4a.5.5 0 0 0-.832-.374l-4.5 4a.5.5 0 0 0 0 .748l4.5 4A.5.5 0 0 0 10.5 12z"
      ></path>
    </g>
  </svg>
    `;
  const textBox = document.createElement("div");
  textBox.contentEditable = "plaintext-only";
  textBox.classList.add("candyDoc__diagramNodeTextBox");

  repeat.append(svg, textBox);
  wrapper.append(repeat)
  wrapper.id="node__"+Date.now().toString(16)
   ;
  repeat.dataset.id = Date.now().toString();
  return wrapper;
}
