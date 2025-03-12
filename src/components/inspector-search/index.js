import { getInspector } from "../inspector/index.js";

export const searchInput = document.createElement("input");
searchInput.classList.add("candyDoc__inspectorSearch");
searchInput.placeholder = "Search. . .";
let searching = ""
searchInput.addEventListener("input", (e) => {
    searching = e.target.value.trim();
    if (searching == "") {
        getInspector().children.forEach(tool => {
            tool.style.display = "flex";
            
        })
    }
    else {
        const tools = [...getInspector().children]
        tools.forEach(tool => {
            if (tool.textContent.toLocaleLowerCase().includes(searching.toLowerCase())) {
                tool.style.display = "flex";
              
            }
            else {
                tool.style.display = "none";
               
            }
        })
    }
});