const UI = (function() {

  const ChartItem = props => (`
    <div class="column is-half">
      <canvas id="${props.chartId}"></canvas>
    </div>
  `)

  return {
    ChartItem
  }
})()
