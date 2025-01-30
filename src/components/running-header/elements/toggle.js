export const toggle = document.createElement("div");
toggle.innerText = "Running Header";
toggle.classList.add("candyDoc__runningHeaderToggle");
let isOpen = false;
export const toggleWrapper = document.createElement("div");
toggleWrapper.classList.add("candyDoc__runningHeaderToggleWrapper");
window.addEventListener("mousedown", (e) => {
  if (!e.target.classList.contains("candyDoc__runningHeaderToggle")) return;
  document.body.querySelector(".candyDoc__runningFooterToggleWrapper").style.height =
    "0";

  if (isOpen) {
    closeRunningHeader();
  } else {
    openRunningHeader();
  }
});

export function openRunningHeader() {
  toggleWrapper.style.height = "32px";
  isOpen=true
}

export function closeRunningHeader() {
  toggleWrapper.style.height = "0";
  isOpen=false
}
