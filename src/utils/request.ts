import { IncomingMessage } from 'http'
import { Socket } from 'node:net'

export class Request extends IncomingMessage {
  public body: any
  public params: any
  public query: any

  constructor(socket: Socket) {
    super(socket)
  }
}
