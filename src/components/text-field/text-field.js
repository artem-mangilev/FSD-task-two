import './text-field.scss'

import 'inputmask/dist/jquery.inputmask'

$(document).ready(() => {
  const $textInput = $('.text-field_masked-date input')

  const placeholder = $textInput.data('mask-placeholder')

  const maskParameters = {
    alias: 'datetime',
    inputFormat: 'dd.mm.yyyy',
    placeholder
  }

  $textInput.inputmask(maskParameters)
})
