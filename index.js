/* global $ */
import UMIvsDispersionController from './UMIVsDispersion/UMIvsDispersionController'
import UMITrendController from './UMITrend/UMITrendController'

document.addEventListener('DOMContentLoaded', function () {
  $('.selectpicker').selectpicker()
  $('.bootstrap-select').click(function () {
    $(this).addClass('open')
  })

  UMIvsDispersionController()

  // UMITrendController()
})
