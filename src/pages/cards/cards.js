import '../../layout/base'
import '../../scss/style.scss'
import './cards.scss'

import '../../components/date-dropdown/date-dropdown'
import '../../components/search-card/search-card'
import '../../components/registration-card/registration-card'
import '../../components/login-card/login-card'
import '../../components/booking-card/booking-card'
import '../../components/room-card/room-card'
import BookingCard from '../../components/booking-card/booking-card'
import SearchCard from '../../components/search-card/search-card'
import DateDropdown from '../../components/date-dropdown/date-dropdown'
import RoomCard from '../../components/room-card/room-card'

$(document).ready(() => {
  $('.booking-card').each((i, card) => new BookingCard(card))
  $('.search-card').each((i, card) => new SearchCard(card))
  $('.cards__date-dropdown').each((i, dropdown) => new DateDropdown(dropdown))
  $('.room-card').each((i, card) => new RoomCard(card))
})
