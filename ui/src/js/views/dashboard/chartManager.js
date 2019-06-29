const ChartManager = function(name, canvas) {

  const cfg = {
    type: 'bar',
    data: {
      datasets: []
    },
    options: {
      scales: {
        xAxes: [{
          type: 'time',
          distribution: 'series',
          time: {
            unit: 'day'
          },
          ticks: {
            source: 'data',
            autoSkip: true
          }
        }],
        yAxes: [{
          ticks: {
            display: true,
            // beginAtZero: true,
            // suggestedMax: 200
          },
          scaleLabel: {
            display: true,
            labelString: 'Value'
          }
        }]
      },
      // tooltips: {
      //   intersect: false,
      //   mode: 'index',
      //   callbacks: {
      //     label: function(tooltipItem, myData) {
      //       var label = myData.datasets[tooltipItem.datasetIndex].label || '';
      //       if (label) {
      //         label += ': ';
      //       }
      //       label += parseFloat(tooltipItem.value).toFixed(2);
      //       return label;
      //     }
      //   }
      // }
    }
  }

  const ctx = canvas.getContext('2d')
  window[name] = new Chart(ctx, cfg)

  const CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
  }

  // missing: label, backgroundColor, borderColor, data
  const baseDataset = {
    type: 'line',
    pointRadius: 0,
    fill: false,
    lineTension: 0,
    borderWidth: 2
  }

  function updateChart([...datasets]) {
    /*
    * label: string
    * backgroundColor: string, supports alpha
    * borderColor: string, no alpha
    * data: [{ t: moment.valueOf(), y: number }]
    */
    cfg.data.datasets = datasets.map(({ label, backgroundColor, borderColor, data }) => ({
      ...baseDataset,
      label,
      backgroundColor,
      borderColor,
      data
    }))

    const min = datasets.map(({ data }) => data.map(({ y }) => y).reduce((a, b) => Math.min(a, b), 999999)).reduce((a, b) => Math.min(a, b), 999999)
    const max = datasets.map(({ data }) => data.map(({ y }) => y).reduce((a, b) => Math.max(a, b), -1)).reduce((a, b) => Math.max(a, b), -1)

    const margin = (max - min) * 0.1
    cfg.options.scales.yAxes[0].ticks.suggestedMin = min - margin
    cfg.options.scales.yAxes[0].ticks.suggestedMax = max + margin

    window[name].update()
  }

  return {
    updateChart,
    CHART_COLORS
  }
}
