import { getSelected, getSelectedElements } from "../../../selection/index.js";
export const center = document.createElement("div");
center.classList.add("candyDoc__icon", "candyDoc__toggle");
center.innerHTML =
  /*html*/
  `
<svg
  style="pointer-events: none"
  width="15px"
  height="15px"
  color="var(--color)"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    strokeLinecap="round"
    strokeLinejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    <path
      d="M12 2L12 5M12 22L12 19M12 14L12 10"
      stroke="var(--color)"
      strokeWidth="1.5"
      strokeLinecap="round"
    ></path>
    <path
      d="M13 5L7.5 5C6.56538 5 6.09808 5 5.75 5.20096C5.52197 5.33261 5.33261 5.52197 5.20096 5.75C5 6.09808 5 6.56538 5 7.5C5 8.43462 5 8.90192 5.20096 9.25C5.33261 9.47803 5.52197 9.66739 5.75 9.79904C6.09808 10 6.56538 10 7.5 10L16.5 10C17.4346 10 17.9019 10 18.25 9.79904C18.478 9.66739 18.6674 9.47803 18.799 9.25C19 8.90192 19 8.43462 19 7.5C19 6.56538 19 6.09808 18.799 5.75C18.6674 5.52197 18.478 5.33261 18.25 5.20096C17.9704 5.03954 17.6139 5.00778 17 5.00153"
      stroke="var(--color)"
      strokeWidth="1.5"
      strokeLinecap="round"
    ></path>
    <path
      d="M7 16.5C7 15.5654 7 15.0981 7.20096 14.75C7.33261 14.522 7.52197 14.3326 7.75 14.201C8.09808 14 8.56538 14 9.5 14H14.5C15.4346 14 15.9019 14 16.25 14.201C16.478 14.3326 16.6674 14.522 16.799 14.75C17 15.0981 17 15.5654 17 16.5C17 17.4346 17 17.9019 16.799 18.25C16.6674 18.478 16.478 18.6674 16.25 18.799C15.9019 19 15.4346 19 14.5 19H9.5C8.56538 19 8.09808 19 7.75 18.799C7.52197 18.6674 7.33261 18.478 7.20096 18.25C7 17.9019 7 17.4346 7 16.5Z"
      stroke="var(--color)"
      strokeWidth="1.5"
    ></path>
  </g>
</svg>

`;

center.addEventListener("mouseup", () => {

  const selectedElements = getSelectedElements();
  selectedElements.forEach(selected => {
    selected.style.left = "unset";
    selected.style.right = "unset";
    selected.style.float = "none";
    selected.style.left = `calc(50% - ${selected.offsetWidth / 2}px)`;
  })
});
