export const rangeValueItemFromController = document.createElement("input");
rangeValueItemFromController.placeholder = "from. . .";
rangeValueItemFromController.classList.add(
  "candyDoc__inspectorChartItemValueController"
);
export const rangeValueItemToController = document.createElement("input");
rangeValueItemToController.placeholder = "to. . .";
rangeValueItemToController.classList.add(
  "candyDoc__inspectorChartItemValueController"
);

rangeValueItemFromController.type="number"
rangeValueItemToController.type="number"

export const rangeValueWrapper=document.createElement("div");
rangeValueWrapper.classList.add("candyDoc__inspectorChartItemValueRange")
