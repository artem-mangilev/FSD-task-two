import './range-slider.scss'

import $ from 'jquery'
import 'ion-rangeslider/js/ion.rangeSlider'
import 'ion-rangeslider/css/ion.rangeSlider.min.css'

$(document).ready(function() {
  $('.range-slider__slider').ionRangeSlider({
    type: "double",
    hide_min_max: true,
    values_separator: ' - ',
    postfix: '₽'
  })
})
