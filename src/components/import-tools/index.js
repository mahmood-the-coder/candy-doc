import { save } from "../DB/save.js";
import { load } from "../DB/load.js";
import { cursor } from "../insert/cursor.js";
import { getCenterLayoutElement } from "../layout/index.js";
import { userData } from "../user-data/userData.js";
import { UpdateDynamicText } from "../dynamic-text/index.js";
import { initCirclesAll } from "../inspector/shapes-tools/insert/elements/circle.js";
import { initCurvesAll } from "../inspector/shapes-tools/insert/elements/curve.js";
import { initEllipsesAll } from "../inspector/shapes-tools/insert/elements/ellipse.js";
import { initLinesAll } from "../inspector/shapes-tools/insert/elements/line.js";
import { initSquareAll } from "../inspector/shapes-tools/insert/elements/square.js";
import { renderHierarchy } from "../hierarchy-items/index.js";

const importIcon = document.createElement("div");
importIcon.dataset.tooltip = "Import JSON"
importIcon.classList.add("candyDoc__icon", "candyDoc__importIcon");
importIcon.innerHTML =
  /*html*/
  `
<svg
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
  fill="var(--color)"
  transform="rotate(180)"
>
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    stroke-linecap="round"
    stroke-linejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    <path
      d="M12 18V3.707L9.354 6.354l-.707-.707L12.5 1.793l3.854 3.854-.707.707L13 3.707V18zm5-2h4v5H4v-5h4v-1H3v7h19v-7h-5z"
    ></path>
    <path fill="none" d="M0 0h24v24H0z"></path>
  </g>
</svg>
`;
function chooseJsonFile() {
  return new Promise((resolve, reject) => {
    // Create an input element for file selection
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json"; // Only accept JSON files

    // Listen for the file selection
    input.addEventListener("change", (event) => {
      const file = event.target.files[0];

      if (file) {
        // Validate file type
        if (file.type === "application/json") {
          resolve(file); // Return the file
        } else {
          reject(new Error("Selected file is not a valid JSON file."));
        }
      } else {
        reject(new Error("No file selected."));
      }
    });

    input.click();
  });
}

importIcon.addEventListener("mousedown", (e) => {
  chooseJsonFile().then((file) => {

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader?.result ?? "null");
        if (data && data.id == "user-data") {
          save(data);
          load("user-data")
            .then((data) => {
           
              
              const pagesWrapperElement = getCenterLayoutElement().querySelector(
                ".candyDoc__pagesWrapper"
              );
              pagesWrapperElement.innerHTML = data.pagesWrapper;
              renderHierarchy(data.hierarchyItems)
           

            })
            .catch(() => {
              const pagesWrapperElement = getCenterLayoutElement().querySelector(
                ".candyDoc__pagesWrapper"
              );
              userData.pagesWrapper = pagesWrapperElement.innerHTML;
              save(userData);
            })
            .finally(() => {
              const content =
                getCenterLayoutElement().querySelector(".candyDoc__content");
              content.append(cursor);
              setTimeout(() => {
                initSquareAll(getCenterLayoutElement());
                initCirclesAll(getCenterLayoutElement());
                initLinesAll(getCenterLayoutElement());
                initEllipsesAll(getCenterLayoutElement());
                initCurvesAll(getCenterLayoutElement())
                UpdateDynamicText()
              }, 100);
            });
        }
      } catch (error) { }
    };
    reader.readAsText(file);
  });
});

const wrapper = document.createElement("div");
wrapper.classList.add("candyDoc__topToolbarImportIconWrapper")
wrapper.append(importIcon);

export function getImportTool() {
  return wrapper;
}
