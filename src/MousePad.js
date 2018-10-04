import React, { Component } from 'react'

export default class MousePad extends Component {
  componentDidMount = () => this.initCanvas()
  
  // create canvas element
  initCanvas = () => {
    this.ctx = this.refs.mouse_pad.getContext('2d')
    this.pad = this.refs.mouse_pad
    this.mediaStream = this.pad.captureStream(30)
    this.pad.addEventListener('mousemove', (evt) => {
      const mousePos = this.getMousePos(evt)
    })
    
    // spawn web worker thread to handle game loop
    this.startAgentWorker()
  }

  getMousePos = (evt) => {
    const rect = this.pad.getBoundingClientRect() 
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    }
  }

  drawParticle = (x, y) => {
    if (this.x && this.y) this.cutParticle(this.x, this.y)
    this.ctx.beginPath()
    this.ctx.fillStyle = '#39ff14'
    this.ctx.arc(x, y, 50, 0, Math.PI*2, true)
    this.ctx.closePath()
    this.ctx.fill()
    this.x = x
    this.y = y
  }
  
  cutParticle = (x, y) => {
    this.ctx.beginPath()
    this.ctx.fillStyle=('#171717')
    this.ctx.arc(x, y, 50, 0, Math.PI*2, true)
    this.ctx.fill()
    this.ctx.closePath()
  }

  startAgentWorker = () => {
    if (window.Worker) {
      // spawn worker thread
      this.agent = new Worker('./src/Agent.js')

      // send canvas dimension to worker
      this.agent.postMessage({ width: this.pad.width, height: this.pad.height })

      // receive position updates from worker
      this.agent.onmessage = (msg) => this.drawParticle(msg.data.x, msg.data.y)
    }
  }

  render = () => <canvas style={styles.mousePadStyle} ref="mouse_pad" width={1800} height={900}></canvas>
}

const styles = {
  mousePadStyle: {
    backgroundColor: '#171717',
    position: 'absolute'
  }
}
