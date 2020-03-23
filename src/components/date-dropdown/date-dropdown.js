import './date-dropdown.scss'

import 'air-datepicker/dist/js/datepicker'
import 'air-datepicker/dist/css/datepicker.css'

$(document).ready(() => {
  const $fromDate = $('.date-dropdown__input_from')
  const $toDate = $('.date-dropdown__input_to')

  $fromDate.attr('placeholder', 'ДД.ММ.ГГГГ')
  $toDate.attr('placeholder', 'ДД.ММ.ГГГГ')

  const datepickerSettings = {
    minDate: new Date(),
    navTitles: {
      days: 'MM yyyy'
    },
    clearButton: true,
    prevHtml: '<i class="material-icons">arrow_back</i>',
    nextHtml: '<i class="material-icons">arrow_forward</i>',
    onSelect: function(formattedDate, date, instance) {
      // prevent writing selected date in input
      instance.$el.val('')

      // if it's not a range, just skip
      if (date.length !== 2) return

      // find apply button in datepicker
      const $applyButton = instance.$datepicker.find(
        '.datepicker--button[data-action="apply"]'
      )
      // if apply button was clicked
      $applyButton.click(() => {
        // in range, formattedDate is a string of 2 dates divided
        // by separator specified in plugin settings
        const separator = instance.opts.multipleDatesSeparator
        // extract from & to dates from formattedDate
        const [fromDate, toDate] = formattedDate.split(separator)
        // set fromDate to actual input
        instance.$el.val(fromDate)
        // set toDate to fake input
        $toDate.val(toDate)
      })

      // when clear button is pressed, both real and fake inputs have to be cleared.
      // find clear button in current instance of datepicker
      const $clearButton = instance.$datepicker.find(
        '.datepicker--button[data-action="clear"]'
      )
      // if clear button is pressed
      $clearButton.click(() => {
        // clear fake input
        $toDate.val('')
      })

      console.log(instance)
    }
  }

  // the first input represents the datepicker
  $fromDate.datepicker(datepickerSettings)
  // the second input just refers to the first input
  $toDate.click(() => $fromDate.focus())

  // add apply button to datepicker
  const $buttons = $('.datepicker--buttons')
  $buttons.append(
    '<span class="datepicker--button" data-action="apply">Применить</span>'
  )
})
