import { createImage } from "../image/index.js";
import { wrapper } from "./elements/wrapper.js";
let currentAction=null;
export function openFileModal(action) {
  document.body.append(wrapper);
  currentAction=action;
}
wrapper
.querySelector(".candyDoc__fileModalButton")
.addEventListener("mousedown", (e) => {
  selectImageAndConvertToBase64().then((dataURL) => {
    const image = createImage(dataURL);
    currentAction(image);
  }).finally(() => {closeModal();});
});
handleImageDrop(wrapper).then((dataURL) => {
const image = createImage(dataURL);
currentAction(image);
});
export function closeModal() {
  wrapper?.remove();
  currentAction=null;
}

function selectImageAndConvertToBase64() {
  return new Promise((resolve, reject) => {
    // Create an input element of type file
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*"; // Accept only image files

    // Listen for the file selection event
    input.addEventListener("change", async (event) => {
      const file = event.target.files[0]; // Get the selected file

      if (!file) {
        reject(new Error("No file selected"));
        return;
      }

      const reader = new FileReader();

      // Listen for the file reading event
      reader.onload = () => {
        resolve(reader.result); 
     
      };

      reader.onerror = () => {
        reject(new Error("Error reading file"));
      };

      reader.readAsDataURL(file); // Read the file as a data URL (Base64)
    });

    // Trigger the file selection dialog
    input.click();
  });
}

function handleImageDrop(dropZone) {
  return new Promise((resolve, reject) => {
    if (!dropZone) {
      reject(new Error("Element not found"));
      return;
    }

    // Prevent default drag behaviors
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      dropZone.addEventListener(eventName, (e) => e.preventDefault());
    });

    // Highlight the drop area on dragover
    dropZone.addEventListener("dragover", () => {
      dropZone.classList.add("highlight");
    });

    dropZone.addEventListener("dragleave", () => {
      dropZone.classList.remove("highlight");
    });

    // Handle the drop event
    dropZone.addEventListener("drop", (event) => {
      dropZone.classList.remove("highlight");

      const file = event.dataTransfer.files[0]; // Get the first file

      if (!file) {
        reject(new Error("No file dropped"));
        return;
      }

      if (!file.type.startsWith("image/")) {
        reject(new Error("Dropped file is not an image"));
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result); // Base64 string of the image
      };

      reader.onerror = () => {
        reject(new Error("Error reading file"));
      };

      reader.readAsDataURL(file); // Read the file as a data URL (Base64)
    });
  });
}
