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
      case 'CR': return getChartTypeS(api, chart) // TODO: change to getChartTypeCR when implemented
      case 'S': return getChartTypeS(api, chart)
    }
    throw Error(`can't handle chart of type: ${chart.type}`)
  }

  function getChartTypeCR(api, chart) {
    // TODO: implement
  }

  async function getChartTypeS(api, chart) {
    const color = chart.colors[0]
    const datasetId = chart.datasets[0]
    const dataset = await api.getDataset(datasetId)
    const datapoints = await api.getDatapoints(datasetId)
    const data = datapoints.map(({ date, value }) => ({ t: moment(date, 'YYYY-MM-DD').valueOf(), y: value }))

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
