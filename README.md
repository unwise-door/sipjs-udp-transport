
## Description

This custom transport class for [sip.js](https://github.com/onsip/sip.js) provides UDP transport.

## Usage Example

```js
    const UDPTransport = require("@unwise-door/sipjs-udp-transport");

    const username = ''
    const password = ''
    const domain = 'example.com'
    const port = '1010'

    const uri = sipjs.UserAgent.makeURI(`sip:${username}@${domain}:${port}`)

    const userAgent = new sipjs.UserAgent({
      uri,
      authorizationUsername: username,
      authorizationPassword: password,
      transportConstructor: UDPTransport,
      transportOptions: {
        server: ..., // default 0.0.0.0
        port: ..., // default 5060
        asteriskPort: port, //
        asteriskDomain: domain,
      },
      ...
    });
```