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
    type: "radialBar", // Chart type
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
