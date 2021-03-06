import './dropdown.scss'

import '@components/button/button'
import '@components/label/label'
import '@components/text/text'

import plural from 'plural-ru'

$(document).ready(() => {
  const dropdownBlockClass = 'dropdown'
  const dropdownContainer = dropdownBlockClass + '__container'
  const dropdownBottonBorderRadiuslessClass =
    dropdownContainer + '_bottom-borderless'
  const menuElementClass = dropdownBlockClass + '__menu'
  const menuHideModifierClass = menuElementClass + '_hide'
  const optionClass = dropdownBlockClass + '__option'
  const selectionClass = dropdownBlockClass + '__selection'
  const selectionTextClass = dropdownBlockClass + '__selection-text'
  const btnClass = dropdownBlockClass + '__button'
  const incrementBtnClass = dropdownBlockClass + '__increment-button'
  const decrementBtnClass = dropdownBlockClass + '__decrement-button'
  const quantityClass = dropdownBlockClass + '__quantity'
  const applyBtnClass = dropdownBlockClass + '__apply-button'
  const cleatBtnClass = dropdownBlockClass + '__clear-button'
  const clearBtnHideClass = cleatBtnClass + '_hide'

  const $dropdowns = $(`.${dropdownContainer}`)

  $dropdowns.each((index, dropdown) => {
    const $dropdown = $(dropdown)
    const $selection = $dropdown.find(`.${selectionClass}`)
    const $selectionText = $selection.find(`.${selectionTextClass}`)
    const $menu = $dropdown.find(`.${menuElementClass}`)
    const $options = $menu.find(`.${optionClass}`)
    const $applyBtn = $dropdown.find(`.${applyBtnClass}`)
    const $clearBtn = $dropdown.find(`.${cleatBtnClass}`)

    const itemsState = $dropdown.data('items')
    const { type } = $dropdown.data('meta')

    const totalItems = () =>
      itemsState.reduce((accum, currentItem) => accum + currentItem.quantity, 0)

    const resetItems = () => {
      itemsState.forEach((item) => (item.quantity = 0))
    }

    const updateMenuBottomBorderRadius = () => {
      $dropdown.toggleClass(
        dropdownBottonBorderRadiuslessClass,
        !$menu.hasClass(menuHideModifierClass)
      )
    }

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
          .slice(0, 2)
          .join(', ')
          
        if (itemsState.length > 2) {
          selectionText = `${selectionText}...`
        }
      } else if (type === 'item-quantity-applied') {
        const { selectionTextForms, placeholder } = $dropdown.data('meta')
        const total = totalItems()

        if (total === 0) {
          selectionText = placeholder
        } else {
          selectionText = `${total} ${plural(total, ...selectionTextForms)}`
        }
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

    const renderClearButton = () => {
      $clearBtn.toggleClass(clearBtnHideClass, totalItems() === 0)
    }

    const render = () => {
      renderItems()
      renderDecrementButtons()
      renderSelectionText()
      renderClearButton()
    }

    const init = () => {
      renderSelectionText()
      renderDecrementButtons()
      renderClearButton()

      updateMenuBottomBorderRadius()
    }

    init()

    $options.click(function ({ target: { classList } }) {
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

    const toggleMenu = () => {
      $menu.toggleClass(menuHideModifierClass)
      updateMenuBottomBorderRadius()
    }
    $selection.click(toggleMenu)
    $applyBtn.click(toggleMenu)

    $clearBtn.click(() => {
      resetItems()
      render()
    })
  })
})
