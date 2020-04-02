import './cards.scss'

import '../../components/search-card/search-card'
import '../../components/registration-card/registration-card'
import '../../components/login-card/login-card'
import '../../components/booking-card/booking-card'
import BookingCard from '../../components/booking-card/booking-card'

$(document).ready(() => {
  $('.booking-card').each((i, card) => new BookingCard(card))
})
