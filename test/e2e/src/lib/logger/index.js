export default class Logger {
  constructor(name, isWorker) {
    this._name = name;
    this._isWorker = isWorker;
    this._logs = [];
    this._listeners = [];
  }

  log(value) {
    let logContent;

    if ( Array.isArray(value) ) {
      logContent = value;
      this._logs = this._logs.concat(value);
      this._logs.sort((a, b) => a.timestamp < b.timestamp);
    } else {
      if ( typeof value === 'object' ) {
        logContent = value;
      } else {
        logContent = {
          message: `${value}`,
          timestamp: Date.now(),
          source: this._name
        };
      }

      this._logs.push(logContent);
    }

    if ( this._isWorker ) {
      postMessage({
        type: 'log',
        log: logContent
      });
    } else {
      this._listeners.forEach(fn => fn(this._logs));
    }
  }

  logs() {
    return this._logs;
  }

  addListener(fn) {
    this._listeners.push(fn);
  }

  listen = (e) => {
    if ( e.data?.type === 'log' ) {
      this.log(e.data.log);
      return true;
    }

    return false;
  }

  clear() {
    this._logs = [];
  }
}

export function getLoggerInstance(name, isWorker) {
  return new Logger(name, isWorker ? true : false);
}