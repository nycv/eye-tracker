import React, { Component } from 'react'
import Socket from './Socket'

const socketParams = {
  host: 'ws://localhost',
  port: '3050',
}

export default class Camera extends Component {
  constructor() {
    super()
    this.socket = new Socket(socketParams)
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
    navigator.getUserMedia({ video: true, audio: false },
      (stream) => {
        console.log('stream', stream)

        // setup media recorder
        const options = {
          mimeType: 'video/webm;codecs=h264',
          videoBitsPerSecond : 3000000
        }

        this.mediaRecorder = new MediaRecorder(stream, options)
        
        // create url to view video stream
        this.videoSrc = window.URL.createObjectURL(stream)
        this.setState({ videoSrc: this.videoSrc })
        
        this.mediaRecorder.start(1000) // 1 second chunks
        
        // handle each chunk of data as it comes
        this.mediaRecorder.ondataavailable = this.handleData
        
        // TODO: need better error handlin
        this.mediaRecorder.onerror = this.handleError

      }, this.handleStreamError) // TODO: handle stream error, gracefully... 
  }

  handleError = (err) => {
    console.log('error in media ecorder', err)

    // TODO: stop and retry media recorder...
    this.mediaRecorder.stop()
  }

  handleData = (data) => {
    try {
      console.log('data', data.data)
      this.socket.ws.send(data.data)     
    } catch (err) {
      console.log('error sending data over ws', err)
    }
  }

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
