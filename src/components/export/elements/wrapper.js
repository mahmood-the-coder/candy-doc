
import { exportJSON } from "./exportJSON.js";
import { exportPDF } from "./exportPDF.js";

export const wrapper = document.createElement("div");
wrapper.classList.add("candyDoc__viewExportOptionsWrapper");

wrapper.append(exportJSON,exportPDF);
