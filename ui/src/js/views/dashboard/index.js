
const Index = (function() {

  const datasetList = [
    { name: 'Dolar' },
    { name: 'Mercado Fondo - Clase A' }
  ]

  const datasetSearchTable = [
    {
      name: 'Mercado Fondo - Clase A',
      type: 'Fondo',
      source: 'https://www.cafci.org.ar/'
    }
  ]

  function start() {
    console.log('dashboard-detail view running');
    const bindings = bindUi()
    setListeners(bindings)
    ChartManager.initialize({ canvas: bindings.canvas })

    fillChartWithRandomData()

    bindings.datasetList.innerHTML = datasetList.map(UI.DatasetListItem).join('')
    bindings.datasetSearchTable.innerHTML = datasetSearchTable.map(UI.DatasetSearchTableItem).join('')
  }

  function bindUi() {
    return {
      canvas: document.getElementById('chart'),
      addDatasetBtn: document.getElementById('add-dataset-btn'),
      datasetSearchModal: document.getElementById('dataset-search-modal'),
      closeModalBtn: document.getElementById('close-modal-btn'),
      datasetList: document.getElementById('dataset-list'),
      datasetSearchTable: document.getElementById('dataset-search-table')
    }
  }

  function setListeners(bindings) {
    bindings.addDatasetBtn.addEventListener('click', () => {
      bindings.datasetSearchModal.classList.add('is-active')
    })

    bindings.closeModalBtn.addEventListener('click', () => {
      bindings.datasetSearchModal.classList.remove('is-active')
    })
  }

  // TODO: remove once we have real data
  function fillChartWithRandomData() {
    color = Chart.helpers.color
    ChartManager.updateChart([
      {
        label: 'Dolar',
        backgroundColor: color(ChartManager.CHART_COLORS.green).alpha(0.5).rgbString(),
        borderColor: ChartManager.CHART_COLORS.green,
        data: randomData({max: 80, min: 20})
      },
      {
        label: 'Mercado Fondo - Clase A',
        backgroundColor: color(ChartManager.CHART_COLORS.blue).alpha(0.5).rgbString(),
        borderColor: ChartManager.CHART_COLORS.blue,
        data: randomData({max: 100, min: 70})
      }
    ])
  }

  function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  function randomData({ min=50, max=150 }={}) {
    const date = moment('2019-05-01', 'YYYY-MM-DD')
    const data = []
    for (let i = 0; i < 30; i++) {
      const currentDate = date.clone().add(i, 'days')
      data.push({ t: currentDate.valueOf(), y: randomNumber(min, max) })
    }
    return data
  }

  return {
    start
  }
})()

window.addEventListener('load', Index.start)
