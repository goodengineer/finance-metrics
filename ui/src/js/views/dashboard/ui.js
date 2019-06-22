const UI = (function() {

  const DatasetListItem = props => (`
    <div class="list-item">
      <div class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            <p>${props.name}</p>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <div class="icon is-hoverable-btn is-circle-rounded is-clickable is-animated-fast">
              <i class="fa fa-trash"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  `)

  const DatasetSearchTableItem = props => (`
    <tr>
      <td>${props.name}</td>
      <td>${props.type}</td>
      <td class="is-hidden-mobile">${props.description || '-'}</td>
      <td class="is-hidden-mobile"><a href="${props.source}" class="href">${props.source}</a></td>
    </tr>
  `)

  return {
    DatasetListItem,
    DatasetSearchTableItem
  }
})()
