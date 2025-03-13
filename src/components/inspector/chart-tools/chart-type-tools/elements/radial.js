export const radial = document.createElement("option");
radial.value = "radialBar";
radial.label = "Radial";
radial.selected = "";
radial.classList.add("candyDoc__inspectorChartTypeOption");

export const radialOptions = {
  series: [10, 100, 50, 60], // Data values
  labels: ["Apple", "Banana", "Orange", "Coconut"],
  colors: ["#83C5BE", "#FFDDD2"],
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
    type: "radialBar",
    width: "100%",
    height: "100%", // Chart type
    animations: {
      enabled: false, // Disable animations
    },
    toolbar: {
      show: false,
       // Disable toolbar
    },
    zoom: {
      enabled: false, // Disable zoom
    },
  },

  plotOptions: {
    radialBar: {
      track: {
        show: true, // Show tracks for radial bars
      },
      dataLabels: {
        name: {
          show: false, // Show labels (Apple, Banana, etc.)
        },
        value: {
          show: false, // Show values (10, 100, etc.)
        },
        colors:["#000000"]
      },
    },
  },
  legend: {
    show: true, // Disable the legend
    formatter: function (seriesName, opts) {
      return `${seriesName} - ${opts.w.globals.series[opts.seriesIndex]}`;
    },
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
  tooltip: {
    enabled: false, // Disable tooltips
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
