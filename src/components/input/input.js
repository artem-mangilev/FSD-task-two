import './input.scss'

import $ from 'jquery'
import 'inputmask/dist/jquery.inputmask'

$(document).ready(() => {
  const maskParameters = { 
    alias: 'datetime', 
    inputFormat: 'dd.mm.yyyy',
    placeholder: 'ДД.ММ.ГГГГ' 
  }

  $('.input__field_masked').inputmask(maskParameters)  
})

