import './date-dropdown.scss'

import 'air-datepicker/dist/js/datepicker'
import 'air-datepicker/dist/css/datepicker.css'

$(document).ready(() => {
  const $date = $('.date-dropdown__input')
  const $fromDate = $('.date-dropdown__input_from')
  const $toDate = $('.date-dropdown__input_to')
  const $rangeFrom = $('-range-from-')
  const $cells = $('.datepicker--cells')

  $fromDate.attr('placeholder', 'ДД.ММ.ГГГГ')
  $toDate.attr('placeholder', 'ДД.ММ.ГГГГ')

  let selected = true
  const datepicker = $date
    .datepicker({
      minDate: new Date(),
      navTitles: {
        days: 'MM yyyy'
      },
      clearButton: true,
      prevHtml: '<i class="material-icons">arrow_back</i>',
      nextHtml: '<i class="material-icons">arrow_forward</i>',
      onSelect: (formattedDate, date, { $el }) => {
        // if range selected
        if (date.length === 2) {
          selected = !selected

          const [fromDate, toDate] = formattedDate.split(',')

          if ($el.hasClass('date-dropdown__input_from')) {
            $el.val(fromDate)
            $toDate.val(toDate)

            if (!selected) {
              $toDate.data('datepicker').selectDate(date)
            }
          } else if ($el.hasClass('date-dropdown__input_to')) {
            $el.val(toDate)
            $fromDate.val(fromDate)

            if (!selected) {
              $fromDate.data('datepicker').selectDate(date)
            }
          }
        }
      }
    })
    .data('datepicker')

  const $buttons = $('.datepicker--buttons')
  $buttons.append('<span class="datepicker--button" data-action="apply">Применить</span>')
})
