
export const heatmap = document.createElement("option");
heatmap.value = "heatmap";
heatmap.label = "Heat Map";
heatmap.selected = "";
heatmap.classList.add("candyDoc__inspectorChartTypeOption");
export const heatmapOptions = {
    labels: [],
    stroke: {
      show: false,
    },
    colors:["#83C5BE","#FFDDD2"],
    series: [
      {
        name: "heatmap",
        data: [
          { x: "A", y: 10 },
          { x: "B", y: 20 },
          { x: "C", y: 15 },
        ],
      },
      {
        name: "heatmap",
        data: [
          { x: "A", y: 10 },
          { x: "B", y: 10 },
          { x: "C", y: 15 },
        ],
      },
      {
        name: "heatmap",
        data: [
          { x: "A", y: 10 },
          { x: "B", y: 25 },
          { x: "C", y: 15 },
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

      type: "heatmap",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
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