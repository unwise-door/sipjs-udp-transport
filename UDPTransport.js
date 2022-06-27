const udp = require('dgram');

class UDPTransport {
  constructor(logger, options) {
    this.logger = logger;
    this.port = options.port || 5060;
    this.server = options.server;
  }
  connect() {
    this.client = udp.createSocket('udp4');

    this.client.on('error', (err) => {
      this.logger.warn("UDP socket closed unexpectedly");
      this.logger.log(err);
      this.client.close();
    });

    this.client.on('message', (msg, rinfo) => {
      this.logMessage("received", msg);
      if (this.onMessage) {
        try {
          this.onMessage(msg.toString('utf8'));
        }
        catch (e) {
          this.logger.error(e);
          this.logger.error("Exception thrown by onMessage callback");
          throw e; // rethrow unhandled exception
        }
      }
    });

    this.client.on('listening', () => {
      const address = this.client.address();
    });

    return new Promise((resolve, reject) => {
      this.client.connect(this.port, this.server, (err) => {
        if (err) reject(err);
        resolve();
      })
    });
  }

  logMessage(action, msg) {
    const lines = msg.toString('utf8').split("\r\n");
    this.logger.debug(`${action} ${lines[0]}${lines.length > 1?" [...]":""}`)
  }

  send(data) {
    this.logMessage("sending", data);
    return new Promise((resolve, reject) => {
      this.client.send(data, (err) => {
        if (err) reject(err);
        resolve();
      })
    });
  }
}

module.exports = UDPTransport;