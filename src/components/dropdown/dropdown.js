import './dropdown.scss'

import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.js'
// import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.css'
import plural from 'plural-ru'

$(document).ready(() => {
  const $dropdowns = $('.iqdropdown')

  const onBeforeDecrement = function(id, itemCount) {
    const $decrementBth = $(this).find(
      `.iqdropdown-menu-option[data-id="${id}"] .button-decrement`
    )

    if (itemCount[id] <= 1) {
      $decrementBth.prop('disabled', true)
    }

    return true
  }

  const onBeforeIncrement = function(id) {
    const $decrementBth = $(this).find(
      `.iqdropdown-menu-option[data-id="${id}"] .button-decrement`
    )

    $decrementBth.prop('disabled', false)

    return true
  }

  const commonSettings = context => {
    return {
      beforeDecrement: onBeforeDecrement.bind(context),
      beforeIncrement: onBeforeIncrement.bind(context)
    }
  }

  $dropdowns.each(function() {
    const $this = $(this)
    const { type, selectionTextForms } = $this.data('meta')
    const items = $this.data('items')

    if (type === 'item-quantity') {
      $this.iqDropdown({
        setSelectionText: itemCount => {
          const pluralizedItems = items.map((item, index) => {
            return `${itemCount[index]} ${plural(
              itemCount[index],
              ...item.nameForms
            )}`
          })

          let selectionText = pluralizedItems.slice(0, 2).join(', ') + '...'

          return selectionText
        },
        ...commonSettings(this)
      })
    } else if (type === 'item-quantity-applied') {
      $this.iqDropdown({
        setSelectionText: (itemCount, totalItems) => {
          return `${totalItems} ${plural(totalItems, ...selectionTextForms)}`
        },
        ...commonSettings(this)
      })
    }

    $this
      .find('.button-decrement')
      .filter(index => items[index].quantity === 0)
      .prop('disabled', true)
  })
})
