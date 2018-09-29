import React, { Component } from 'react'
import Agent from './Agent'

export default class MousePad extends Component {
  componentDidMount = () => this.initCanvas()

  initCanvas = () => {
    this.ctx = this.refs.mouse_pad.getContext('2d')
    this.pad = this.refs.mouse_pad
    this.mediaStream = this.pad.captureStream(30)
    this.pad.addEventListener('mousemove', (evt) => {
      const mousePos = this.getMousePos(evt)
      this.drawParticle(mousePos.x, mousePos.y)
    })
    this.agent = new Agent()   
  }

  getMousePos = (evt) => {
    const rect = this.pad.getBoundingClientRect() 
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    }
  }

  drawParticle = (x, y) => {
    this.ctx.beginPath()
    this.ctx.fillStyle = 'green'
    this.ctx.arc(x, y, 3, 0, Math.PI*2, true)
    this.ctx.closePath()
    this.ctx.fill()
  }

  render = () => <canvas style={styles.mousePadStyle} ref="mouse_pad" width={1800} height={900}></canvas>
}

const styles = {
  mousePadStyle: {
    backgroundColor: '#171717',
    position: 'absolute'
  }
}
