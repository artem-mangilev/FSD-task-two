import '../../layout/base'
import '../../scss/style.scss'
import './cards.scss'

import '../../components/search-card/search-card'
import '../../components/registration-card/registration-card'
import '../../components/login-card/login-card'
import '../../components/booking-card/booking-card'
import BookingCard from '../../components/booking-card/booking-card'
import SearchCard from '../../components/search-card/search-card'

$(document).ready(() => {
  $('.booking-card').each((i, card) => new BookingCard(card))
  $('.search-card').each((i, card) => new SearchCard(card))
})
