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
      speed: 800,
      animateGradually: {
        enabled: false,
        delay: 150
      },
      dynamicAnimation: {
        enabled: false,
        speed: 350
      }
    },
    toolbar: {
      show: false,
    },

    type: "line",
    width: "100%",
    height: "100%",
  },
  dataLabels: {
    enabled: true,
    colors:["#000000"]
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
