import './search-card.scss'

import '../date-dropdown/date-dropdown'
import '../dropdown/dropdown'
import '../button/button'
import DateDropdown from '../date-dropdown/date-dropdown'

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
