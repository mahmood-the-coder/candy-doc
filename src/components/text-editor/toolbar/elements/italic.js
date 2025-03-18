export const italic=document.createElement("div");
italic.classList.add("candyDoc__textEditorToolbarBold","candyDoc__icon","candyDoc__textEditorIcon")
italic.innerHTML=/*html*/
`
<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
    <path d="M14 1H5V4H7.75219L5.08553 12H2V15H11V12H8.24781L10.9145 4H14V1Z" fill="var(--color)"></path>
  </g>
</svg>
`

italic.addEventListener("mousedown",()=>{
    document.execCommand("italic",false,window.getSelection())
})