import './date-dropdown.scss'

import 'air-datepicker/dist/js/datepicker'
import 'air-datepicker/dist/css/datepicker.css'

class DateDropdown {
  constructor(dropdownComponent) {
    const $dropdownComponent = $(dropdownComponent)
    const $fromDateInput = $dropdownComponent.find('.date-dropdown__input_from')
    const $toDateInput = $dropdownComponent.find('.date-dropdown__input_to')

    let state = {
      fromDate: '',
      toDate: ''
    }

    const datepickerSettings = {
      minDate: new Date(),
      navTitles: {
        days: 'MM yyyy'
      },
      clearButton: true,
      offset: 5,
      prevHtml: '<i class="material-icons">arrow_back</i>',
      nextHtml: '<i class="material-icons">arrow_forward</i>',
      onSelect(
        formattedDate,
        date,
        { $datepicker, $el, opts: { multipleDatesSeparator } }
      ) {
        // on each selecting, show current state of from date
        $el.val(state.fromDate)

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
          state = { fromDate, toDate }
          // set fromDate to actual input
          $el.val(state.fromDate)
          // set toDate to fake input
          $toDateInput.val(state.toDate)
        })

        // when clear button is pressed, both real and fake inputs have to be cleared.
        // find clear button in current instance of datepicker
        const $clearButton = $datepicker.find(
          '.datepicker--button[data-action="clear"]'
        )
        // if clear button is pressed
        $clearButton.click(() => {
          // clear state
          state.fromDate = ''
          state.toDate = ''
          // clear fake input
          $toDate.val(state.toDate)
        })
      }
    }

    // the first input represents the datepicker
    $fromDateInput.datepicker(datepickerSettings)
    // the second input just refers to the first input
    $toDateInput.click(() => $fromDateInput.data('datepicker').show())

    // add apply button to datepicker
    console.log($fromDateInput.data('datepicker'))
    const $buttons = $fromDateInput
      .data('datepicker')
      .$datepicker.find('.datepicker--buttons')
    $buttons.append(
      '<span class="datepicker--button" data-action="apply">Применить</span>'
    )
  }
}

export default DateDropdown
