import './room-card.scss'

import '../../components/rating/rating'

import 'lightslider'

class RoomCard {
  constructor(component) {
    // jquerify component
    this.$component = $(component)

    // find component for slider & initialize slider
    this.$slider = this.$component.find('.room-card__gallery')
    this.$slider.lightSlider({
      item: 1,
      adaptiveHeight: true,
      nextHtml: '<i class="material-icons">expand_more</i>',
      prevHtml: '<i class="material-icons">expand_more</i>',
    })
  }
}

export default RoomCard
