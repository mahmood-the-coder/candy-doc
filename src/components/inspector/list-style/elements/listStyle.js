import { getCenterLayoutElement } from "../../../layout/index.js";
import { getSelected } from "../../../selection/index.js";

export const listStyle=document.createElement("select");
listStyle.value="disk"
listStyle.classList.add("candyDoc__listStyleSelect");
const none=document.createElement("option");
none.value="none";
none.label="None";
none.classList.add("candyDoc__listStyleOption")
const disc=document.createElement("option");
disc.selected="selected"
disc.value="disc";
disc.label="Disc";
disc.classList.add("candyDoc__listStyleOption")
const circle=document.createElement("option");
circle.value="circle";
circle.label="Circle";
circle.classList.add("candyDoc__listStyleOption")
const square=document.createElement("option");
square.value="square";
square.label="Square";
square.classList.add("candyDoc__listStyleOption")
const decimal=document.createElement("option");
decimal.value="decimal";
decimal.label="Decimal";
decimal.classList.add("candyDoc__listStyleOption")
const decimalLeadingZero=document.createElement("option");
decimalLeadingZero.value="decimal-leading-zero";
decimalLeadingZero.label="Decimal with Zero";
decimalLeadingZero.classList.add("candyDoc__listStyleOption")
const lowerRoman=document.createElement("option");
lowerRoman.value="lower-roman";
lowerRoman.label="Lower Roman";
lowerRoman.classList.add("candyDoc__listStyleOption")
const upperRoman=document.createElement("option");
upperRoman.value="upper-roman";
upperRoman.label="Upper Roman";
upperRoman.classList.add("candyDoc__listStyleOption")
const upperLatin=document.createElement("option");
upperLatin.value="upper-latin";
upperLatin.label="Upper Latin";
upperLatin.classList.add("candyDoc__listStyleOption")
const lowerLatin=document.createElement("option");
lowerLatin.value="lower-latin";
lowerLatin.label="Lower Latin";
lowerLatin.classList.add("candyDoc__listStyleOption")
const lowerGreek=document.createElement("option");
lowerGreek.value="lower-greek";
lowerGreek.label="Lower Greek";
lowerGreek.classList.add("candyDoc__listStyleOption")
const hebrew=document.createElement("option");
hebrew.value="hebrew";
hebrew.label="Hebrew";
hebrew.classList.add("candyDoc__listStyleOption")
const georgian=document.createElement("option");
georgian.value="georgian";
georgian.label="Georgian";
georgian.classList.add("candyDoc__listStyleOption")
const katakana=document.createElement("option");
katakana.value="katakana";
katakana.label="Katakana";
katakana.classList.add("candyDoc__listStyleOption")
const hiragana=document.createElement("option");
hiragana.value="hiragana";
hiragana.label="Hiragana";
hiragana.classList.add("candyDoc__listStyleOption")

listStyle.append(none,disc,circle,square,decimal,decimalLeadingZero,upperRoman,lowerRoman,upperLatin,lowerLatin,lowerGreek,georgian,hebrew,katakana,hiragana)
listStyle.addEventListener("input",e=>{
    const selected=getSelected();
    if(!selected)return;
    selected.firstChild.style.listStyleType=e.target.value
})

window.addEventListener("mouseup",(e)=>{
    if(getCenterLayoutElement().contains(e.target))return
    const selected=getSelected();
    if(!selected)return;
    listStyle.value=selected?.firstChild?.style?.listStyleType??"disk"
})