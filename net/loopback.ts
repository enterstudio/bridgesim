///<reference path="connection.ts" />
///<reference path="message.ts" />

namespace Bridgesim.Net {

  /** Pass messages between two local connections. */
  export class Loopback {
    a: Connection;
    b: Connection;

    constructor() {
      const a = this.a = new LoopbackConnection();
      const b = this.b = new LoopbackConnection();
      a.receiver = b;
      b.receiver = a;
    }

    open() {
      (<LoopbackConnection>this.a).open = true;
      (<LoopbackConnection>this.b).open = true;
      if (this.a.onOpen) {
        this.a.onOpen();
      }
      if (this.b.onOpen) {
        this.b.onOpen();
      }
    }
  }

  class LoopbackConnection implements Connection {
    onMessage;
    onOpen;
    onClose;
    receiver: LoopbackConnection;
    open = false;

    send(msg: Message, reliable: boolean) {
      if (!this.open) {
        console.error('connection closed');
        return;
      }
      if (this.receiver.onMessage) {
        this.receiver.onMessage(msg);
      }
    }

    close() {
      this.open = false;
      if (this.receiver.open) {
        this.receiver.close()
      }
      if (this.onClose) {
        this.onClose();
      }
    }
  }
}