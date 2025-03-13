
import { exportJSON } from "./exportJSON.js";

export const wrapper = document.createElement("div");
wrapper.classList.add("candyDoc__viewExportOptionsWrapper");

wrapper.append(exportJSON);
