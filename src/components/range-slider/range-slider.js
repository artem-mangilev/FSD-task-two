import './range-slider.scss'

import 'ion-rangeslider/js/ion.rangeSlider'

$(document).ready(function() {
  const $slider = $('.range-slider__slider')

  $slider.ionRangeSlider({
    type: 'double',
    hide_min_max: true,
    values_separator: ' - ',
    postfix: '₽'
  })
})
