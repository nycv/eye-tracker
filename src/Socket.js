export default class Socket {
  constructor(params) {
    if (!params.host) throw 'provide destination ws host'
    if (!params.port) throw 'provide destingation ws port'
    this.URL = `${params.host}:${params.port}/ws`
    this.connect()
  }

  connect = () => {
    this.ws = new WebSocket(this.URL)
    
    this.ws.onopen = () => {
      this.connected = true
      console.log ('websocket is connected to server')
    }

    this.ws.onclose = () => {
      this.connected = false
      console.log ('websocket to server has been closed')
      setTimeout ( this.connect(), 1000)
    }
  }
}
