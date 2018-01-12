/* global $ */
import { options, data } from '../data'
const R = require('ramda')
import Chart from 'chart.js'

const attachOptions = arr => arr.map(name => '<option value="' + name + '">' + name + '</option>').join(' ')

const instructorNames = data => R.uniq(data
  .map(sections => sections.instructorName)
  .sort()
)

const UMITrendController = () => {
  const instructorSelect = document.getElementById('umiTrendInstructor')
  instructorSelect.innerHTML = attachOptions(instructorNames(data))

  $('#umiTrendInstructor').selectpicker('val', instructorNames(data)[0])
  $('#umiTrendInstructor').selectpicker('refresh')
}

export default UMITrendController
