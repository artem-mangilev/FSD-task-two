import './range-slider.scss'

import $ from 'jquery'
import 'ion-rangeslider/js/ion.rangeSlider'

$(document).ready(function() {
  $('.range-slider__slider').ionRangeSlider({
    type: "double",
    hide_min_max: true,
    values_separator: ' - ',
    postfix: '₽'
  })
})
