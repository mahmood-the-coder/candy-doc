import { getSelected } from "../../../selection/index.js";

export const rowNumber = document.createElement("div");
rowNumber.classList.add("candyDoc__inspectorTableRowNumber");
const label = document.createElement("div");
label.innerText = "Row Numbering";
label.classList.add("candyDoc__inspectorTableRowNumberLabel");
const number = document.createElement("div");
number.classList.add("candyDoc__icon","candyDoc__toggle");
number.innerHTML =
  /*html*/
  `
  <svg
  width="15px"
  height="15px"
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
    <path d="M10 6.5H20V8H10V6.5Z" fill="var(--color)"></path>
    <path d="M10 16.5H20V18H10V16.5Z" fill="var(--color)"></path>
    <path d="M10 11.5H20V13H10V11.5Z" fill="var(--color)"></path>
    <path
      d="M7.99847 10H4.44745V8.68805H5.48827V5.87172C5.20838 5.98834 4.87311 6.04665 4.48244 6.04665V4.74344C4.83229 4.74344 5.10634 4.68805 5.30459 4.57726C5.50868 4.4723 5.68069 4.27988 5.82063 4H7.0801V8.68805H7.99847V10Z"
      fill="var(--color)"
    ></path>
    <path
      d="M8.29928 19H4.12086V17.9986L6.19281 15.9525C6.49784 15.659 6.65036 15.3223 6.65036 14.9424C6.65036 14.5568 6.48921 14.364 6.16691 14.364C5.77554 14.364 5.57986 14.6288 5.57986 15.1583H4C4 14.4619 4.19568 13.9266 4.58705 13.5525C4.97266 13.1842 5.49928 13 6.16691 13C6.82878 13 7.34101 13.1727 7.7036 13.518C8.06619 13.8691 8.24748 14.3439 8.24748 14.9424C8.24748 15.3683 8.16691 15.7252 8.00576 16.0129C7.8446 16.3007 7.5482 16.6518 7.11655 17.0662L6.4518 17.705H8.29928V19Z"
      fill="var(--color)"
    ></path>
  </g>
</svg>


`;
const bullet = document.createElement("div");
bullet.classList.add("candyDoc__icon","candyDoc__toggle");

bullet.innerHTML =
  /*html*/
  `
<svg
  fill=" var(--color)"
  width="15px"
  height="15px"
  viewBox="0 0 1920 1920"
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
      d="M169.412 1355.412c93.402 0 169.412 76.01 169.412 169.412s-76.01 169.411-169.412 169.411C76.009 1694.235 0 1618.225 0 1524.824c0-93.403 76.01-169.412 169.412-169.412ZM1920 1468.352v112.942H564.706v-112.941H1920ZM169.412 790.707c93.402 0 169.412 76.01 169.412 169.412s-76.01 169.411-169.412 169.411C76.009 1129.53 0 1053.52 0 960.118c0-93.403 76.01-169.412 169.412-169.412ZM1920 903.647v112.941H564.706v-112.94H1920ZM169.412 226c93.402 0 169.412 76.01 169.412 169.412s-76.01 169.412-169.412 169.412C76.009 564.824 0 488.814 0 395.412 0 302.009 76.01 226 169.412 226ZM1920 338.941v112.941H564.706v-112.94H1920Z"
      fillRule="evenodd"
    ></path>
  </g>
</svg>
`;

const none = document.createElement("div");
none.classList.add("candyDoc__icon","candyDoc__toggle");
none.innerHTML =
  /*html*/
  `
  <svg
  width="15px"
  height="15px"
  viewBox="0 0 24 24"
  role="img"
  xmlns="http://www.w3.org/2000/svg"
  stroke="var(--color)"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  fill="none"
  color="var(--color)"
>
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    strokeLinecap="round"
    strokeLinejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    <title id="notAllowedIconTitle">Not Allowed</title>
    <circle cx="12" cy="12" r="10"></circle>
    <path strokeLinecap="square" d="M5,5 L19,19"></path>
  </g>
</svg>
`;
rowNumber.append(label, number, bullet, none);

number.addEventListener("mousedown", () => {
  const selected = getSelected();
  if (!selected.classList.contains("candyDoc__tableWrapper")) return;
  const firstColCells = selected.querySelector(".candyDoc__table").querySelectorAll("[data-col='1']");
  firstColCells.forEach((c) => {
    if (c.dataset.row == 1) return;
    c.querySelector(".candyDoc__tableCellTextBox").innerText = parseInt(c.dataset.row) - 1;
  });
  selected.dataset.rowNumber="number"
});


none.addEventListener("mousedown", () => {
  const selected = getSelected();
  if (!selected.classList.contains("candyDoc__tableWrapper")) return;
  const firstColCells = selected.querySelector(".candyDoc__table").querySelectorAll("[data-col='1']");
  firstColCells.forEach((c) => {
    if (c.dataset.row == 1) return;
    c.querySelector(".candyDoc__tableCellTextBox").innerText = "";
  });
  selected.dataset.rowNumber="none"
});

bullet.addEventListener("mousedown", () => {
  const selected = getSelected();
  if (!selected.classList.contains("candyDoc__tableWrapper")) return;
  const firstColCells = selected.querySelector(".candyDoc__table").querySelectorAll("[data-col='1']");
  firstColCells.forEach((c) => {
    if (c.dataset.row == 1) return;
    c.querySelector(".candyDoc__tableCellTextBox").innerText = '\u2022';
  });
  selected.dataset.rowNumber="bullet"
});

