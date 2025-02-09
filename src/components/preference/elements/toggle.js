export const toggle = document.createElement("div");
toggle.classList.add("candyDoc__topToolbarPreferenceToggle","candyDoc__icon");
toggle.innerHTML =
  /*html*/
  `
  <svg
  width="64px"
  height="64px"
  viewBox="0 0 128 128"
  version="1.1"
  xml:space="preserve"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  fill="var(--color)"
>
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    stroke-linecap="round"
    stroke-linejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    <style type="text/css">
      .st0 {
        display: none;
      }
      .st1 {
        display: inline;
      }
      .st2 {
        fill: none;
        stroke: var(--color);
        stroke-width: 8;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-miterlimit: 10;
      }
    </style>
    <g class="st0" id="Layer_1"></g>
    <g id="Layer_2">
      <circle class="st2" cx="64" cy="65" r="14.5"></circle>
      <path
        class="st2"
        d="M78.4,104.3L75,112c-10.5,0-11.6,0-22.1,0l-3.4-7.7c-4.6-2.6-7.8-4.5-12.3-7.1l-8.4,0.9 c-5.2-9.1-5.8-10-11-19.1l5-6.8c0-5.3,0-9,0-14.2l-5-6.8c5.2-9.1,5.8-10,11-19.1l8.4,0.9c4.6-2.6,7.8-4.5,12.3-7.1l3.4-7.7 c10.5,0,11.6,0,22.1,0l3.4,7.7c4.6,2.6,7.8,4.5,12.3,7.1l8.4-0.9c5.2,9.1,5.8,10,11,19.1l-5,6.8c0,5.3,0,9,0,14.2l5,6.8 c-5.2,9.1-5.8,10-11,19.1l-8.4-0.9"
      ></path>
    </g>
  </g>
</svg>

`;
toggle.addEventListener("mousedown",(e)=>{
    const menu=e.target.parentElement.querySelector(".menu")
    menu.style.display=menu.style.display=="flex"?"none":"flex"
})

toggle.dataset.tooltip="Preference"