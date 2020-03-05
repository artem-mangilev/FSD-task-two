import './dropdown.scss'

import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.js'
// import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.css'
import plural from 'plural-ru'

$(document).ready(() => {
  const $dropdown = $('.iqdropdown')

  if ($dropdown.data('type') === 'item-quantity') {
    const items = $dropdown.data('items')

    $dropdown.iqDropdown({
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
      beforeDecrement: (id, itemCount) => {
        const $decrementBth = $dropdown.find(
          `.iqdropdown-menu-option[data-id="${id}"] .button-decrement`
        )

        if (itemCount[id] <= 1) {
          $decrementBth.prop('disabled', true)
        }

        return true
      },
      beforeIncrement: id => {
        const $decrementBth = $dropdown.find(
          `.iqdropdown-menu-option[data-id="${id}"] .button-decrement`
        )

        $decrementBth.prop('disabled', false)

        return true
      }
    })

    $dropdown
      .find('.button-decrement')
      .filter(index => items[index].quantity === 0)
      .prop('disabled', true)
  }
})
