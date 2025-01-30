export const choiceItem=document.createElement("div");
choiceItem.classList.add("candyDoc___editorUIMultiChoiceItem","item");
const label=document.createElement("div");
label.style.pointerEvents="none"
label.classList.add("candyDoc___editorUIMultiChoiceItemLabel","label");
choiceItem.append(label)