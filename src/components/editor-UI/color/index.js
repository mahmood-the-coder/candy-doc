const Coloris = require("@melloware/coloris")

export function createColorInput(action=()=>{}) {
  Coloris({
    onChange:(e)=>{
     console.log(e);
     
    }
  })
  const input = document.createElement("input");
  input.dataset.coloris = "";
  input.classList.add("candyDoc__coloris")
  input.style.width = "25px";
  input.style.height = "25px";
  input.style.outline = "none";
  input.style.boxShadow = "none";
  input.style.border = "none";
  input.style.border = "1px solid black";
  input.style.borderRadius = "5px";
  input.style.color = "var(--color)";
  input.style.backgroundColor = "var(--color)";
  input.style.userSelect = "none";
  input.style.cursor = "pointer";
  input.style.border = "2px solid black"

  return input;
}


window.addEventListener("input", (e) => {
  if (e.target?.classList?.contains("candyDoc__coloris")) {
    e.target.style.color = e.target.value;
    e.target.style.backgroundColor = e.target.value;
  }
})