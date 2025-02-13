export const toggle = document.createElement("div");
toggle.innerText = "Page Actions";
toggle.classList.add("candyDoc__pageActionsToggle");
let isOpen = false;


toggle.addEventListener("mousedown", (e) => {
  const wrapper= document.body.querySelector(".candyDoc__pageActionsWrapper")
  if (isOpen) {
    close(wrapper);
  } else {
    open(wrapper);
  }
});


function open(wrapper) {
  wrapper.style.height = "32px";
  wrapper.children.forEach(c => c.style.visibility = "visible");
  isOpen = true;
}

function close(wrapper) {
  wrapper.style.height = "0";
  wrapper.children.forEach(c => c.style.visibility = "hidden");
  toggle.style.visibility = "visible";
  isOpen = false;
}

