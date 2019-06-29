const UI = (function() {

  const DashboardTableHeader = () => (`
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
      </tr>
    </thead>
  `)

  const DashboardItem = props => (`
    <tr>
      <td> <a href='dashboard?dashboard_id=${props.id}'>${props.name}</a> </td>
      <td>${props.description}</td>
    </tr>
  `)

  return {
    DashboardTableHeader,
    DashboardItem
  }
})()
