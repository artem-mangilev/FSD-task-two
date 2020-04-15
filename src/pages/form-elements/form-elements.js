import '@layout/base/base'

import '@components/label/label'
import '@components/text-field/text-field'
import '@components/dropdown/dropdown'
import '@components/like-button/like-button'
import '@components/rating/rating'
import '@components/range-slider/range-slider'
import '@components/button/button'
import '@components/checkbox-list/checkbox-list'
import '@components/radio/radio'
import '@components/toggle/toggle'
import '@components/pagination/pagination'
import '@components/bullet-list/bullet-list'
import '@components/features/features'
import '@components/comment/comment'
import '@components/date-dropdown/date-dropdown'
import DateDropdown from '@components/date-dropdown/date-dropdown'

import '@/main.scss'
import './form-elements.scss'


$(document).ready(() => {
  const $dateDropdowns = $('.date-dropdown')
  $dateDropdowns.each((index, dropdown) => {
    new DateDropdown(dropdown)
  })
})
