import { createColorInput } from "../../../editor-UI/color/index.js";
import { getCenterLayoutElement } from "../../../layout/index.js";
import { windowsFonts } from "../../../windows-fonts/index.js";
export let chapterData = {

}
export function getChapterData() {
    return chapterData;
}
export function setChapterData(newData) {
    chapterData = newData;
}
export const chapterFontWrapper = document.createElement("div");
chapterFontWrapper.classList.add("candyDoc__inspectorChapterToolsWrapper");
const chapterToolsLabel = document.createElement("div");
chapterToolsLabel.classList.add("candyDoc__inspectorChapterToolsLabel")
chapterToolsLabel.innerText = "Chapters Font";

export const font = document.createElement("select");
windowsFonts.forEach(f => {
    const option = document.createElement("option");
    option.label = f;
    option.value = f;
    option.style.fontFamily = f;
    font.append(option);
})

font.addEventListener("change", (e) => {
    const tableOfContents = document.body.querySelectorAll(".candyDoc__tableOfContentPage");
    tableOfContents.forEach(t => {
        [...t.querySelectorAll("li")].filter(li => li.dataset.type == "parent").forEach(li => {
            li.style.fontFamily = e.target.value

        });
    })

    chapterData.font = e.target.value
    saveChapterStyle()

})

font.classList.add("candyDoc__chapterToolsFont")
const fontWrapper = document.createElement("div");
fontWrapper.classList.add("candyDoc__chapterToolsFontWrapper")
const fontLabel = document.createElement("div");
fontLabel.classList.add("candyDoc__chapterToolsFontLabel")
fontLabel.innerHTML = "Font"
fontWrapper.append(fontLabel, font)

export const color = createColorInput();
color.addEventListener("input", (e) => {
    const tableOfContents = document.body.querySelectorAll(".candyDoc__tableOfContentPage");
    tableOfContents.forEach(t => {
        [...t.querySelectorAll("li")].filter(li => li.dataset.type == "parent").forEach(li => {
            li.style.color = e.target.value


        });
    })
    chapterData.color = e.target.value
    saveChapterStyle()
})
const fontSizeWrapper = document.createElement("div");
fontSizeWrapper.classList.add("candyDoc__chapterToolsFontSizeWrapper")
export const fontSize = document.createElement("input");
fontSize.classList.add("candyDoc__chapterToolsFontSize")
fontSize.type = "number";
fontSize.value = "16";
fontSize.max = "50";
fontSize.min = "12";

fontSize.addEventListener("input", (e) => {
    const tableOfContents = document.body.querySelectorAll(".candyDoc__tableOfContentPage");
    tableOfContents.forEach(t => {
        [...t.querySelectorAll("li")].filter(li => li.dataset.type == "parent").forEach(li => {
            li.style.fontSize = e.target.value + "px"


        });
    })
    chapterData.fontSize = e.target.value
    saveChapterStyle()

})
const fontSizeLabel = document.createElement("div");
fontSizeLabel.classList.add("candyDoc__chapterToolsFontSizeLabel")
fontSizeWrapper.append(fontSizeLabel, fontSize)
fontSizeLabel.innerText = "Font Size"

chapterFontWrapper.append(chapterToolsLabel, fontWrapper, fontSizeWrapper, color)

function saveChapterStyle() {
    const tableOfContent = document.body.querySelector(".candyDoc__tableOfContentPage");
    const data = JSON.parse(tableOfContent?.dataset?.tableOfContent ?? "null")?.chapter ?? "null";
    if (!data) return;
    tableOfContent.dataset.tableOfContent = JSON.stringify({
        ...data,
        chapter: {
            font: chapterData.font,
            fontSize: chapterData?.fontSize ?? 16,
            color: chapterData.color
        }
    })

}
window.addEventListener("mouseup",(e)=>{
    if (!getCenterLayoutElement().contains(e.target)) return;
setTimeout(() => {
    const tableOfContent = document.body.querySelector(".candyDoc__tableOfContentPage");
    const data = JSON.parse(tableOfContent?.dataset?.tableOfContent ?? "null");


    if (!data) return;
    const chapterData = data?.chapter ?? {};

    setChapterData(chapterData)
    font.value = chapterData?.font ?? "Arial";
    fontSize.value = chapterData?.fontSize ?? "16"
    color.value = chapterData?.color ?? "#000000"



}, 100);
})
