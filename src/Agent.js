self.importScripts('../node_modules/gaussian/lib/gaussian.js')

class Agent {
  constructor(gaussian) {
    this.gaussian = gaussian
    this.counter = 0
  }

  async gameLoop(interval) {
    await this.delay(interval)
    this.draw(this.x, this.y)
    this.move(this.x, this.y)
    this.counter++
    return await this.gameLoop(interval)
  }

  init({ width, height }) {
    this.width = width
    this.height = height
    this.initPosition()
    this.gameLoop(100)
  }

  initPosition() {
    // create initial target position
    this.x = this.flatRandom(0, this.width)
    this.y = this.flatRandom(0, this.height)
    
    // create initial target velocity
    this.v = 3

    // create initial direction
    this.d = this.flatRandom(0, 360)
  }
  
  move(x, y) {
    this.checkWalls()
    this.d = this.bellRandom(this.d, 5) % 360
    this.calculatePosition()
  }

  calculatePosition() {
    const yIncrement = Math.round(Math.sin(this.d * Math.PI / 180) * 5)
    const xIncrement = Math.round(Math.sin((180 - this.d - 90) * Math.PI / 180 ) * 5)
    this.x = this.x + xIncrement
    this.y = this.y + yIncrement
  }

  draw(x, y) {
    self.postMessage({ x, y})   
  }

  checkWalls() {
    if (this.x + 25 >= this.width) {
      console.log('hit left wall')
      this.d = this.d + 180
    }
     
    if (this.x <= 0) { 
      console.log('hit right wall')
      this.d = this.d + 180
    }
         
    if (this.y +25 >= this.height) {
      this.d = this.d + 180
      console.log('hit bottom wall')
    }
      
    if (this.y <= 0) {
      console.log('hit top wall')
      this.d = this.d - 180
    }
  }

  // flat random
  flatRandom(min, max) {
    return Math.round(Math.random() * max) + min  
  }

  // gaussian random
  bellRandom(mean, variance) {
    const distribution = this.gaussian(mean, variance)
    return Math.round(distribution.ppf(Math.random()))
  } 
  
  // delay utlity function
  delay(time) {
    return new Promise((res, rej) => {
      setTimeout(() => res(true), time)
    })
  }
}

console.log('web worker script started')

const agent = new Agent(gaussian)

self.onmessage = (msg) => agent.init(msg.data)

