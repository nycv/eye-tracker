
class Agent {
  constructor(ctx) {
    this.ctx = ctx
    console.log('your name is neo')
  }
  
  async gameLoop(frameInterval) {
    await this.delay(frameInterval)
    this.move()
    this.draw()
    return await this.gameLoop()
  }
  
  move(x, y) {
    console.log('calculating move...')
  }

  draw(x, y) {
    console.log('drawing circle on canvas')
  }

  // flat random
  
  // gaussian random
  
  
  // delay utlity function
  delay(time) {
    return new Promise((res, rej) => {
      setTimeout(res(true), time)
    })
  }
}

const main = () => {
  console.log('trying to start script...')
  const agent = new Agent()
  agent.gameLoop()
}

main()
