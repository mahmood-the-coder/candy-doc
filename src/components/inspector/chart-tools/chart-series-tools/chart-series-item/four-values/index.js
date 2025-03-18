export const fourValueWrapper=document.createElement("div");
fourValueWrapper.classList.add("candyDoc__inspectorChartMultiValueWrapper");
const valueOneLabel=document.createElement("div");
valueOneLabel.innerText="open"
valueOneLabel.classList.add("candyDoc__valueLabel")
const valueOne=document.createElement("div");
valueOne.classList.add("candyDoc__value")
const valueOneController=document.createElement("input")
valueOneController.classList.add("candyDoc__inspectorChartItemValueController")
valueOne.append(valueOneLabel,valueOneController)

const valueTwoLabel=document.createElement("div");
valueTwoLabel.innerText="high"
valueTwoLabel.classList.add("candyDoc__valueLabel")
const valueTwo=document.createElement("div");
valueTwo.classList.add("candyDoc__value")
const valueTwoController=document.createElement("input")
valueTwoController.classList.add("candyDoc__inspectorChartItemValueController")
valueTwo.append(valueTwoLabel,valueTwoController)

const valueThreeLabel=document.createElement("div");
valueThreeLabel.innerText="low"
valueThreeLabel.classList.add("candyDoc__valueLabel")
const valueThree=document.createElement("div");
valueThree.classList.add("candyDoc__value")
const valueThreeController=document.createElement("input")
valueThreeController.classList.add("candyDoc__inspectorChartItemValueController")
valueThree.append(valueThreeLabel,valueThreeController)

const valueFourLabel=document.createElement("div");
valueFourLabel.innerText="close"
valueFourLabel.classList.add("candyDoc__valueLabel")
const valueFour=document.createElement("div");
valueFour.classList.add("candyDoc__value")
const valueFourController=document.createElement("input")
valueFourController.classList.add("candyDoc__inspectorChartItemValueController")
valueFour.append(valueFourLabel,valueFourController)

valueOneController.type="number"
valueTwoController.type="number"
valueThreeController.type="number"
valueFourController.type="number"
fourValueWrapper.append(valueOne,valueTwo,valueThree,valueFour);