import '../../layout/base/base'
import '../../main.scss'
import './cards.scss'

import '../../components/date-dropdown/date-dropdown'
import '../../layout/search-card/search-card'
import '../../layout/registration-card/registration-card'
import '../../layout/login-card/login-card'
import '../../layout/booking-card/booking-card'
import '../../layout/room-card/room-card'
import BookingCard from '../../layout/booking-card/booking-card'
import SearchCard from '../../layout/search-card/search-card'
import DateDropdown from '../../components/date-dropdown/date-dropdown'
import RoomCard from '../../layout/room-card/room-card'

$(document).ready(() => {
  $('.booking-card').each((i, card) => new BookingCard(card))
  $('.search-card').each((i, card) => new SearchCard(card))
  $('.cards__date-dropdown').each((i, dropdown) => new DateDropdown(dropdown))
  $('.room-card').each((i, card) => new RoomCard(card))
})
