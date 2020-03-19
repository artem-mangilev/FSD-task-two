import './date-dropdown.scss'

import 'air-datepicker/dist/js/datepicker'
import 'air-datepicker/dist/css/datepicker.css'

const $date = $('.date-dropdown__input')
const $fromDate = $('.date-dropdown__input_from')
const $toDate = $('.date-dropdown__input_to')

$fromDate.attr('placeholder', 'ДД.ММ.ГГГГ')
$toDate.attr('placeholder', 'ДД.ММ.ГГГГ')

let selected = true
$date.datepicker({
  minDate: new Date(),
  navTitles: {
    days: 'MM yyyy'
  },
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
