
import { circleIcon } from "./circle.js";
import { curveIcon } from "./curve.js";
import { ellipseIcon } from "./ellipse.js";
import { label } from "./label.js";
import { lineIcon } from "./line.js";
import { squareIcon } from "./square.js";

export const wrapper = document.createElement("div");
wrapper.classList.add("candyDoc__inspectorToolsWrapper");
wrapper.append(label,circleIcon,ellipseIcon,lineIcon,curveIcon,squareIcon);
const toggle = document.createElement("div");
toggle.classList.add("candyDoc__inspectorToolsWrapperToggle", "candyDoc__icon")
toggle.innerHTML =/*html*/
`
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M7 11H17V13H7V11Z" fill="var(--color)"></path>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M22 2H2V22H22V2ZM20 4H4V20H20V4Z" fill="var(--color)"></path>
    </g>
  </svg>
`

wrapper.append(toggle) 
toggle.parentElement.style.height="40px"
        toggle.parentElement.querySelectorAll("div:not(.candyDoc__inspectorToolsWrapperToggle , .candyDoc__inspectorToolLabel)").forEach(div=>div.style.display="none")

toggle.addEventListener("mousedown",(e)=>{
    if(toggle.parentElement.offsetHeight>40)
    {
        toggle.parentElement.style.height="40px"
        toggle.parentElement.querySelectorAll("div:not(.candyDoc__inspectorToolsWrapperToggle , .candyDoc__inspectorToolLabel)").forEach(div=>div.style.display="none")
    }
    else
    {
        toggle.parentElement.style.height="auto"
        toggle.parentElement.querySelectorAll("div:not(.candyDoc__inspectorToolsWrapperToggle , .candyDoc__inspectorToolLabel)").forEach(div=>div.style.display="flex")
    }
 
})