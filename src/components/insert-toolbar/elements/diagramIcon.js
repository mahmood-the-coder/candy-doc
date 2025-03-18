import { insertDiagram } from "../../diagram/Diagram.js";

export const diagramIcon = document.createElement("div");
diagramIcon.dataset.tooltip="Diagram"
diagramIcon.classList.add("candyDoc__icon","insertDiagram");
diagramIcon.innerHTML =
  /*html*/
  `
<svg 
  pointerEvents="none"
  color='var(--color)'  
  width="15px" 
  height="15px" 
  viewBox="0 0 24 24" 
  fill="none" 
  xmlns="http://www.w3.org/2000/svg">
  <g id="SVGRepo_bgCarrier" strokeWidth="0">
  </g>
  <g 
  id="SVGRepo_tracerCarrier" 
  strokeLinecap="round" 
  strokeLinejoin="round">
  </g>
  <g 
  id="SVGRepo_iconCarrier"
  > 
    <path 
    d="M8 6.5H16M7.70502 8.70919L12.2826 15.3034M4.6 9H6.4C6.96005 9 7.24008 9 7.45399 8.89101C7.64215 8.79513 7.79513 8.64215 7.89101 8.45399C8 8.24008 8 7.96005 8 7.4V5.6C8 5.03995 8 4.75992 7.89101 4.54601C7.79513 4.35785 7.64215 4.20487 7.45399 4.10899C7.24008 4 6.96005 4 6.4 4H4.6C4.03995 4 3.75992 4 3.54601 4.10899C3.35785 4.20487 3.20487 4.35785 3.10899 4.54601C3 4.75992 3 5.03995 3 5.6V7.4C3 7.96005 3 8.24008 3.10899 8.45399C3.20487 8.64215 3.35785 8.79513 3.54601 8.89101C3.75992 9 4.03995 9 4.6 9ZM13.6 20H15.4C15.9601 20 16.2401 20 16.454 19.891C16.6422 19.7951 16.7951 19.6422 16.891 19.454C17 19.2401 17 18.9601 17 18.4V16.6C17 16.0399 17 15.7599 16.891 15.546C16.7951 15.3578 16.6422 15.2049 16.454 15.109C16.2401 15 15.9601 15 15.4 15H13.6C13.0399 15 12.7599 15 12.546 15.109C12.3578 15.2049 12.2049 15.3578 12.109 15.546C12 15.7599 12 16.0399 12 16.6V18.4C12 18.9601 12 19.2401 12.109 19.454C12.2049 19.6422 12.3578 19.7951 12.546 19.891C12.7599 20 13.0399 20 13.6 20ZM17.6 9H19.4C19.9601 9 20.2401 9 20.454 8.89101C20.6422 8.79513 20.7951 8.64215 20.891 8.45399C21 8.24008 21 7.96005 21 7.4V5.6C21 5.03995 21 4.75992 20.891 4.54601C20.7951 4.35785 20.6422 4.20487 20.454 4.10899C20.2401 4 19.9601 4 19.4 4H17.6C17.0399 4 16.7599 4 16.546 4.10899C16.3578 4.20487 16.2049 4.35785 16.109 4.54601C16 4.75992 16 5.03995 16 5.6V7.4C16 7.96005 16 8.24008 16.109 8.45399C16.2049 8.64215 16.3578 8.79513 16.546 8.89101C16.7599 9 17.0399 9 17.6 9Z" 
    stroke="var(--color)" 
    strokeWidth="2"
    strokeLinecap="round" 
    strokeLinejoin="round"
    >
    </path>
  </g>
</svg>
`;

window.addEventListener("mousedown",(e)=>{
  if(!e.target.classList.contains("insertDiagram"))return;

  insertDiagram()
})