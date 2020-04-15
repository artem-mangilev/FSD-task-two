import '../checkbox/checkbox'

import '@components/label/label'
import './checkbox-list.scss'

$(document).ready(() => {
  const $checkboxLists = $('.checkbox-list_expandable')

  $checkboxLists.each(function() {
    const $checkboxList = $(this)

    const $title = $checkboxList.find('.checkbox-list__title')
    const $checkboxes = $checkboxList.find('.checkbox-list__checkboxes')

    const expandedClass = 'checkbox-list__title_expanded'
    const hiddenClass = 'checkbox-list__title_hidden'

    
    $checkboxes.css(
      'display',
      $title.hasClass(expandedClass) ? 'block' : 'none'
    )

    $title.click(() => {
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
})
