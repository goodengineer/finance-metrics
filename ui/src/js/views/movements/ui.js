const UI = (function() {

  function prettyNumber(n) {
    return `${n}`.split('').reverse().reduce((l, c, i) => {
      if (i % 3 === 0) return [...l, `${c}.`]
      return [...l, `${c}`]
    }, []).reverse().join('').slice(0, -1)
  }

  const Movement = props => (`
    <div class="level is-mobile">
      <div class="level-left">
        <div class="level-item"><i class="fa fa-calendar" style="margin: 8px;"></i>${props.date}</div>
        <div class="level-item ${props.value >= 0 ? 'has-text-success' : 'has-text-danger'}"><i class="fa fa-bitcoin" style="margin: 8px;"></i>${props.value >= 0 ? '+' : '-'}${prettyNumber(Math.abs(props.value))}</div>
      </div>

      <div class="level-right">
        <i class="fa fa-trash is-clickable is-hoverable-btn is-circle-rounded" style="padding: 8px;"></i>
      </div>
    </div>
  `)

  const NoMovements = props => (`
    <h1 class="subtitle">Add a movement</h1>
  `)

  const TableRow = props => (`
    <tr>
      <td>${props.date}</th>
      <td class='${props.delta >= 0 ? 'has-text-success' : 'has-text-danger'}'>${props.delta >= 0 ? '+' : '-'}${prettyNumber(props.delta)}</th>
      <td>${prettyNumber(Math.round(props.balance))}</th>
      <td class='is-hidden-mobile'>${prettyNumber(Math.floor(props.value))},${props.value.toFixed(2).split('.')[1]}</th>
    </tr>
  `)

  return {
    Movement,
    NoMovements,
    TableRow
  }
})()
