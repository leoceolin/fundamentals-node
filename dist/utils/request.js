import { IncomingMessage } from 'http';
export class Request extends IncomingMessage {
    constructor(socket) {
        super(socket);
    }
}
