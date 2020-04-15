import './pagination.scss'

import '@components/text/text'

import 'paginationjs/dist/pagination'

$(document).ready(() => {
  const $pagination = $('.pagination__container')

  const isTestMode = $pagination.data('test-mode')

  if (isTestMode) {
    const testData = new Array(15).fill('', 0, 15)

    $pagination.pagination({
      dataSource: testData,
      pageSize: 1,
      pageRange: 1,
      showPrevious: false,
      autoHideNext: true,
      nextText: '<i class="material-icons">arrow_forward</i>'
    })
  }
})
