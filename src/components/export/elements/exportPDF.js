import { getPagesData } from '../../pages/elements/getPageData.js';

const html2pdf =require("html2pdf.js")

export const exportPDF = document.createElement("option");
exportPDF.value = "PDF";
exportPDF.label = "As PDF";
exportPDF.classList.add("candyDoc__viewExportOption");





export function downloadPDF() {
    const pagesWrapper = getPagesData()
    const opt = {
      margin:       0,
      filename:     'myfile.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 4 },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
     
    // New Promise-based usage:
    html2pdf().from(pagesWrapper).set(opt).save();

}

exportPDF.addEventListener("mousedown",(e)=>{
    downloadPDF()
})
