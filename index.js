/* global $ */
import UMIvsDispersionController from './UMIVsDispersion/UMIvsDispersionController'

document.addEventListener('DOMContentLoaded', function () {
  $('.selectpicker').selectpicker()
  $('.bootstrap-select').click(function () {
    $(this).addClass('open')
  })

  UMIvsDispersionController()
})
