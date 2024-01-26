export type Log = {
  message: string;
  timestamp: number;
  source: string;
};

export type LogListenerFn = (logs: Array<Log>) => void;

export default class Logger {
  private readonly _name: string;
  private readonly _isWorker: boolean;
  private _logs: Array<Log>;
  private _listeners: Array<LogListenerFn>;

  constructor(name: string, isWorker: boolean) {
    this._name = name;
    this._isWorker = isWorker;
    this._logs = [];
    this._listeners = [];
  }

  log(value: string | Array<Log> | Log) {
    let logContent;

    if ( Array.isArray(value) ) {
      logContent = value;
      this._logs = this._logs.concat(value);
      this._logs.sort((a, b) => b.timestamp - a.timestamp);
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

  logs(): Array<Log> {
    return this._logs;
  }

  addListener(fn: LogListenerFn) {
    this._listeners.push(fn);
  }

  listen = (e: MessageEvent): boolean => {
    if ( e.data?.type === 'log' ) {
      this.log(e.data.log);
      return true;
    }

    return false;
  }

  clear(): void {
    this._logs = [];
  }
}

export function getLoggerInstance(name: string, isWorker?: boolean): Logger {
  return new Logger(name, isWorker ? true : false);
}