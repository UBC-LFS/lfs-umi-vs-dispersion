/* global $ */
import { options, data } from '../data'
import drawUMIVsDispersion from './drawUMIVsDispersion'
const R = require('ramda')

const attachGraph = (data, umi = 'UMI6') => {
  const svg = document.getElementById('UMIVsDispersionSVG')
  if (svg) svg.parentElement.removeChild(svg)
  const graph = document.getElementById('UMIvsDispersionGraph')
  graph.appendChild(drawUMIVsDispersion(data, umi).node())
}

const attachOptions = arr => arr.map(x => '<option value="' + x + '">' + x + '</option>').join(' ')

const refreshPicker = () => {
  $('#umiVsDispersionInstructor').selectpicker('refresh')
  $('#umiVsDispersionYear').selectpicker('refresh')
  $('#umiVsDispersionTerm').selectpicker('refresh')
  $('#umiVsDispersionUMI').selectpicker('refresh')
}

const initUMIVsDispersion = () => {
  const instructorSelect = document.getElementById('umiVsDispersionInstructor')
  const yearSelect = document.getElementById('umiVsDispersionYear')
  const termSelect = document.getElementById('umiVsDispersionTerm')
  const umiSelect = document.getElementById('umiVsDispersionUMI')
  const belowMinSelect = document.getElementById('umiVsDispersionBelowMin')
  const UMI = ['UMI1', 'UMI2', 'UMI3', 'UMI4', 'UMI5', 'UMI6']
  const elements = [yearSelect, termSelect, umiSelect, belowMinSelect]

  options.years.unshift('all')
  options.depts.unshift('all')
  options.terms.unshift('all')

  umiSelect.value = 'UMI6'

  console.log(R.uniq(data.map(sections => sections.instructorName)).sort())

  const instructorNames = R.uniq(data.map(sections => sections.instructorName)).sort()

  instructorNames.unshift('all')

  instructorSelect.innerHTML = attachOptions(instructorNames)
  yearSelect.innerHTML = attachOptions(options.years)
  termSelect.innerHTML = attachOptions(options.terms)
  umiSelect.innerHTML = attachOptions(UMI)

  $('#umiVsDispersionInstructor').selectpicker('val', instructorNames[0])
  $('#umiVsDispersionYear').selectpicker('val', options.years[options.years.length - 1])
  $('#umiVsDispersionTerm').selectpicker('val', options.terms[0])
  $('#umiVsDispersionUMI').selectpicker('val', 'UMI6')

  refreshPicker()

  const filterData = data => data
    .filter(x => instructorSelect.value === 'all' ? true : x.instructorName === instructorSelect.value)
    .filter(x => yearSelect.value === 'all' ? true : x.year === Number(yearSelect.value))
    .filter(x => termSelect.value === 'all' ? true : termSelect.value === x.term)
    .filter(x => belowMinSelect.value === 'true' ? x.meetsMin : true)

  attachGraph(filterData(data))

  elements.map(el => el.addEventListener('change', function () {
    attachGraph(filterData(data), umiSelect.value)
  }))
}

export default initUMIVsDispersion
