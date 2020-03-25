import './date-dropdown.scss'

import 'air-datepicker/dist/js/datepicker'
import 'air-datepicker/dist/css/datepicker.css'

class DateDropdown {
  constructor(dropdownComponent) {
    // create commpon settings for both component types
    this.commonSettings = {
      minDate: new Date(),
      navTitles: {
        days: 'MM yyyy'
      },
      clearButton: true,
      offset: 5,
      prevHtml: '<i class="material-icons">arrow_back</i>',
      nextHtml: '<i class="material-icons">arrow_forward</i>'
    }

    // initialize state for input field/fields.
    // the first element is range start date, the second is range end date
    this.formattedDateState = ['', '']

    // jquerify DOM element
    const $dropdownComponent = $(dropdownComponent)

    // check if this is a date dropdown or filter date dropdown
    this.$filterDateInput = $dropdownComponent.find(
      '.date-dropdown__input_single'
    )
    if (this.$filterDateInput.length) {
      this._initFilterDateDropdown()
    } else {
      // if there is no filter date input, then the component has from & to inputs
      this.$fromDateInput = $dropdownComponent.find(
        '.date-dropdown__input_from'
      )
      this.$toDateInput = $dropdownComponent.find('.date-dropdown__input_to')

      this._initDateDropdown()
    }
  }

  _initDateDropdown() {
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
        this.$toDateInput.val(this.formattedDateState[1])
      })

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
        this.$toDateInput.val(this.formattedDateState[1])
      })
    }

    const dateDropdownSettings = {
      ...this.commonSettings,
      onSelect
    }

    // the first input represents the datepicker
    this.$fromDateInput.datepicker(dateDropdownSettings)
    // the second input just refers to the first input
    this.$toDateInput.click(() => this.$fromDateInput.data('datepicker').show())

    // add apply button to datepicker
    const $buttons = this.$fromDateInput
      .data('datepicker')
      .$datepicker.find('.datepicker--buttons')
    $buttons.append(
      '<span class="datepicker--button" data-action="apply">Применить</span>'
    )
  }

  _initFilterDateDropdown() {
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
      onSelect
    }

    // call plugin on input
    this.$filterDateInput.datepicker(filterDateDropdownSettings)

    // add apply button to datepicker
    const $buttons = this.$filterDateInput
      .data('datepicker')
      .$datepicker.find('.datepicker--buttons')
    $buttons.append(
      '<span class="datepicker--button" data-action="apply">Применить</span>'
    )
  }
}

export default DateDropdown
