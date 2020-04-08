import './search-card.scss'

import '@components/date-dropdown/date-dropdown'
import '@components/dropdown/dropdown'
import '@components/button/button'
import DateDropdown from '@components/date-dropdown/date-dropdown'

class SearchCard {
  constructor(component) {
    // jquerify component
    this.$component = $(component)
    // find date dropdown
    this.$dateDropdown = this.$component.find('.search-card__date-dropdown')
    // initialize dropdown
    new DateDropdown(this.$dateDropdown[0])
  }
}

export default SearchCard
