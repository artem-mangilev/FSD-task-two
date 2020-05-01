import '@layout/header/header'
import '@layout/room-card/room-card'
import RoomCard from '@layout/room-card/room-card'
import '@layout/footer/footer'

import '@components/date-dropdown/date-dropdown'
import DateDropdown from '@components/date-dropdown/date-dropdown'
import '@components/dropdown/dropdown'
import '@components/range-slider/range-slider'
import '@components/checkbox-list/checkbox-list'
import '@components/pagination/pagination'
import '@components/title/title'

import './search-room.scss'
import '@/main.scss'

$(document).ready(() => {
  const $page = $('.js-search-room')

  const filterDateDropdown = $page.find(
    '.js-search-room__filter-date-dropdown'
  )[0]
  new DateDropdown(filterDateDropdown)

  const $roomCards = $page.find('.search-room__room-preview')
  $roomCards.each((i, roomCard) => new RoomCard(roomCard))
})
