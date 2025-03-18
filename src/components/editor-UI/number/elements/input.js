
export const input = document.createElement("div");
const incrementButton = document.createElement("div")
incrementButton.innerText="+"
incrementButton.classList.add("candyDoc__numberInputIncrement","add")
const decrementButton = document.createElement("div")
decrementButton.classList.add("candyDoc__numberInputIncrement","minus")
decrementButton.innerText="-"
const inputController = document.createElement("input")
input.append(incrementButton, inputController, decrementButton);
input.classList.add("candyDoc__numberInputWrapper")