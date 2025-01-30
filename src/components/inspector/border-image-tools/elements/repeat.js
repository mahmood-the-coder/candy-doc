import { getSelected } from "../../../selection/index.js";

export const repeat = document.createElement("div");
repeat.classList.add("candyDoc__inspectorToolsWrapper");
const repeatLabel = document.createElement("div");
repeatLabel.innerText = "Border Repeat";
repeatLabel.classList.add("candyDoc__inspectorBorderRepeatLabel");
const repeatTop = document.createElement("div");
const repeatBottom = document.createElement("div");

const repeatTopController = document.createElement("select");
repeatTopController.classList.add("candyDoc__inspectorBorderRepeatController");
const repeatBottomController = document.createElement("select");
repeatBottomController.classList.add(
  "candyDoc__inspectorBorderRepeatController"
);

const repeatTopRound = document.createElement("option");
repeatTopRound.label = "Round";
repeatTopRound.value = "round";
const repeatTopSpace = document.createElement("option");
repeatTopSpace.label = "Space";
repeatTopSpace.value = "space";
const repeatTopStretch = document.createElement("option");
repeatTopStretch.label = "Stretch";
repeatTopStretch.value = "stretch";

const repeatBottomRound = document.createElement("option");
repeatBottomRound.label = "Round";
repeatBottomRound.value = "round";
const repeatBottomSpace = document.createElement("option");
repeatBottomSpace.label = "Space";
repeatBottomSpace.value = "space";
const repeatBottomStretch = document.createElement("option");
repeatBottomStretch.label = "Stretch";
repeatBottomStretch.value = "stretch";

const repeatBottomLabel = document.createElement("div");
repeatBottomLabel.innerText = "Repeat Horizontal";
const repeatTopLabel = document.createElement("div");
repeatTopLabel.innerText = "Repeat Vertical";

repeatBottomController.addEventListener("input", (e) => {

  const selected = getSelected();
  if (!selected) return;
  selected.querySelector(".target").style.borderImageRepeat = `${repeatBottomController.value} ${repeatTopController.value}`

});
repeatTopController.addEventListener("input", (e) => {
  
  const selected = getSelected();
  if (!selected) return;
  selected.querySelector(".target").style.borderImageRepeat =`${repeatBottomController.value} ${repeatTopController.value}`

});

repeatBottomController.append(
  repeatBottomRound,
  repeatBottomSpace,
  repeatBottomStretch
);
repeatTopController.append(repeatTopRound, repeatTopSpace, repeatTopStretch);
repeatTop.append(repeatTopLabel, repeatTopController);
repeatBottom.append(repeatBottomLabel, repeatBottomController);
repeat.append(repeatLabel, repeatTop, repeatBottom);
