export function addRemoveHandle(svg,x, y,onRemove,id) {
    const removeGroup = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.style.width = "15px";
    rect.style.height = "15px";
    rect.style.zIndex = 100;
    rect.style.fill = rect.style.stroke = "transparent";
    const removePath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    removePath.setAttribute(
      "d",
      "M5,2 C5,0.895431 5.89543,0 7,0 L9,0 C10.1046,0 11,0.895431 11,2 L11,3 L14,3 C14.5523,3 15,3.44772 15,4 C15,4.55228 14.5523,5 14,5 L13.8462,5 L13.142,14.1534 C13.0619,15.1954 12.193,16 11.1479,16 L4.85206,16 C3.80699,16 2.93811,15.1954 2.85795,14.1534 L2.15385,5 L2,5 C1.44772,5 1,4.55228 1,4 C1,3.44772 1.44772,3 2,3 L5,3 L5,2 Z M7,3 L9,3 L9,2 L7,2 L7,3 Z M4.15975,5 L4.85206,14 L11.1479,14 L11.8402,5 L4.15975,5 Z"
    );
    removeGroup.style.width = "15px";
    removeGroup.style.height = "15px";
    removePath.style.width = "15px";
    removePath.style.height = "15px";
    rect.style.cursor = "pointer";
    removePath.style.fill = "var(--color)";
    // Remove logic for the remove handle
    function removeElement() {
     onRemove()
     removeGroup.remove()
    }
    removePath.dataset.handle = id;
    removeGroup.classList.add("candyDoc__shapeHandle");
    rect.dataset.handle=id;
    rect.addEventListener("click", removeElement);
    removeGroup.append(removePath);
    removeGroup.append(rect);
    svg.append(removeGroup);
    function updateRemoveHandle(x, y) {
      removeGroup.setAttribute("transform", `translate(${x+15},${y+15})`);
    }

    updateRemoveHandle(x, y);
    return {updateRemoveHandle,rect};
  }

 export function makeDraggable(handle, updateCallback) {
    let isDragging = false;

    handle.addEventListener("mousedown", () => {
      isDragging = true;
    });

    window.addEventListener("mousemove", (event) => {
      if (isDragging) {
        const rect = handle.parentElement.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        updateCallback(mouseX, mouseY);
     
      }
    });

    window.addEventListener("mouseup", () => {
      isDragging = false;
    });
  }

  export function updateRemoveHandle(handle,x, y) {
    handle.setAttribute("transform", `translate(${x+15},${y+15})`);
  }