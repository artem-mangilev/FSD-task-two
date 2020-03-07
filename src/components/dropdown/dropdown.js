import './dropdown.scss'

import plural from 'plural-ru'

$(document).ready(() => {
  const dropdownBlockClass = 'dropdown'
  const dropdownBottonBorderlessModifierClass =
    dropdownBlockClass + '_bottom-borderless'
  const menuElementClass = dropdownBlockClass + '__menu'
  const menuHideModifierClass = menuElementClass + '_hide'
  const optionClass = dropdownBlockClass + '__option'
  const selectionClass = dropdownBlockClass + '__selection'
  const selectionTextClass = dropdownBlockClass + '__selection-text'
  const btnClass = dropdownBlockClass + '__button'
  const incrementBtnClass = dropdownBlockClass + '__increment-button'
  const decrementBtnClass = dropdownBlockClass + '__decrement-button'
  const quantityClass = dropdownBlockClass + '__quantity'

  const $dropdowns = $(`.${dropdownBlockClass}`)

  $dropdowns.each((index, dropdown) => {
    const $dropdown = $(dropdown)
    const $selection = $dropdown.find(`.${selectionClass}`)
    const $selectionText = $selection.find(`.${selectionTextClass}`)
    const $menu = $dropdown.find(`.${menuElementClass}`)
    const $options = $menu.find(`.${optionClass}`)

    const itemsState = $dropdown.data('items')
    const { type } = $dropdown.data('meta')

    const totalItems = () =>
      itemsState.reduce((accum, currentItem) => accum + currentItem.quantity, 0)

    const renderItems = () => {
      $options.each((index, el) => {
        const $quantity = $(el).find(`.${quantityClass}`)
        $quantity.html(`${itemsState[index].quantity}`)
      })
    }

    const renderSelectionText = () => {
      let selectionText

      if (type === 'item-quantity') {
        selectionText = itemsState
          .map(({ quantity, nameForms }) => {
            return `${quantity} ${plural(quantity, ...nameForms)}`
          })
          .slice(0, itemsState.length >= 2 ? 2 : undefined)
          .join(', ')
          .concat('...')
      } else if (type === 'item-quantity-applied') {
        const { selectionTextForms } = $dropdown.data('meta')
        const total = totalItems()

        selectionText = `${total} ${plural(total, ...selectionTextForms)}`
      }

      $selectionText.html(selectionText)
    }

    const renderDecrementButtons = () => {
      $options.each((index, option) => {
        $(option)
          .find(`.${decrementBtnClass}`)
          .prop('disabled', itemsState[index].quantity === 0)
      })
    }

    const render = () => {
      renderItems()
      renderDecrementButtons()
      renderSelectionText()
    }

    const init = () => {
      renderSelectionText()
      renderDecrementButtons()
    }

    init()

    $options.click(function({ target: { classList } }) {
      const optionId = $(this).data('id')

      const targetItem = itemsState[optionId]

      const isButton = classList.contains(btnClass)
      if (isButton) {
        const isIncrementBtn = classList.contains(incrementBtnClass)
        const isDecrementBtn = classList.contains(decrementBtnClass)
        if (isIncrementBtn) {
          targetItem.quantity += 1
        } else if (isDecrementBtn) {
          if (targetItem.quantity > 0) targetItem.quantity -= 1
          else return
        }

        render()
      }
    })

    $selection.click(() => {
      $menu.toggleClass(menuHideModifierClass)
      $dropdown.toggleClass(dropdownBottonBorderlessModifierClass)
    })
  })
})
