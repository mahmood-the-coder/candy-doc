import { button } from "./button.js";
import { close } from "./close.js";
export const wrapper = document.createElement("div");
wrapper.classList.add("candyDoc__fileModal");
wrapper.append(button, close);

