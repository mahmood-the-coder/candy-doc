export const toggle = document.createElement("div");
toggle.innerText = "Running Footer";
toggle.classList.add("candyDoc__runningFooterToggle");

let isOpen = false;
export const toggleWrapper = document.createElement("div");
toggleWrapper.classList.add("candyDoc__runningFooterToggleWrapper");
window.addEventListener("mousedown", (e) => {
  if (!e.target.classList.contains("candyDoc__runningFooterToggle")) return;
 

 

  if (isOpen) {
    closeRunningFooter();
  } else {
    openRunningFooter();
  }
});
export function closeRunningFooter() {
  toggleWrapper.style.height = "0";
  isOpen=false
}

export function openRunningFooter() {
  toggleWrapper.style.height = "32px";
  isOpen=true
}

