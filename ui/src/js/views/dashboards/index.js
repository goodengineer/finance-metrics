const { DashboardTableHeader, DashboardItem } = UI

const Index = (function() {

  function start() {
    const bindings = bindUi()
    const api = FirebaseApi()
    api.getDashboards()
    .then(data => populate(bindings, data))
  }

  function bindUi() {
    return {
      dashboardsTable: document.getElementById('dashboards-table')
    }
  }

  function populate(bindings, data) {
    bindings.dashboardsTable.innerHTML = [
      DashboardTableHeader(),
      ...data.map(DashboardItem)
    ].join('\n')
  }

  return {
    start
  }
})()

window.addEventListener('load', Index.start)
