import './pie-chart.scss'

import '@components/text/text'

import { SVG, on } from '@svgdotjs/svg.js'
import plural from 'plural-ru'

class PieChart {
  constructor(element) {
    // get container for svg
    this.$chart = $(element).find('.pie-chart__container')
    // get data
    this.chartData = this.$chart.data('chart-data')
    // get data name forms
    this.dataNameForms = this.$chart.data('data-name-forms')
    // draw chart
    on(document, 'DOMContentLoaded', this._initChart.bind(this))
  }

  _initChart() {
    const draw = SVG().addTo(this.$chart[0]).size('100%', '100%')

    const chartHeight = this.$chart.height()
    const chartWidth = this.$chart.width()

    if (chartHeight !== chartWidth) {
      return
    }

    const padding = 2
    const radius = chartHeight / 2 - padding
    const arcWidth = 4
    const gap = 0.005 // percentage from 0 to 1
    const gapColor = '#ffffff00'

    this.chartData = this.chartData.filter((portion) => portion.value > 0)

    const portionValues = this.chartData.map((portion) => portion.value)

    const total = portionValues.reduce((acc, cur) => acc + cur)

    const portionPercents = portionValues.map((portion) => portion / total)

    let gappedPortionPercents = []
    portionPercents.forEach((percent) => {
      gappedPortionPercents = [...gappedPortionPercents, percent - gap, gap]
    })

    let gappedColors = []
    this.chartData.forEach((portion) => {
      gappedColors.push(portion.color || portion.gradient)
      gappedColors.push(gapColor)
    })

    const portionRadians = gappedPortionPercents.map(
      (portionPercent) => portionPercent * (Math.PI * 2)
    )

    let currentRadians = 0
    let currentCoord = this._getCirclePoint(currentRadians, radius)

    portionRadians.forEach((radian, i) => {
      currentRadians += radian

      const [arcEndX, arcEndY] = this._getCirclePoint(currentRadians, radius)

      const [currentX, currentY] = currentCoord

      const path = `
        M ${currentX + padding},${currentY + padding}
        A ${radius},${radius} 0, ${
        this._radToDeg(radian) > 180 ? '1' : '0'
      },1 ${arcEndX + padding},${arcEndY + padding}`

      const arc = draw.path(path)

      arc.attr({
        fill: 'none',
        'stroke-width': `${arcWidth}px`,
      })

      const color = gappedColors[i]

      if (typeof color === 'string') {
        arc.attr({ stroke: color })
      } else {
        const gradient = draw.gradient('linear', (add) => {
          add.stop(0, color.from)
          add.stop(1, color.to)
        })

        arc.attr({ stroke: gradient })
      }

      currentCoord = [arcEndX, arcEndY]
    })

    // flip chart
    draw.scale(-1, 1)
    draw.translate(-chartWidth, 0)

    // put total number of data to chart
    const $total = this.$chart.find('.pie-chart__total')
    $total.find('.pie-chart__total-number').text(total)
    // put total text to chart
    $total
      .find('.pie-chart__total-text')
      .text(plural(total, ...this.dataNameForms))
  }

  _getCirclePoint(radians, radius) {
    return [
      radius * Math.sin(radians) + radius,
      radius * -Math.cos(radians) + radius,
    ]
  }

  _radToDeg(rad) {
    return rad * (180 / Math.PI)
  }
}

export default PieChart
