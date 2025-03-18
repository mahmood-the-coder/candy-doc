import { getSelected } from "../../../selection/index.js";

export const outset = document.createElement("div");
outset.classList.add("candyDoc__inspectorOutsetInput");

const outsetController = document.createElement("input");
outsetController.classList.add("candyDoc__inspectorOutsetInputController")
outsetController.type = "number";
outsetController.min = 0;
outsetController.max = 100;
outsetController.value = "0";
const label = document.createElement("div");
label.classList.add("candyDoc__inspectorOutsetInputLabel")
label.innerText = "Outset"

outsetController.addEventListener("input", (e) => {
    const selected = getSelected();
    if (!selected) return;
    selected.querySelector(".target").style.borderImageOutset = e.target.value + "px"
   

       
    

})
outset.append(label, outsetController)