
export default class Agent {
  constructor(ctx) {
    this.ctx = ctx
    console.log('your name is neo')
  }

  gameLoop = async (frameInterval) => {
    while (true) {
      await this.delay(frameInterval)
      this.move()
      this.draw()
    }
  }
  
  move = (x, y) => {
    console.log('calculating move...')
  }

  draw = (x, y) => {
    console.log('drawing circle on canvas')
  }
  
  // delay utlity function
  delay = (time) => {
    return new Promise((res, rej) => {
      setTimeout(resolve(true), time)
    })
  }
}
