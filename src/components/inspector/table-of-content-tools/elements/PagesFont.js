import { getCenterLayoutElement } from "../../../layout/index.js";
import { windowsFonts } from "../../../windows-fonts/index.js";
let pageData={}
export function getPageData()
{
    return pageData;
}
export function setPageData(newData)
{
    pageData=newData
}
export const pagesFontWrapper=document.createElement("div");
pagesFontWrapper.classList.add("candyDoc__inspectorChapterToolsWrapper");
const pagesToolsLabel=document.createElement("div");
pagesToolsLabel.classList.add("candyDoc__inspectorChapterToolsLabel")
pagesToolsLabel.innerText="Pages Font";

const font=document.createElement("select");
windowsFonts.forEach(f=>{
    const option=document.createElement("option");
    option.label=f;
    option.value=f;
    option.style.fontFamily=f;
    font.append(option);
})
font.classList.add("candyDoc__chapterToolsFont")
font.addEventListener("input",(e)=>{
     const tableOfContents = document.body.querySelectorAll(".candyDoc__tableOfContentPage");
        tableOfContents.forEach(t => {
            [...t.querySelectorAll("li")].filter(li => li.dataset.type != "parent").forEach(li => {
                li.style.fontFamily = e.target.value
    
            });
        })
    
        pageData.font = e.target.value
        savePageStyle()
})
const fontWrapper=document.createElement("div");
fontWrapper.classList.add("candyDoc__chapterToolsFontWrapper")
const fontLabel=document.createElement("div");
fontLabel.classList.add("candyDoc__chapterToolsFontLabel")
fontLabel.innerHTML="Font"
fontWrapper.append(fontLabel,font)
const fontSizeWrapper=document.createElement("div");
fontSizeWrapper.classList.add("candyDoc__chapterToolsFontSizeWrapper")
const fontSize=document.createElement("input");
fontSize.classList.add("candyDoc__chapterToolsFontSize")
fontSize.type="number";
fontSize.value="16";
fontSize.max="50";
fontSize.min="12";
const fontSizeLabel=document.createElement("div");
fontSizeLabel.classList.add("candyDoc__chapterToolsFontSizeLabel")
fontSizeWrapper.append(fontSizeLabel,fontSize)
fontSizeLabel.innerText="Font Size"
fontSize.addEventListener("input",(e)=>{
        const tableOfContents = document.body.querySelectorAll(".candyDoc__tableOfContentPage");
           tableOfContents.forEach(t => {
               [...t.querySelectorAll("li")].filter(li => li.dataset.type != "parent").forEach(li => {
                   li.style.fontSize = e.target.value + "px"
       
       
               });
           })
           pageData.fontSize = e.target.value
           savePageStyle()
})
pagesFontWrapper.append(pagesToolsLabel,fontWrapper,fontSizeWrapper)
function savePageStyle() {
    const tableOfContent = document.body.querySelector(".candyDoc__tableOfContentPage");
    const data = JSON.parse(tableOfContent?.dataset?.tableOfContent ?? "null")?.page??"null";
    if(!data)return;
    tableOfContent.dataset.tableOfContent = JSON.stringify({
        ...data,
        page: {
            font: pageData.font,
            fontSize: pageData?.fontSize??16,
        }
    })

}
window.addEventListener("mouseup",(e)=>{
    if (!getCenterLayoutElement().contains(e.target)) return;
setTimeout(() => {
    const tableOfContent = document.body.querySelector(".candyDoc__tableOfContentPage");
    const data = JSON.parse(tableOfContent?.dataset?.tableOfContent ?? "null");


    if (!data) return;
    const pageData = data?.page ?? {};

    setPageData(pageData)
    font.value = pageData?.font ?? "Arial";
    fontSize.value = pageData?.fontSize ?? "16"



}, 100);
})
