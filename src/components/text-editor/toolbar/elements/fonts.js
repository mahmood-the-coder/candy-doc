import { windowsFonts } from "../../../windows-fonts/index.js";
export const fonts = document.createElement("select");
fonts.classList.add("candyDoc__textEditorToolbarSelect")
fonts.style.fontSize = "x-small";

windowsFonts.forEach(font => {
    const option = document.createElement("option");
    option.style.fontFamily = font;
    option.label = font;
    option.value = font;
    fonts.append(option);
});
fonts.addEventListener("change", (e) => {
    const font = e.target.value;

    // Ensure selection is applied
    document.execCommand('fontName', false, font);
});

fonts.addEventListener("mousedown",(e)=>{
    e.stopPropagation()
})