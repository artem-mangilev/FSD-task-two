import './booking-card.scss'

import '../date-dropdown/date-dropdown'
import '../dropdown/dropdown'
import '../button/button'

import plural from 'plural-ru'
import DateDropdown from '../date-dropdown/date-dropdown'

class BookingCard {
  constructor(component) {
    // jquerify raw dom element
    this.$component = $(component)

    // get the price
    this.price = this._data('price')
    // find price element which will store the formatted price and
    // put the formatted price there
    this.$priceNumber = this._findEl(this.$component, 'price-number').text(
      this._formatMoney(this.price)
    )

    // cache price details node
    this.$priceDetails = this._findEl(this.$component, 'price-details')

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
    this.$pricePerDaysText = this._findEl(
      this.$priceDetails,
      'price-per-days-text'
    ).text(this.formattedPricePerDays)

    // put formatted price in appropriate element
    this.$pricePerDaysTotalValue = this._findEl(
      this.$priceDetails,
      'price-per-days-total-value'
    )
    this.$pricePerDaysTotalValue.text(this._formatMoney(this.priceForTrip))

    // get discount, format it and put in appropriate element
    this.discount = this._data('discount')
    this.$discount = this._findEl(this.$priceDetails, 'discount').text(
      `скидка ${this._formatMoney(this.discount)}`
    )

    // get services, format it and put in appropriate element
    this.services = this._data('services')
    this.$servicesValue = this._findEl(
      this.$priceDetails,
      'services-value'
    ).text(this._formatMoney(this.services))

    // get additional services, format it and put in appropriate element
    this.additionalServices = this._data('additional-services')
    this.$additionalServicesValue = this._findEl(
      this.$priceDetails,
      'additional-services-value'
    ).text(this._formatMoney(this.additionalServices))

    // compute total value and put it in appropriate element
    this.$totalValue = this._findEl(this.$priceDetails, 'total-value').text(
      this._formatMoney(this.total)
    )

    // find date dropdown raw element and initialize date dropdown
    this.$dateDropdown = this._findEl(this.$component, 'date-dropdown')
    this.dateDropdown = new DateDropdown(this.$dateDropdown[0])

    // when date is changed, update some elements
    this.dateDropdown.onSelect((fromDate, toDate) => {
      // compute trip days
      this.tripDays = this._dateDifference(toDate, fromDate)
      // update price per days text
      this.$pricePerDaysText.text(this.formattedPricePerDays)
      // update price for trip
      this.priceForTrip = this.tripDays
      // put updated formatted price in appropriate element
      this.$pricePerDaysTotalValue.text(this._formatMoney(this.priceForTrip))
      // compute total value and put it in total-value element
      this.$totalValue.text(this._formatMoney(this.total))
    })
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
    return this.$component.data(name)
  }

  // find BEM element
  _findEl($root, elementClass) {
    return $root.find(`.booking-card__${elementClass}`)
  }

  get formattedPricePerDays() {
    return `${this._formatMoney(this.price)} x ${this.tripDays} ${plural(
      this.tripDays,
      'сутки',
      'суток'
    )}`
  }

  get priceForTrip() {
    return this.price * this.tripDays
  }

  set priceForTrip(days) {
    this.price * days
  }

  get total() {
    return (
      this.priceForTrip +
      this.services +
      this.additionalServices -
      this.discount
    )
  }
}

export default BookingCard
