const { Movement, NoMovements, TableRow } = UI

const Index = (function() {

  let movements = [
    // {
    //   date: '2019-05-23',
    //   value: 85000
    // },
    // {
    //   date: '2019-05-23',
    //   value: -13000
    // },
    // {
    //   date: '2019-06-25',
    //   value: 750000
    // }
  ]

  let datasets = []

  function start() {
    console.log('movements running');
    const bindings = bindUi()
    const api = FirebaseApi()
    setListeners(bindings, api)
    refresh(bindings)

    api.getDatasets()
    .then(datasets => datasets.filter(({ type }) => type === 'fondo'))
    .then(ds => {
      datasets = ds
      bindings.datasetSelect.innerHTML = ds.map(d => `<option>${d.name}</option>`).join('\n')
    })
  }

  function bindUi() {
    return {
      addMovementModal: document.getElementById('add-movement-modal'),
      movementsContainer: document.getElementById('movements-container'),
      addMovementsButton: document.getElementById('add-movements-button'),
      calculateButton: document.getElementById('calculate-button'),
      createMovementButton: document.getElementById('create-movement-button'),
      cancelButton: document.getElementById('cancel-button'),
      inputDate: document.getElementById('input-date'),
      inputNumber: document.getElementById('input-number'),
      datasetSelect: document.getElementById('dataset-select'),
      tableBody: document.getElementById('table-body')
    }
  }

  function setListeners(bindings, api) {
    bindings.addMovementsButton.addEventListener('click', () => {
      bindings.addMovementModal.classList.add('is-active')
    })

    bindings.createMovementButton.addEventListener('click', () => {
      console.log('creating movement')
      movements.push({
        date: bindings.inputDate.value,
        value: parseInt(bindings.inputNumber.value, 10)
      })
      refresh(bindings)
      bindings.inputNumber.value = ''
      bindings.addMovementModal.classList.remove('is-active')
    })

    bindings.cancelButton.addEventListener('click', () => {
      bindings.addMovementModal.classList.remove('is-active')
    })

    bindings.calculateButton.addEventListener('click', async () => {
      bindings.calculateButton.classList.add('is-loading')
      if (movements.length === 0) return

      const dataset = datasets[bindings.datasetSelect.selectedIndex]

      let all = movements.map(async m => ({
        datapoint: await api.getDatapoint(`${dataset.id}-${m.date}`),
        date: m.date
      }))

      all = await Promise.all(all)

      const data = [
        {
          date: movements[0].date,
          delta: movements[0].value,
          balance: movements[0].value,
          value: all[0].datapoint.value
        }
      ]

      for (let i = 1; i < movements.length; i++) {
        data.push({
          date: movements[i].date,
          delta: movements[i].value,
          balance: Math.round(data[i - 1].balance * ((all[i].datapoint.value)/(all[i - 1].datapoint.value)) + movements[i].value),
          value: all[i].datapoint.value
        })
      }

      const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD')
      const yesterdayDatapoint = await api.getDatapoint(`${dataset.id}-${yesterday}`)
      data.push({
        date: yesterday,
        delta: 0,
        balance: Math.round(data[data.length - 1].balance * ((yesterdayDatapoint.value)/(all[all.length - 1].datapoint.value))),
        value: yesterdayDatapoint.value
      })

      bindings.tableBody.innerHTML = data.map(TableRow).join('\n')
      bindings.calculateButton.classList.remove('is-loading')
    })
  }

  function refresh(bindings) {
    movements.sort((a, b) => {
      return moment(a.date, 'YYYY-MM-DD').valueOf() - moment(b.date, 'YYYY-MM-DD').valueOf()
    })
    if (movements.length > 0) {
      bindings.calculateButton.removeAttribute('disabled')
      bindings.movementsContainer.innerHTML = movements.map(Movement).join('\n')
      bindings.movementsContainer.querySelectorAll('.is-clickable').forEach((el, index) => {
        el.addEventListener('click', () => {
          movements = movements.filter((_, i) => i !== index)
          refresh(bindings)
        })
      })
    } else {
      bindings.movementsContainer.innerHTML = ''
      bindings.calculateButton.setAttribute('disabled', 'true')
      // TODO: remove listener from calculate button
    }
  }

  return {
    start
  }
})()

window.addEventListener('load', Index.start)
