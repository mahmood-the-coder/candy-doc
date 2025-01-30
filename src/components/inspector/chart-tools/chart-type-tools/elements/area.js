export const area = document.createElement("option");
area.value = "area";
area.label = "Area";
area.selected = "";
area.classList.add("candyDoc__inspectorChartTypeOption");

export const areaOptions = {
  labels: [],
  colors: ["#83C5BE", "#FFDDD2"],
  series: [
    {
      name: "area",
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
    type: "area",
    animations: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      show: true,
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
  },
  title: {
    align: "center",
    text: "Chart Title",
    style: {
      color: "black",
      fontSize: "16px",
      fontWeight: "500",
    },
  },
};
