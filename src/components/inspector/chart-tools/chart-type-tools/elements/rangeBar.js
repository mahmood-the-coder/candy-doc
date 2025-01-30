export const rangeBar = document.createElement("option");
rangeBar.value = "rangeBar";
rangeBar.label = "Range Bar";
rangeBar.selected = "";
rangeBar.classList.add("candyDoc__inspectorChartTypeOption");
export const rangeBarOptions = {
  labels: [],
  colors:["#83C5BE","#FFDDD2"],
  stroke: {
    show: false,
  },
  series: [
    {
      name: "range bar",
      data: [
        { x: "A", y: [10, 20] },
        { x: "B", y: [20, 25] },
        { x: "C", y: [15, 16] },
      ],
    },
  ],
  tooltip: {
    enabled: false,
  },
  chart: {
    animations: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },

    type: "rangeBar",
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  grid: {
    show: true,
    row: {
      colors: ["transparent", "transparent"],
      opacity: 0.5,
    },
    column: {
      colors: ["transparent", "transparent"],
      opacity: 0.5,
    },
  },
  title:{
    align:"center",
    text:"Chart Title",
    style:{
      color:"black",
      fontSize:"16px",
      fontWeight:"500"
    }
  }
};
