const { ChartItem } = UI

const Index = (function() {

  async function start() {
    const bindings = bindUi()
    const api = FirebaseApi()

    const dashboardId = getDashboardIdParameter()
    if(!dashboardId) {
      throw Error('url parameter dashboard_id is required')
    }
    const dashboard = await api.getDashboard(dashboardId)
    const chartsWithData = await Promise.all(dashboard.charts.map(c => getChart(api, c)))

    populate(bindings, { dashboard, chartsWithData })
  }

  function getChart(api, chart) {
    switch(chart.type) {
      case 'CR': return getChartTypeCR(api, chart)
      case 'S': return getChartTypeS(api, chart)
    }
    throw Error(`can't handle chart of type: ${chart.type}`)
  }

  // TODO: refactor to tidy up
  async function getChartTypeCR(api, chart) {
    const firstDataset = await api.getDataset(chart.datasets[0])
    const secondDataset = await api.getDataset(chart.datasets[1])
    const since = moment().subtract(60, 'days').valueOf()

    const firstDatapoints = await api.getDatapoints(chart.datasets[0], since)
    const secondDatapoints = await api.getDatapoints(chart.datasets[1], since)

    const delta = 30

    const firstData = firstDatapoints
    .map(({ date, value }, i) => {
      if (i <= delta) return undefined
      const y = ((value / firstDatapoints[i - delta].value) - 1) * 100
      return { t: date, y }
    })
    .filter(x => x)

    const secondData = secondDatapoints
    .map(({ date, value }, i) => {
      if (i <= delta) return undefined
      const y = ((value / secondDatapoints[i - delta].value) - 1) * 100
      return { t: date, y }
    })
    .filter(x => x)

    const thirdData = firstData.map((fd, i) => ({ t: fd.t,  y: fd.y - secondData[i].y}))

    console.log(firstData.length);

    return [
      { ...chart.colors[0], label: firstDataset.name, data: firstData },
      { ...chart.colors[1], label: secondDataset.name, data: secondData },
      { ...chart.colors[2], label: 'Difference', data: thirdData }
    ]
  }

  async function getChartTypeS(api, chart) {
    const color = chart.colors[0]
    const datasetId = chart.datasets[0]
    const dataset = await api.getDataset(datasetId)
    const since = moment().subtract(30, 'days').valueOf()
    const datapoints = await api.getDatapoints(datasetId, since)
    const data = datapoints.map(({ date, value }) => ({ t: date, y: value }))

    return [{ ...color, label: dataset.name, data }]
  }

  function getDashboardIdParameter() {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get('dashboard_id')
  }

  function bindUi() {
    return {
      title: document.getElementById('title'),
      charts: document.getElementById('charts')
    }
  }

  function populate(bindings, data) {
    bindings.title.innerHTML = data.dashboard.name

    data.chartsWithData.forEach((chart, i) => {
      const chartId = `chart-${i}`
      bindings.charts.innerHTML += ChartItem({ chartId })
    })

    data.chartsWithData.forEach((chart, i) => {
      const chartId = `chart-${i}`
      const chartCanvas = document.getElementById(chartId)
      const manager = ChartManager(chartId, chartCanvas)
      manager.updateChart(chart)
    })
  }

  return {
    start
  }
})()

window.addEventListener('load', Index.start)
