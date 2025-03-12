import { getCenterLayoutElement } from "../../../../layout/index.js";
import { getSelected } from "../../../../selection/index.js";
import { getInspector } from "../../../index.js";
import { getInspectorShapesAttributesTools } from "../../attributes/index.js";
import { addRemoveHandle, makeDraggable, updateRemoveHandle } from "./functions.js";

export const lineIcon = document.createElement("div");
lineIcon.classList.add("candyDoc__icon")
lineIcon.innerHTML =
  /*html*/
  `
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    stroke-linecap="round"
    stroke-linejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M18 5C17.4477 5 17 5.44772 17 6C17 6.27642 17.1108 6.52505 17.2929 6.70711C17.475 6.88917 17.7236 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5ZM15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6C21 7.65685 19.6569 9 18 9C17.5372 9 17.0984 8.8948 16.7068 8.70744L8.70744 16.7068C8.8948 17.0984 9 17.5372 9 18C9 19.6569 7.65685 21 6 21C4.34315 21 3 19.6569 3 18C3 16.3431 4.34315 15 6 15C6.46278 15 6.90157 15.1052 7.29323 15.2926L15.2926 7.29323C15.1052 6.90157 15 6.46278 15 6ZM6 17C5.44772 17 5 17.4477 5 18C5 18.5523 5.44772 19 6 19C6.55228 19 7 18.5523 7 18C7 17.7236 6.88917 17.475 6.70711 17.2929C6.52505 17.1108 6.27642 17 6 17Z"
      fill="var(--color)"
    ></path>
  </g>
</svg>


`;

lineIcon.addEventListener("mousedown",(e)=>{
  const selected=getSelected();
  if(!selected)return;
  if(!selected.classList.contains("candyDoc__shapeWrapper"))return;
  const SVG=selected.querySelector("svg");
  insertLine(SVG);
})
function insertLine(svg) {


  // Create the line
  const id="line__"+Date.now().toString(16)
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.dataset.startX="5"
  line.dataset.startY="5"
  line.dataset.endX="50"
  line.dataset.endY="50"
  line.setAttribute("x1", 5);
  line.setAttribute("y1", 5);
  line.setAttribute("x2", 50);
  line.setAttribute("y2", 50);
  line.style.stroke="black"
  line.style.strokeWidth="3"
  line.style.fill="transparent"
  line.style.strokeLinecap = "butt";
  line.style.strokeLinejoin = "miter";
  line.style.strokeDasharray = "0";
  line.dataset.line=id;
  line.classList.add("candyDoc__shapeLine","selectable");
  svg.appendChild(line);

  line.addEventListener("mousedown", (e) => {
    e.stopPropagation();
    const inspector = getInspector();
    const scrollTop = inspector.scrollTop;
    inspector.innerHTML = "";

    inspector.append(getInspectorShapesAttributesTools());
    inspector.scrollTop = scrollTop;
  });

  // Create the handles
  const startHandle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  startHandle.classList.add("candyDoc__shapeHandle")
  startHandle.dataset.handle=id;
  startHandle.setAttribute("cx", parseFloat(line.dataset.startX));
  startHandle.setAttribute("cy", parseFloat(line.dataset.startY));
  startHandle.setAttribute("r", "5");
  startHandle.setAttribute("fill", "var(--color)");
  startHandle.setAttribute("cursor", "pointer");
  startHandle.classList.add("candyDoc__lineStartHandle")
  svg.appendChild(startHandle);

  const endHandle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  endHandle.classList.add("candyDoc__shapeHandle")

  endHandle.dataset.handle=id
  endHandle.setAttribute("cx", parseFloat(line.dataset.endX));
  endHandle.setAttribute("cy", parseFloat(line.dataset.endY));
  endHandle.setAttribute("r", "5");
  endHandle.setAttribute("fill", "var(--color)");
  endHandle.setAttribute("cursor", "pointer");
  svg.appendChild(endHandle);
  endHandle.classList.add("candyDoc__lineEndHandle")

  const {updateRemoveHandle,rect} = addRemoveHandle(
    svg,
    parseFloat(line.dataset.endX),
    parseFloat(line.dataset.endY),
    ()=>{
      startHandle.remove();
      endHandle.remove();
      line.remove();
    
    },
    id
    );
  rect.classList.add("candyDoc__lineRemoveHandle","candyDoc__shapeHandle")
  // Function to update the line's position
  function updateLine() {
    line.setAttribute("x1", parseFloat(line.dataset.startX));
    line.setAttribute("y1", parseFloat(line.dataset.startY));
    line.setAttribute("x2", parseFloat(line.dataset.endX));
    line.setAttribute("y2", parseFloat(line.dataset.endY));
    updateRemoveHandle(parseFloat(line.dataset.endX), parseFloat(line.dataset.endY));
  }

  // Drag logic for handles
  function makeDraggable(handle, updateCallback) {
    let isDragging = false;

    handle.addEventListener("mousedown", () => {
      isDragging = true;
    });

    svg.addEventListener("mousemove", (event) => {
      if (isDragging) {
        const rect = svg.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        updateCallback(mouseX, mouseY); // Update the respective point
        updateLine(); // Update the line's position
      }
    });

    svg.addEventListener("mouseup", () => {
      isDragging = false;
    });
  }

  // Attach drag functionality to handles
  makeDraggable(startHandle, (x, y) => {
    line.dataset.startX = x.toString();
    line.dataset.startY = y.toString();
    startHandle.setAttribute("cx", x);
    startHandle.setAttribute("cy", y);
    updateLine();
  });

  makeDraggable(endHandle, (x, y) => {
    line.dataset.endX = x.toString();
    line.dataset.endY = y.toString();
    endHandle.setAttribute("cx", x);
    endHandle.setAttribute("cy", y);
    updateLine();
  });


}

