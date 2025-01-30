import { menu } from "./menu.js";
import { toggle } from "./toggle.js";

export const wrapper=document.createElement("div");
wrapper.classList.add("candyDoc__topToolbarPreferenceWrapper")
wrapper.append(toggle,menu)