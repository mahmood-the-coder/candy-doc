import { load } from "../../DB/load.js";

export const exportJSON = document.createElement("option");
exportJSON.value = "json";
exportJSON.label = "As JSON";
exportJSON.classList.add("candyDoc__viewExportOption");

export function downloadJSON(fileName, data) {
  // Convert the data object to a JSON string
  const jsonData = JSON.stringify(data, null, 2);

  // Create a Blob with the JSON data
  const blob = new Blob([jsonData], { type: "application/json" });

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create a temporary <a> element to trigger the download
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName; // Set the filename
  document.body.appendChild(a); // Append the <a> element to the document
  a.click(); // Trigger the download
  document.body.removeChild(a); // Clean up the <a> element
  URL.revokeObjectURL(url); // Revoke the Blob URL to free memory
}

exportJSON.addEventListener("mousedown",()=>{
    load("user-data").then(data=>{
        downloadJSON(document.title+".json",data)
    })
})