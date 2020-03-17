import '../checkbox/checkbox'

import './checkbox-list.scss'

$(document).ready(() => {
  const $checkboxList = $('.checkbox-list_expandable')
  const $title = $checkboxList.find('.checkbox-list__title')
  const $checkboxes = $checkboxList.find('.checkbox-list__checkboxes')

  const expandedClass = 'checkbox-list__title_expanded'
  const hiddenClass = 'checkbox-list__title_hidden'

  $title.click(function() {
    const expanded = $title.hasClass(expandedClass)

    if (expanded) {
      $title.removeClass(expandedClass).addClass(hiddenClass)
      $checkboxes.css('display', 'none')
    } else {
      $title.removeClass(hiddenClass).addClass(expandedClass)
      $checkboxes.css('display', 'block')
    }
  })
})
