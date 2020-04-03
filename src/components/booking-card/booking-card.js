import './booking-card.scss'

import '../date-dropdown/date-dropdown'
import '../dropdown/dropdown'
import '../button/button'

import plural from 'plural-ru'

class BookingCard {
  constructor(component) {
    // jquerify raw dom element
    this.$bookingCardComponent = $(component)

    // get the price
    this.price = this._data('price')
    // find price element which will store the formatted price
    this.$priceNumber = this.$bookingCardComponent.find(
      '.booking-card__price-number'
    )
    // format price
    this.formattedPrice = this._formatMoney(this.price)
    // put the formatted price there
    this.$priceNumber.text(this.formattedPrice)

    // cache price details node
    this.$priceDetails = this.$bookingCardComponent.find(
      '.booking-card__price-details'
    )

    // compute the number of trip days.
    // get the arrival date and departure date
    this.arrivalDate = this._data('arrival-date')
    this.departureDate = this._data('departure-date')
    // compute number of trip days
    this.tripDays = this._dateDifference(
      new Date(this.departureDate),
      new Date(this.arrivalDate)
    )
    // put price and number of trip days in appropriate element
    this.$pricePerDaysText = this.$priceDetails.find(
      '.booking-card__price-per-days-text'
    )
    this.$pricePerDaysText.text(
      `${this.formattedPrice} x ${this.tripDays} ${plural(
        this.tripDays,
        'сутки',
        'суток'
      )}`
    )
    // compute price for trip days
    this.priceForTripDays = this.price * this.tripDays
    // put formatted price in appropriate element
    this.$pricePerDaysTotalValue = this.$priceDetails.find(
      '.booking-card__price-per-days-total-value'
    )
    this.$pricePerDaysTotalValue.text(this._formatMoney(this.priceForTripDays))

    // get discount, format it and put in appropriate element
    this.discount = this._data('discount')
    this.$discount = this.$priceDetails.find('.booking-card__discount')
    this.$discount.text(`скидка ${this._formatMoney(this.discount)}`)

    // get services, format it and put in appropriate element
    this.services = this._data('services')
    this.$servicesValue = this.$priceDetails.find(
      '.booking-card__services-value'
    )
    this.$servicesValue.text(this._formatMoney(this.services))

    // get additional services, format it and put in appropriate element
    this.additionalServices = this._data('additional-services')
    this.$additionalServicesValue = this.$priceDetails.find(
      '.booking-card__additional-services-value'
    )
    this.$additionalServicesValue.text(
      this._formatMoney(this.additionalServices)
    )

    // compute total value and put it in appropriate element
    this.total =
      this.priceForTripDays +
      this.services +
      this.additionalServices -
      this.discount
    this.$totalValue = this.$priceDetails.find('.booking-card__total-value')
    this.$totalValue.text(this._formatMoney(this.total))
  }

  _formatMoney(number) {
    return new Intl.NumberFormat('ru', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    })
      .format(number)
      .replace(/ (.)$/g, '$1') // removes space between number and currency symbol
  }

  _dateDifference(laterDate, earlierDate) {
    const timeDifference = laterDate.getTime() - earlierDate.getTime()
    // 1000 ms in 1 second * 60 sec in 1 minute * 60 min in 1 hour * 24 hours in 1 day
    const oneDayInMs = 1000 * 60 * 60 * 24
    return timeDifference / oneDayInMs
  }

  _data(name) {
    return this.$bookingCardComponent.data(name)
  }
}

export default BookingCard
