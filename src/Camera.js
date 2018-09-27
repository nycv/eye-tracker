import React, { Component } from 'react'

export default class Camera extends Component {
  constructor() {
    super()
    this.polyfillMediaCapture()
    this.startCamera()
  }

  polyfillMediaCapture = () => {
    if (!!navigator.getUserMedia ||
        !!navigator.webkitGetUserMedia ||
        !!navigator.mozGetUserMedia ||
        !!navigator.msGetUserMedia) {
      console.log('media player is ready to go')
    }

    if (navigator.getUserMedia) this.media = navigator.getUserMedia
    else if (navigator.webkitGetUserMedia) this.media = navigator.webkitGetUserMedia
    else if (navigator.mozGetUserMedia) this.media = navigator.mozGetUserMedia
    else if (navigator.msGetUserMedia) this.media = navigator.msGetUserMedia
    else alert('WARNING: your browser is old AF')
  }

  video = () => (
    <div style={styles.videoStyle}>
      <video
        style={{ height: '100%', width: '100%' }}
        src={this.videoSrc}
        autoPlay='true' />
    </div>
  )
  
  startCamera = () => {
    navigator.getUserMedia({ video: true, audio: true },
      (stream) => {
        
        // setup media recorder
        const options = { mimeType: 'video/webm;codecs=h264' }
        const mediaRecorder = new MediaRecorder(stream, options)
        console.log('started media recorder', mediaRecorder)
        
        this.videoSrc = window.URL.createObjectURL(stream)
        this.setState({ videoSrc: this.videoSrc })
        
        mediaRecorder.ondataavailable = this.handleData

        mediaRecorder.start()
        
      }, this.handleStreamError)
  }
  
  
  handleData = (data) => console.log('data chunk', data)
  
  handleStreamError = (err) => console.log('error in video stream', err)
  
  render = () => {
    console.log('hit render')
    if (!!this.videoSrc) return this.video()
    else return null
  }
}

const styles = {
  videoStyle: {
    width: '400',
    height: '300',
    backgroundColor: '#171717',
    opacity: 0.8,
    zIndex: 999,
    position: 'absolute',
    borderRadius: 20
  }
}
