const toggleInput=document.createElement("input");
toggleInput.type="checkbox";
toggleInput.hidden=true;
toggleInput.classList.add("candyDoc__editorUIToggleInputController")

export const toggleContainer=document.createElement("label");
const toggleHandle=document.createElement("div");


toggleContainer.append(toggleHandle,toggleInput)

toggleContainer.classList.add("candyDoc__editorUIToggleContainer","container");
toggleHandle.classList.add("candyDoc__editorUIToggleHandle","handle");
