import './dropdown.scss'

import plural from 'plural-ru'

$(document).ready(() => {
  const dropdownBlockClass = 'dropdown'
  const dropdownBottonBorderlessModifierClass =
    dropdownBlockClass + '_bottom-borderless'
  const menuElementClass = dropdownBlockClass + '__menu'
  const optionClass = dropdownBlockClass + '__option'
  const selectionClass = dropdownBlockClass + '__selection'
  const selectionTextClass = dropdownBlockClass + '__selection-text'
  const incrementBtnClass = dropdownBlockClass + '__increment-button'
  const decrementBtnClass = dropdownBlockClass + '__decrement-button'
  const quantityClass = dropdownBlockClass + '__quantity'

  const $dropdown = $(`.${dropdownBlockClass}`)
  const $selection = $dropdown.find(`.${selectionClass}`)
  const $selectionText = $selection.find(`.${selectionTextClass}`)
  const $menu = $dropdown.find(`.${menuElementClass}`)
  const $options = $menu.find(`.${optionClass}`)
  // const $incrementBtn = $dropdown.find(`${incrementBtnClass}`)
  // const $decrementBtn = $dropdown.find(`${decrementBtnClass}`)

  const itemsState = $dropdown.data('items')

  const renderItems = () => {
    $options.each(function(index) {
      const $quantity = $(this).find(`.${quantityClass}`)
      $quantity.html(`${itemsState[index].quantity}`)
    })
  }

  const renderSelectionText = () => {
    const selectionText = itemsState
      .map(({ quantity, nameForms }) => {
        return `${quantity} ${plural(quantity, ...nameForms)}`
      })
      .slice(0, itemsState.length >= 2 ? 2 : undefined)
      .join(', ')
      .concat('...')

    $selectionText.html(selectionText)
  }

  const render = () => {
    renderItems()
    renderSelectionText()
  }

  $options.click(function({ target: { classList } }) {
    const optionId = $(this).data('id')

    const targetItem = itemsState[optionId]

    const isIncrementBtn = classList.contains(incrementBtnClass)
    const isDecrementBtn = classList.contains(decrementBtnClass)
    if (isIncrementBtn) {
      targetItem.quantity += 1
    } else if (isDecrementBtn) {
      if (targetItem.quantity > 0) targetItem.quantity -= 1
      else return
    }

    render()
  })

  $selection.click(() => {
    $menu.toggleClass(menuElementClass + '_hide')
    $dropdown.toggleClass(dropdownBottonBorderlessModifierClass)
  })
})
