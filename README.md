
## Description

This custom transport class for [sip.js](https://github.com/onsip/sip.js) provides UDP transport.

## Usage Example

```js
    const UDPTransport = require("@unwise-door/sipjs-udp-transport/UDPTransport.js");

    const userAgent = new sipjs.UserAgent({
      uri: sipjs.UserAgent.makeURI(`sip:...@...`),
      authorizationPassword: ...,
      transportConstructor: UDPTransport,
      transportOptions: {
        server: ...,
        port: ...
      },
      ...
    });
```