import { getSelected } from "../../../../../selection/index.js";
export const bottom = document.createElement("div");
bottom.classList.add("candyDoc__icon","candyDoc__active");
bottom.innerHTML =
  /*html*/
  `
  <svg
  width="15px"
  height="15px"
  style="pointer-events: none"
  fill="var(--color)"
  viewBox="0 0 32 32"
  version="1.1"
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
      d="M3 3.739c0.206-0.003 0.395-0.078 0.541-0.2l-0.001 0.001c0.124-0.144 0.199-0.333 0.199-0.54s-0.075-0.396-0.2-0.541l0.001 0.001c-0.145-0.122-0.334-0.196-0.54-0.196s-0.395 0.074-0.541 0.197l0.001-0.001c-0.124 0.144-0.2 0.333-0.2 0.54s0.076 0.396 0.201 0.541l-0.001-0.001c0.145 0.122 0.334 0.197 0.539 0.199h0.001zM9.5 3.76c0.003 0 0.006 0 0.009 0 0.414 0 0.75-0.336 0.75-0.75 0-0.003-0-0.007-0-0.010v0.001c-0-0.204-0.084-0.388-0.22-0.52l-0-0c-0.142-0.13-0.332-0.21-0.54-0.21s-0.398 0.080-0.541 0.211l0.001-0.001c-0.124 0.123-0.201 0.293-0.201 0.482 0 0.014 0 0.027 0.001 0.040l-0-0.002c-0 0.008-0.001 0.018-0.001 0.027 0 0.198 0.076 0.378 0.201 0.513l-0-0.001c0.139 0.136 0.33 0.22 0.54 0.22 0 0 0 0 0 0v0zM3 9.739c0.206-0.003 0.395-0.078 0.541-0.2l-0.001 0.001c0.124-0.144 0.199-0.333 0.199-0.54s-0.075-0.396-0.2-0.541l0.001 0.001c-0.145-0.122-0.334-0.196-0.54-0.196s-0.395 0.074-0.541 0.197l0.001-0.001c-0.124 0.144-0.2 0.333-0.2 0.54s0.076 0.396 0.201 0.541l-0.001-0.001c0.145 0.122 0.334 0.197 0.539 0.199h0.001zM3 16.739c0.206-0.003 0.395-0.078 0.541-0.2l-0.001 0.001c0.133-0.141 0.215-0.331 0.22-0.539v-0.001c0-0 0-0 0-0 0-0.21-0.084-0.401-0.22-0.54l0 0c-0.138-0.131-0.325-0.211-0.53-0.211-0.419 0-0.76 0.334-0.771 0.75l-0 0.001c0.013 0.212 0.102 0.4 0.24 0.54l-0-0c0.135 0.124 0.316 0.199 0.515 0.199 0.002 0 0.004 0 0.006-0h-0zM3 23.76c0.21-0.004 0.399-0.087 0.54-0.221l-0 0c0.061-0.075 0.115-0.161 0.156-0.252l0.003-0.007c0.038-0.079 0.061-0.173 0.061-0.271 0-0.003-0-0.006-0-0.009v0c-0.004-0.21-0.087-0.4-0.22-0.541l0 0c-0.076-0.061-0.161-0.115-0.253-0.157l-0.008-0.003c-0.082-0.038-0.178-0.060-0.28-0.060s-0.198 0.022-0.284 0.062l0.004-0.002c-0.093 0.040-0.173 0.094-0.24 0.16l0-0c-0.139 0.14-0.228 0.329-0.24 0.539l-0 0.002c0.003 0.213 0.094 0.404 0.24 0.539l0.001 0c0.132 0.136 0.316 0.22 0.52 0.221h0zM9.5 16.739c0.206-0.003 0.395-0.078 0.541-0.2l-0.001 0.001c0.133-0.141 0.215-0.331 0.22-0.539v-0.001c0-0 0-0 0-0 0-0.21-0.084-0.401-0.22-0.54l0 0c-0.145-0.122-0.334-0.196-0.54-0.196s-0.395 0.074-0.541 0.197l0.001-0.001c-0.124 0.144-0.2 0.333-0.2 0.54s0.076 0.396 0.201 0.541l-0.001-0.001c0.145 0.122 0.334 0.197 0.54 0.199h0.001zM16 3.76c0.209-0.004 0.399-0.087 0.54-0.22l-0 0c0.122-0.145 0.197-0.334 0.199-0.539v-0.001c0-0.005 0-0.010 0-0.015 0-0.408-0.331-0.739-0.739-0.739-0.213 0-0.405 0.090-0.54 0.234l-0 0c-0.124 0.123-0.201 0.293-0.201 0.482 0 0.014 0 0.027 0.001 0.040l-0-0.002c-0 0.008-0.001 0.018-0.001 0.027 0 0.198 0.076 0.378 0.201 0.513l-0-0.001c0.139 0.136 0.33 0.22 0.54 0.22 0 0 0 0 0 0v0zM22.5 3.76c0.204-0.001 0.388-0.085 0.519-0.22l0-0c0.142-0.138 0.232-0.328 0.24-0.539l0-0.001c-0.012-0.212-0.102-0.4-0.24-0.54l0 0c-0.142-0.122-0.327-0.196-0.53-0.196s-0.389 0.074-0.531 0.196l0.001-0.001c-0.132 0.141-0.215 0.331-0.219 0.539v0.001c-0 0.003-0 0.007-0 0.011 0 0.414 0.335 0.749 0.749 0.749 0.004 0 0.008-0 0.012-0h-0.001zM15.46 9.54c0.139 0.136 0.33 0.22 0.54 0.22s0.401-0.084 0.54-0.22l-0 0c0.062-0.075 0.115-0.161 0.156-0.254l0.003-0.007c0.023-0.083 0.038-0.179 0.040-0.278l0-0.001c-0.002-0.206-0.077-0.395-0.2-0.541l0.001 0.001c-0.145-0.122-0.334-0.196-0.54-0.196s-0.395 0.074-0.541 0.197l0.001-0.001c-0.124 0.134-0.201 0.314-0.201 0.511 0 0.010 0 0.020 0.001 0.030l-0-0.001c-0.001 0.016-0.002 0.034-0.002 0.052 0 0.082 0.015 0.16 0.044 0.231l-0.002-0.004c0.044 0.1 0.098 0.185 0.162 0.263l-0.002-0.002zM16 16.739c0.411-0.014 0.74-0.351 0.74-0.764 0-0.199-0.076-0.38-0.2-0.516l0.001 0.001c-0.145-0.122-0.334-0.196-0.54-0.196s-0.395 0.074-0.541 0.197l0.001-0.001c-0.124 0.144-0.2 0.333-0.2 0.54s0.076 0.396 0.201 0.541l-0.001-0.001c0.145 0.122 0.334 0.197 0.54 0.199h0zM15.72 23.699c0.079 0.038 0.171 0.061 0.269 0.061 0.004 0 0.008-0 0.012-0h-0.001c0.204-0 0.388-0.085 0.519-0.221l0-0c0.146-0.135 0.238-0.326 0.24-0.539v-0c0-0 0-0 0-0 0-0.21-0.084-0.401-0.22-0.541l0 0c-0.142-0.13-0.332-0.209-0.54-0.209s-0.398 0.080-0.541 0.21l0.001-0.001c-0.123 0.145-0.198 0.334-0.2 0.541v0c-0 0.005-0 0.010-0 0.015 0 0.202 0.076 0.386 0.201 0.525l-0.001-0.001c0.075 0.063 0.16 0.116 0.253 0.157l0.007 0.003zM22.5 16.76c0.002 0 0.005 0 0.008 0 0.098 0 0.192-0.022 0.275-0.062l-0.004 0.002c0.093-0.039 0.173-0.093 0.24-0.159l-0 0c0.139-0.14 0.228-0.328 0.24-0.538l0-0.002c-0.008-0.206-0.099-0.39-0.24-0.52l-0-0c-0.061-0.080-0.143-0.142-0.236-0.178l-0.004-0.001c-0.079-0.029-0.171-0.046-0.267-0.046-0.216 0-0.411 0.086-0.554 0.226l0-0c-0.135 0.133-0.218 0.317-0.219 0.52v0c-0 0.003-0 0.007-0 0.011 0 0.414 0.335 0.749 0.749 0.749 0.004 0 0.008-0 0.012-0h-0.001zM29 3.76c0.204-0.001 0.388-0.085 0.519-0.22l0-0c0.133-0.141 0.216-0.33 0.221-0.539v-0.001c-0.004-0.21-0.087-0.399-0.221-0.54l0 0c-0.14-0.126-0.326-0.203-0.53-0.203s-0.39 0.077-0.531 0.204l0.001-0.001c-0.124 0.144-0.199 0.333-0.199 0.54s0.075 0.396 0.2 0.541l-0.001-0.001c0.14 0.136 0.33 0.22 0.541 0.22 0 0 0 0 0 0v0zM28.459 8.46c-0.124 0.144-0.199 0.333-0.199 0.54s0.075 0.396 0.2 0.541l-0.001-0.001c0.146 0.122 0.334 0.197 0.541 0.199h0c0.007 0 0.015 0 0.023 0 0.396 0 0.718-0.321 0.718-0.718 0-0.008-0-0.015-0-0.023l0 0.001c0-0 0-0 0-0 0-0.21-0.084-0.401-0.221-0.54l0 0c-0.14-0.126-0.326-0.203-0.53-0.203s-0.39 0.077-0.531 0.204l0.001-0.001zM29.52 15.479c-0.136-0.134-0.324-0.218-0.53-0.218s-0.394 0.083-0.53 0.218l0-0c-0.122 0.138-0.197 0.321-0.199 0.52v0.001c-0.001 0.016-0.002 0.035-0.002 0.054 0 0.38 0.308 0.688 0.688 0.688 0.019 0 0.038-0.001 0.057-0.002l-0.002 0c0.007 0 0.015 0 0.023 0 0.396 0 0.718-0.321 0.718-0.718 0-0.008-0-0.015-0-0.023l0 0.001c-0.003-0.101-0.018-0.197-0.043-0.289l0.002 0.008c-0.038-0.098-0.1-0.179-0.178-0.239l-0.001-0.001zM29.279 22.299c-0.083-0.035-0.179-0.056-0.28-0.056-0.213 0-0.406 0.091-0.54 0.237l-0 0.001c-0.124 0.135-0.199 0.315-0.199 0.513 0 0.002 0 0.005 0 0.007v-0c-0.001 0.011-0.001 0.024-0.001 0.037 0 0.189 0.077 0.359 0.2 0.483v0c0.132 0.136 0.317 0.221 0.521 0.221 0.007 0 0.014-0 0.021-0l-0.001 0c0.101-0.003 0.196-0.018 0.288-0.043l-0.008 0.002c0.178-0.099 0.322-0.242 0.417-0.415l0.003-0.005c0.027-0.067 0.043-0.145 0.043-0.227 0-0.018-0.001-0.037-0.002-0.054l0 0.002c0-0 0-0.001 0-0.001 0-0.204-0.085-0.387-0.22-0.518l-0-0c-0.062-0.080-0.143-0.142-0.236-0.18l-0.004-0.001zM29.279 28.299c-0.059-0.016-0.127-0.025-0.197-0.025-0.029 0-0.057 0.002-0.085 0.005l0.003-0v-0.028l-26 0.014c-0.005-0-0.012-0-0.018-0-0.2 0-0.383 0.074-0.523 0.196l0.001-0.001c-0.124 0.134-0.201 0.314-0.201 0.512 0 0.010 0 0.020 0.001 0.030l-0-0.001c-0.001 0.016-0.002 0.034-0.002 0.052 0 0.082 0.015 0.16 0.044 0.231l-0.002-0.004c0.039 0.094 0.093 0.173 0.16 0.24l0 0c0.071 0.076 0.158 0.137 0.255 0.178l0.005 0.002c0.067 0.027 0.146 0.043 0.228 0.043 0.018 0 0.037-0.001 0.055-0.002l-0.002 0v0.010l26-0.010c0.016 0.001 0.034 0.002 0.052 0.002 0.082 0 0.16-0.016 0.231-0.045l-0.004 0.001c0.178-0.099 0.322-0.242 0.417-0.415l0.003-0.005c0.027-0.067 0.043-0.145 0.043-0.227 0-0.018-0.001-0.037-0.002-0.054l0 0.002c-0.004-0.21-0.087-0.4-0.221-0.541l0 0c-0.067-0.066-0.147-0.12-0.235-0.158l-0.005-0.002z"
    ></path>
  </g>
</svg>
`;
bottom.addEventListener("mouseup", () => {
    const currentTarget = getSelected()
    if (!currentTarget) return;
    const cells=[...currentTarget.querySelectorAll(".candyDoc__tableCell")]
    cells.forEach(c=>{
        if (!window.getComputedStyle(c).borderBottom.includes("none"))
        c.style.borderBottom = "none";
    else
        c.style.borderBottom = "1px solid #000000";
    })



});