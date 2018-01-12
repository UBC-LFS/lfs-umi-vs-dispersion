/* global $ */
import { options, data } from '../data'
const R = require('ramda')
import Chart from 'chart.js'

const attachOptions = arr => arr.map(x => '<option value="' + x + '">' + x + '</option>').join(' ')

const instructorNames = data => R.uniq(data
  .map(sections => sections.instructorName)
  .sort()
)

const UMITrendController = () => {
  const UMI = ['UMI1', 'UMI2', 'UMI3', 'UMI4', 'UMI5', 'UMI6']

  const instructorSelect = document.getElementById('umiTrendInstructor')
  instructorSelect.innerHTML = attachOptions(instructorNames(data))

  const umiSelect = document.getElementById('umiTrendUMI')
  umiSelect.innerHTML = attachOptions(UMI)
  umiSelect.value = 'UMI6'

  $('#umiTrendInstructor').selectpicker('val', instructorNames(data)[0])
  $('#umiTrendInstructor').selectpicker('refresh')
  $('#umiTrendUMI').selectpicker('refresh')

  drawChart(instructorSelect.value)

  instructorSelect.addEventListener('change', function () {
    drawChart(instructorSelect.value)
  })
}

const drawChart = instructorName => {
  const instructorData = data.filter(section => section.instructorName === instructorName)

  const ctx = document.getElementById('umiTrendInstructor').getContext('2d')

  return new Chart(ctx, {

  })
}

export default UMITrendController
