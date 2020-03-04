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
      }
    })
  }
})
