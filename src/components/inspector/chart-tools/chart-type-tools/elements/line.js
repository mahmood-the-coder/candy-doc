export const line = document.createElement("option");
line.value = "line";
line.label = "Line";
line.selected = "selected";
line.classList.add("candyDoc__inspectorChartTypeOption");

export const lineOptions = {
  labels: [],
  colors: ["#83C5BE", "#FFDDD2"],
  series: [
    {
      name: "Line",
      data: [
        { x: "A", y: 10 },
        { x: "B", y: 20 },
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

    type: "line",
  },
  dataLabels: {
    enabled: true,
  },
  stroke: {
    show: true,
    curve: "straight",
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
  title: {
    align: "center",
    text: "Chart Title",
    style: {
      color: "black",
      fontSize: "16px",
      fontWeight: "500"
    }
  }
};
