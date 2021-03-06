import './room-details.scss'
import '@/main.scss'

import '@layout/header/header'
import '@layout/booking-card/booking-card'
import BookingCard from '@layout/booking-card/booking-card'
import '@layout/footer/footer'

import '@components/features/features'
import '@components/comment/comment'
import '@components/bullet-list/bullet-list'
import '@components/text/text'
import '@components/subtitle/subtitle'
import '@components/pie-chart/pie-chart'
import PieChart from '@components/pie-chart/pie-chart'

$('.js-room-details__pie-chart').each((i, element) => new PieChart(element))

$('.js-room-details__booking-card').each(
  (i, element) => new BookingCard(element)
)
