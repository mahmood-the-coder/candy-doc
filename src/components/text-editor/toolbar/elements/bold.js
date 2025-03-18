export const bold=document.createElement("div");
bold.classList.add("candyDoc__textEditorToolbarBold","candyDoc__icon","candyDoc__textEditorIcon")
bold.innerHTML=/*html*/
`
<svg  viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
    <path fill-rule="evenodd" clip-rule="evenodd"
      d="M2 1H8.625C11.0412 1 13 2.95875 13 5.375C13 6.08661 12.8301 6.75853 12.5287 7.35243C13.4313 8.15386 14 9.32301 14 10.625C14 13.0412 12.0412 15 9.625 15H2V1ZM5.5 9.75V11.5H9.625C10.1082 11.5 10.5 11.1082 10.5 10.625C10.5 10.1418 10.1082 9.75 9.625 9.75H5.5ZM5.5 6.25H8.625C9.10825 6.25 9.5 5.85825 9.5 5.375C9.5 4.89175 9.10825 4.5 8.625 4.5H5.5V6.25Z"
      fill="var(--color)"></path>
  </g>
</svg>
`

bold.addEventListener("mousedown",()=>{
    document.execCommand("bold",false,window.getSelection())
})