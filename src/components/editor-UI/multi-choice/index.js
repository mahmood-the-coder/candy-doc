import { choiceItem } from "./elements/choiceItem.js";
import { wrapper } from "./elements/wrapper.js";

export function getMultiChoices(choices = [], name = "", currentValue = null) {
  const clone = wrapper.cloneNode(true);
  clone.querySelector(".wrapperLabel").innerText = name;
  choices.forEach((c) => {
    const item = choiceItem.cloneNode(true);
    item.dataset.value = c.value;
    clone.querySelector(".list").append(item);
    const itemLabel = item.querySelector(".label");
    itemLabel.innerText = c.label;
  });
 

  clone.addEventListener("mousedown", (e) => {
     
     
    clone.dataset.selected = e.target.dataset.value;
    clone.querySelectorAll(".item").forEach((i) => {
      i.classList.remove("candyDoc__multiChoiceSelected");
    });
    const selectedChoice = clone.querySelector(
      `[data-value='${e.target.dataset.value}']`
    );
    if (selectedChoice) {
      selectedChoice.classList.add("candyDoc__multiChoiceSelected");
    }
  });

  if (currentValue) {
    clone.dataset.selected = currentValue;
    clone.querySelectorAll(".item").forEach((i) => {
      i.classList.remove("candyDoc__multiChoiceSelected");
    });
    const selectedChoice = clone.querySelector(`[data-value='${currentValue}']`);
    if (selectedChoice) {
      selectedChoice.classList.add("candyDoc__multiChoiceSelected");
      
    }
  }


  return clone;
}