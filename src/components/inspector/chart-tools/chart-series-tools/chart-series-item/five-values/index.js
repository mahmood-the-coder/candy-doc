export const fiveValueWrapper=document.createElement("div");
fiveValueWrapper.classList.add("candyDoc__inspectorChartMultiValueWrapper");
const valueOneLabel=document.createElement("div");
valueOneLabel.innerText="min"
valueOneLabel.classList.add("candyDoc__valueLabel")
const valueOne=document.createElement("div");
valueOne.classList.add("candyDoc__value")
const valueOneController=document.createElement("input")
valueOneController.classList.add("candyDoc__inspectorChartItemValueController")
valueOne.append(valueOneLabel,valueOneController)

const valueTwoLabel=document.createElement("div");
valueTwoLabel.innerText="q1"
valueTwoLabel.classList.add("candyDoc__valueLabel")
const valueTwo=document.createElement("div");
valueTwo.classList.add("candyDoc__value")
const valueTwoController=document.createElement("input")
valueTwoController.classList.add("candyDoc__inspectorChartItemValueController")
valueTwo.append(valueTwoLabel,valueTwoController)

const valueThreeLabel=document.createElement("div");
valueThreeLabel.innerText="median"
valueThreeLabel.classList.add("candyDoc__valueLabel")
const valueThree=document.createElement("div");
valueThree.classList.add("candyDoc__value")
const valueThreeController=document.createElement("input")
valueThreeController.classList.add("candyDoc__inspectorChartItemValueController")
valueThree.append(valueThreeLabel,valueThreeController)

const valueFourLabel=document.createElement("div");
valueFourLabel.innerText="q2"
valueFourLabel.classList.add("candyDoc__valueLabel")
const valueFour=document.createElement("div");
valueFour.classList.add("candyDoc__value")
const valueFourController=document.createElement("input")
valueFourController.classList.add("candyDoc__inspectorChartItemValueController")
valueFour.append(valueFourLabel,valueFourController)

const valueFiveLabel=document.createElement("div");
valueFiveLabel.innerText="max"
valueFiveLabel.classList.add("candyDoc__valueLabel")
const valueFive=document.createElement("div");
valueFive.classList.add("candyDoc__value")
const valueFiveController=document.createElement("input")
valueFiveController.classList.add("candyDoc__inspectorChartItemValueController")
valueFive.append(valueFiveLabel,valueFiveController)

fiveValueWrapper.append(valueOne,valueTwo,valueThree,valueFour,valueFive);