window.addEventListener("load", () => {
  setTimeout(() => {
    initLinesAll(getCenterLayoutElement());
  }, 100);
});


export function initLinesAll(container) {
  container.querySelectorAll(".candyDoc__shapeSVG").forEach((svg) => {
    svg.querySelectorAll(".candyDoc__shapeLine").forEach((line) => {
      initLine(line, svg);
    });
  });
}

function initLine(line,svg)
{
   

   line.addEventListener("mousedown", (e) => {
     e.stopPropagation();
   
     const inspector = getInspector();
     const scrollTop = inspector.scrollTop;
     inspector.innerHTML = "";
 
     inspector.append(getInspectorShapesAttributesTools());
     inspector.scrollTop = scrollTop;
   });
 
   const handles=[...svg.querySelectorAll(`[data-handle='${line.dataset.line}']`)]
   const startHandle =handles.find(h=>h.classList.contains("candyDoc__lineStartHandle"));
   const endHandle =handles.find(h=>h.classList.contains("candyDoc__lineEndHandle"));
   const removeHandle=handles.find(h=>h.classList.contains("candyDoc__lineRemoveHandle"));

  
 
   // Function to update the line's position
   function updateLine() {
     line.setAttribute("x1", parseFloat(line.dataset.startX));
     line.setAttribute("y1", parseFloat(line.dataset.startY));
     line.setAttribute("x2", parseFloat(line.dataset.endX));
     line.setAttribute("y2", parseFloat(line.dataset.endY));
     updateRemoveHandle(removeHandle.parentElement,parseFloat(line.dataset.endX), parseFloat(line.dataset.endY))
   }
 

 
   // Attach drag functionality to handles
   makeDraggable(startHandle, (x, y) => {
     line.dataset.startX = x.toString();
     line.dataset.startY = y.toString();
     startHandle.setAttribute("cx", x);
     startHandle.setAttribute("cy", y);
     updateLine()
   });
 
   makeDraggable(endHandle, (x, y) => {
     line.dataset.endX = x.toString();
     line.dataset.endY = y.toString();
     endHandle.setAttribute("cx", x);
     endHandle.setAttribute("cy", y);
     updateLine()
   });
 // Remove logic for the remove handle
 function removeElement() {
  startHandle.remove();
  endHandle.remove();
  line.remove();
  removeHandle.parentElement.remove()
}

removeHandle.addEventListener("click", removeElement);

}

window.addEventListener("mouseup",(e)=>{
  if (!getCenterLayoutElement().contains(e.target)) return;
   if (!e.target.classList.contains("candyDoc__shapeLine")) return;
   e.stopPropagation();
 
   const inspector = getInspector();
   const scrollTop = inspector.scrollTop;
   inspector.innerHTML = "";
   inspector.append(getInspectorShapesAttributesTools());
   inspector.scrollTop = scrollTop;
})