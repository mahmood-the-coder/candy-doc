export const exportPDF = document.createElement("option");
exportPDF.value = "pdf";
exportPDF.label = "As PDF";
exportPDF.classList.add("candyDoc__viewExportOption");

function downloadPDF(fileName, html) {
  const container = document.createElement("div");

  container.style.width = "210mm"; // A4 width in mm
  // A4 height in mm
  container.style.overflow = "hidden";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap="0"
  const pages = html
  .querySelector(".candyDoc__viewPagesWrapper")
  .querySelectorAll(".candyDoc__page");
  
  // Clone and style each page for the PDF container
  pages.forEach((p) => {
    const pageClone = p.cloneNode(true);
    pageClone.style.scale="scale(1)"
    pageClone.style.width = "210mm"; // Ensure proper width for A4
    pageClone.style.height = "297mm"; // Ensure proper height for A4
    pageClone.style.margin = "0"; // Remove margins
    pageClone.style.boxSizing = "border-box"; // Proper sizing
    pageClone.style.outline = "none";
    container.appendChild(pageClone);
  });

  document.body.appendChild(container);
  container.style.height = 297*container.children.length-1+"mm"; 
 
 
  // Configure and generate the PDF
  const options = {
    margin: [0, 0], // No margins
    filename: fileName,
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 8},
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  html2pdf()
    .from(container)
    .set(options)
    .save()
    .finally(() => {
      container.remove(); // Clean up after rendering
    });
}

exportPDF.addEventListener("mousedown", (e) => {
  downloadPDF(document.title + ".pdf", document.body);
});
