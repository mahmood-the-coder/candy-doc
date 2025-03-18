export const nest = document.createElement("div");
nest.classList.add("candyDoc__nestedHierarchyItems","nest");
const dummy = document.createElement("div");
dummy.classList.add("candyDoc__hierarchyItemWrapper");
dummy.style.opacity = "0";
dummy.classList.add("candyDoc__hierarchyDummy")
dummy.style.height="1px"
nest.append(dummy)
export const openIcon = document.createElement("div");
openIcon.classList.add(
  "candyDoc__icon",
  "candyDoc__hierarchyNestOpen",
  "candyDoc__hierarchyNestToggle",
  
);
openIcon.innerHTML =
  /*html*/
  `
  <svg
  fill="var(--color)"
  width="15px"
  height="15px"
  viewBox="0 0 32 32"
  xmlns="http://www.w3.org/2000/svg"
>
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    strokeLinecap="round"
    strokeLinejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    <path d="M24 11.305l-7.997 11.39L8 11.305z"></path>
  </g>
</svg>
`;

export const closeIcon = document.createElement("div");
closeIcon.classList.add(
  "candyDoc__icon",
  "candyDoc__hierarchyNestClose",
  "candyDoc__hierarchyNestToggle"
);

closeIcon.innerHTML =
  /*html*/
  `
  <svg
  fill="var(--color)"
  width="15px"
  height="15px"
  viewBox="0 0 32 32"
  xmlns="http://www.w3.org/2000/svg"
>
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    strokeLinecap="round"
    strokeLinejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    <path d="M8 20.695l7.997-11.39L24 20.695z"></path>
  </g>
</svg>

`;

window.addEventListener("mousedown", (e) => {
  if (!e.target.classList.contains("candyDoc__hierarchyNestOpen")) return;
  e.target.parentElement.querySelectorAll(".candyDoc__hierarchyItemWrapper").forEach((el) => {
    el.style.display = "flex";
  });
  e.target.style.display = "none";
  e.target.parentElement.querySelector(
    ".candyDoc__hierarchyNestClose"
  ).style.display = "block";
  e.target.parentElement.parentElement.dataset.nest = "open";
});
window.addEventListener("mousedown", (e) => {
  if (!e.target.classList.contains("candyDoc__hierarchyNestClose")) return;
  e.target.parentElement.querySelectorAll(".candyDoc__hierarchyItemWrapper").forEach((el) => {
    el.style.display = "none";
  });

  e.target.style.display = "none";
  e.target.parentElement.querySelector(
    ".candyDoc__hierarchyNestOpen"
  ).style.display = "block";
  e.target.parentElement.parentElement.dataset.nest = "close";
});


