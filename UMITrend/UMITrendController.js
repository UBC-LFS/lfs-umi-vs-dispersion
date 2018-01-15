/* global $ */
import { options, data } from '../data'
import { sortByTerm } from './util'
import Chart from 'chart.js'
const R = require('ramda')
let umiChart = null

const attachOptions = arr => arr.map(x => '<option value="' + x + '">' + x + '</option>').join(' ')

const instructorNames = data => R.uniq(data
  .map(sections => sections.instructorName)
  .sort()
)

const destroyChart = () => {
  if (umiChart !== null) {
    umiChart.destroy()
  }
}

const refreshPicker = () => {
  $('#umiTrendInstructor').selectpicker('refresh')
  $('#umiTrendUMI').selectpicker('refresh')
  $('#umiTrendBelowMin').selectpicker('refresh')
}

const UMITrendController = () => {
  const UMI = ['UMI1', 'UMI2', 'UMI3', 'UMI4', 'UMI5', 'UMI6']

  const instructorSelect = document.getElementById('umiTrendInstructor')
  instructorSelect.innerHTML = attachOptions(instructorNames(data))

  const umiSelect = document.getElementById('umiTrendUMI')
  umiSelect.innerHTML = attachOptions(UMI)
  umiSelect.value = 'UMI6'

  const belowMinimum = document.getElementById('umiTrendBelowMin')
  $('#umiTrendInstructor').selectpicker('val', instructorNames(data)[0])
  $('#umiTrendBelowMin').selectpicker('val', 'false')

  umiChart = drawChart(data.filter(x => belowMinimum.value === 'false' ? true : x.meetsMin), instructorSelect.value)
  refreshPicker()
  instructorSelect.addEventListener('change', function () {
    refreshPicker()
    destroyChart()
    umiChart = drawChart(data.filter(x => belowMinimum.value === 'false' ? true : x.meetsMin), instructorSelect.value, umiSelect.value)
  })

  umiSelect.addEventListener('change', function () {
    refreshPicker()
    destroyChart()
    umiChart = drawChart(data.filter(x => belowMinimum.value === 'false' ? true : x.meetsMin),
      instructorSelect.value,
      umiSelect.value)
  })

  belowMinimum.addEventListener('change', function () {
    refreshPicker()
    destroyChart()
    umiChart = drawChart(
      data.filter(x => belowMinimum.value === 'false' ? true : x.meetsMin),
      instructorSelect.value,
      umiSelect.value
    )
  })
}

const drawChart = (data, instructorName, UMI = 'UMI6') => {
  const instructorData = data.filter(section => section.instructorName === instructorName)
  const sortedByTerm = sortByTerm(instructorData)

  const datasets = () => {
    const sortedData = sortedByTerm.map(x => x[UMI].average).slice(-15)

    return {
      pointRadius: 5,
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      label: instructorName,
      lineTension: 0,
      data: sortedData
    }
  }

  const dataObj = {
    labels: sortedByTerm.map(x => x.year + x.term).slice(-15),
    datasets: [datasets()]
  }

  const ctx = document.getElementById('umiTrendChart').getContext('2d')
  const options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    spanGaps: true
  }

  return new Chart(ctx, {
    type: 'line',
    data: dataObj,
    options
  })
}

export default UMITrendController
