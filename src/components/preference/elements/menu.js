import { createColorInput } from "../../editor-UI/color/index.js";

export const menu = document.createElement("div");
menu.classList.add("candyDoc__topToolbarPreferenceMenu", "menu");

const colorOption = document.createElement("div");
colorOption.classList.add("candyDoc__topToolsPreferenceMenuItem");
const colorInput = createColorInput();
colorInput.classList.add("candyDoc__topToolbarPreferenceColorInput")
const colorOptionLabel = document.createElement("div");
colorOptionLabel.innerText = "Text Color";
colorOption.append(colorOptionLabel, colorInput);
colorOptionLabel.classList.add("candyDoc__topToolsPreferenceMenuItemLabel");

const backgroundColorOption = document.createElement("div");
backgroundColorOption.classList.add("candyDoc__topToolsPreferenceMenuItem");
const backgroundColorInput = createColorInput();
backgroundColorInput.classList.add("candyDoc__topToolbarPreferenceColorInput")
const backgroundColorOptionLabel = document.createElement("div");
backgroundColorOptionLabel.innerText = "Background Color";
backgroundColorOption.append(backgroundColorOptionLabel, backgroundColorInput);
backgroundColorOptionLabel.classList.add(
  "candyDoc__topToolsPreferenceMenuItemLabel"
);
menu.append(colorOption, backgroundColorOption);

let currentPreference = {
  color: "#7ab2f6",
  background: "rgb(3, 8, 80)",
};

colorInput.value = currentPreference.color;
backgroundColorInput.value = currentPreference.background;

window.addEventListener("load", () => {
  const preference = JSON.parse(localStorage?.getItem("preference") ?? '{color:"#000000",background:"#ffffff}');
  if (!preference) return;
  currentPreference = preference;
  document.documentElement.style.setProperty("--color", preference.color);
  document.documentElement.style.setProperty(
    "--background",
    preference.background
  );

  colorOption.querySelector("input").value=preference.color
  colorOption.querySelector("input").style.backgroundColor=preference.color
  colorOption.querySelector("input").style.color=preference.color
  backgroundColorOption.querySelector("input").value=preference.background
  backgroundColorOption.querySelector("input").style.background=preference.background
  backgroundColorOption.querySelector("input").style.color=preference.background

});
colorOption.addEventListener("input", (e) => {
  document.documentElement.style.setProperty("--color", e.target.value);
  currentPreference.color=e.target.value;
  localStorage.setItem(
    "preference",
    JSON.stringify(currentPreference)
  );
  colorOption.querySelector("input").value=e.target.value
  colorOption.querySelector("input").style.backgroundColor=e.target.value
  colorOption.querySelector("input").style.color=e.target.value
});
backgroundColorOption.addEventListener("input", (e) => {
  document.documentElement.style.setProperty("--background", e.target.value);
  currentPreference.background=e.target.value
  localStorage.setItem(
    "preference",
    JSON.stringify(currentPreference)
  );
  backgroundColorOption.querySelector("input").value=e.target.value
  backgroundColorOption.querySelector("input").style.background=e.target.value
  backgroundColorOption.querySelector("input").style.color=e.target.value
});
