import './date-dropdown.scss'

import 'air-datepicker/dist/js/datepicker'

class DateDropdown {
  constructor(dropdownComponent) {
    // create commpon settings for both component types
    this.commonSettings = {
      minDate: new Date(),
      navTitles: {
        days: 'MM yyyy',
      },
      clearButton: true,
      offset: 5,
      prevHtml: '<i class="material-icons">arrow_back</i>',
      nextHtml: '<i class="material-icons">arrow_forward</i>',
    }

    // initialize state for input field/fields.
    // the first element is range start date, the second is range end date
    this.formattedDateState = ['', '']

    // jquerify DOM element
    this.$dropdownComponent = $(dropdownComponent)

    // get initial range from component
    this.initialRange = this.$dropdownComponent.data('initial-range')

    // find input element for date dropdown, figure out which dropdown's type it represents
    // and call apropriate initializer
    this.$datepickerContainer = this.$dropdownComponent.find(
      '.date-dropdown__datepicker-container'
    )

    if (this.$datepickerContainer.hasClass('date-dropdown__single-input')) {
      this._initFilterDateDropdown()
    } else if (
      this.$datepickerContainer.hasClass('date-dropdown__start-date-input')
    ) {
      this._initDateDropdown()
    } else if (
      this.$datepickerContainer.hasClass('date-dropdown__inline-datepicker')
    ) {
      this._initInlineDatepicker()
    }
  }

  _initDateDropdown() {
    const $startDateInput = this.$datepickerContainer
    const $endDateInput = this.$dropdownComponent.find(
      '.date-dropdown__end-date-input'
    )

    // use arrow function in order to use component's context
    const onSelect = (
      formattedDate,
      date,
      { $datepicker, $el, opts: { multipleDatesSeparator } }
    ) => {
      // on each selecting, show current state of range start date
      $el.val(this.formattedDateState[0])

      // if it's not a range, just skip
      if (date.length !== 2) return

      // find apply button in datepicker
      const $applyButton = $datepicker.find(
        '.datepicker--button[data-action="apply"]'
      )
      // if apply button was clicked
      $applyButton.click(() => {
        // in range, formattedDate is a string of 2 dates divided by multileDatesSeparator
        // extract from & to dates from formattedDate
        const [fromDate, toDate] = formattedDate.split(multipleDatesSeparator)
        // write new state
        this.formattedDateState = [fromDate, toDate]
        // set range start date to actual input
        $el.val(this.formattedDateState[0])
        // set range end date to fake input
        $endDateInput.val(this.formattedDateState[1])
        // hide dropdown after applying the date
        $el.data('datepicker').hide()
        // call onSelect callback
        if (this.onSelectCallback) {
          this.onSelectCallback(...date)
        }
      })

      if (this.isSelectDateMethodUsed) {
        // in range, formattedDate is a string of 2 dates divided by multileDatesSeparator
        // extract from & to dates from formattedDate
        const [fromDate, toDate] = formattedDate.split(multipleDatesSeparator)
        // write new state
        this.formattedDateState = [fromDate, toDate]
        // set range start date to actual input
        $el.val(this.formattedDateState[0])
        // set range end date to fake input
        $endDateInput.val(this.formattedDateState[1])
        // call onSelect callback
        if (this.onSelectCallback) {
          this.onSelectCallback(...date)
        }
        // discard the isSelectDateMethodUsed flag
        this.isSelectDateMethodUsed = false
      }

      // when clear button is pressed, both real and fake inputs have to be cleared.
      // find clear button in current instance of datepicker
      const $clearButton = $datepicker.find(
        '.datepicker--button[data-action="clear"]'
      )
      // if clear button is pressed
      $clearButton.click(() => {
        // clear state
        this.formattedDateState = ['', '']
        // clear fake input
        $endDateInput.val(this.formattedDateState[1])
      })
    }

    const dateDropdownSettings = {
      ...this.commonSettings,
      onSelect,
    }

    // the first input represents the datepicker
    $startDateInput.datepicker(dateDropdownSettings)
    // the second input just refers to the first input
    $endDateInput.click(() => $startDateInput.data('datepicker').show())

    // add apply button to datepicker
    this._addButtons($startDateInput)

    // set initial range to dropdown it it presented
    if (this.initialRange) {
      // set this flag to check if selecting was triggered from code
      this.isSelectDateMethodUsed = true

      this._setIninialRange()
    }
  }

  _initFilterDateDropdown() {
    const $filterDateInput = this.$datepickerContainer

    const onSelect = (
      formattedDate,
      date,
      { $datepicker, $el, opts: { multipleDatesSeparator } }
    ) => {
      // on each selecting, show current state of from date.
      // concatenate dates
      let concatenatedFormattedDateState = this.formattedDateState.join(
        multipleDatesSeparator
      )
      // check if dates are empty
      // if they are empty, prevent showing only multipleDatesSeparator
      // if they are not empty, show dates with multipleDatesSeparator
      concatenatedFormattedDateState =
        concatenatedFormattedDateState === multipleDatesSeparator
          ? ''
          : concatenatedFormattedDateState
      $el.val(concatenatedFormattedDateState)

      // if it's not a range, just skip
      if (date.length !== 2) return

      // find apply button in datepicker
      const $applyButton = $datepicker.find(
        '.datepicker--button[data-action="apply"]'
      )
      $applyButton.click(() => {
        // set new formattedDateState
        this.formattedDateState = formattedDate
          .toLowerCase()
          .split(multipleDatesSeparator)
        // show new date in input field
        $el.val(formattedDate.toLowerCase())
        // hide dropdown after applying the date
        $el.data('datepicker').hide()
      })

      // clear state when clear button pressed.
      const $clearButton = $datepicker.find(
        '.datepicker--button[data-action="clear"]'
      )
      $clearButton.click(() => {
        this.formattedDateState = ['', '']
      })
    }

    const filterDateDropdownSettings = {
      ...this.commonSettings,
      multipleDatesSeparator: ' - ',
      dateFormat: 'd M',
      onSelect,
    }

    // call plugin on input
    $filterDateInput.datepicker(filterDateDropdownSettings)

    // add apply button to datepicker
    this._addButtons($filterDateInput)
  }

  _initInlineDatepicker() {
    const $inlineDatepicker = this.$datepickerContainer

    // call plugin on datepicker container
    $inlineDatepicker.datepicker(this.commonSettings)

    // set initial date
    this.initialRange && this._setIninialRange()

    // add apply button to datepicker
    this._addButtons($inlineDatepicker)
  }

  _addButtons($datepickerInput) {
    const applyButtonHtml =
      '<span class="datepicker--button" data-action="apply">Применить</span>'

    const $buttons = $datepickerInput
      .data('datepicker')
      .$datepicker.find('.datepicker--buttons')
    $buttons.append(applyButtonHtml)
  }

  _setIninialRange() {
    this.$datepickerContainer
      .data('datepicker')
      .selectDate(this.initialRange.map((date) => new Date(date)))
  }

  onSelect(callback) {
    this.onSelectCallback = callback
  }
}

export default DateDropdown
