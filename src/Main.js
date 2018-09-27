import React, { Component } from 'react'
import MousePad from './MousePad'
import Camera from './Camera'

export default class Main extends Component {
  render = () => (
    <div style={styles.containerStyle}>
      <MouseDetector />
      <Camera />
    </div>
  )
}

const styles = {
  containerStyle: {
    width: '100%',
    height: '100%',
    position: 'relative'a
  }
}
