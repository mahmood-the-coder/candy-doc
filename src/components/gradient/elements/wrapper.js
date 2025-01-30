import { addColorLocationButton } from "./addColorLocationButton.js";
import { applyButton } from "./apply.js";
import { clearButton } from "./clear.js";
import { closeIcon } from "./close.js";
import { colorController } from "./colorInput.js";
import { degree } from "./degree.js";
import { gradientBar } from "./gradientBar.js";
import { gradientType } from "./gradientType.js";

export const wrapper = document.createElement("div");
wrapper.classList.add("candyDoc__gradientWrapper");
wrapper.append(addColorLocationButton,colorController ,gradientType, gradientBar,clearButton,applyButton,degree,closeIcon);
