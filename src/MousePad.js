import React, { Component } from 'react'

export default class MousePad extends Component {
  componentDidMount = () => this.initCanvas()

  initCanvas = () => {
    this.ctx = this.refs.mouse_pad.getContext('2d')
    this.pad = this.refs.mouse_pad
    this.pad.addEventListener('mousemove', (evt) => {
      const mousePos = this.getMousePos(evt)
      console.log('mousePos', mousePos)
      this.drawParticle(mousePos.x, mousePos.y)
    })
  }

  getMousePos = (evt) => {
    const rect = this.pad.getBoundingClientRect()
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    }
  }

  drawParticle = (x, y) => {
    console.log('drawParticle')
    this.ctx.beginPath()
    this.ctx.fillStyle = 'green'
    this.ctx.arc(x, y, 3, 0, Math.PI*2, true)
    this.ctx.closePath()
    this.ctx.fill()
  }

  render = () => <canvas style={styles.mousePadStyle} ref="mouse_pad" width={1000} height={800}></canvas>
}

const styles = {
  mousePadStyle: {
    backgroundColor: '#171717',
    position: 'absolute'
  }
}
