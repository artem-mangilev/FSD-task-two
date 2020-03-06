import './dropdown.scss'

import plural from 'plural-ru'

$(document).ready(() => {
  const dropdownBlockClass = 'dropdown'
  const dropdownBottonBorderlessModifierClass =
    dropdownBlockClass + '_bottom-borderless'
  const menuElementClass = dropdownBlockClass + '__menu'
  const selectionClass = dropdownBlockClass + '__selection'

  const $dropdown = $(`.${dropdownBlockClass}`)
  const $selection = $dropdown.find(`.${selectionClass}`)
  const $menu = $dropdown.find(`.${menuElementClass}`)

  $selection.click(() => {
    $menu.toggleClass(menuElementClass + '_hide')
    $dropdown.toggleClass(dropdownBottonBorderlessModifierClass)
  })
})
