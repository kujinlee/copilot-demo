const Transport = require('winston-transport');

class MockDatadogTransport extends Transport {
  constructor(opts) {
    super(opts);
  }

  log(info, callback) {
    setImmediate(() => this.emit('logged', info));
    console.log(`Mock Datadog log - level: ${info.level}, message: ${info.message}`);
    callback();
  }
}

module.exports = MockDatadogTransport;
