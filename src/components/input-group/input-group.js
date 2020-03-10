import './input-group.scss'

import '../checkbox/checkbox'
import '../radio/radio'
import '../toggle/toggle'
import '../like-button/like-button'
import '../rating/rating'

$(document).ready(() => {
  const $expandableCheckboxGroup = $(
    '.input-group[data-type="checkbox-expandable"]'
  )
  const $name = $expandableCheckboxGroup.find('.input-group__name')
  const $members = $expandableCheckboxGroup.find('.input-group__members')
  const $expandIcon = $expandableCheckboxGroup.find('.input-group__expand-icon')

  $name.click(() => {
    $members.toggleClass('input-group__members_hide')
    $expandIcon.toggleClass('input-group__expand-icon_rotated')
  })
})
