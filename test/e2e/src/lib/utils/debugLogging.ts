import Logger from "../logger";

export function debugLogForWorkerLifecycle(logger: Logger) {
  return {
    onSpawn: () => {
      logger.log("Spawned worker.");
    },
    onTerminate: () => {
      logger.log("Terminated worker.");
    }
  }
}

export function debugLogForWorkerMessages(listener: Function, logger: Logger) {
  return (e: MessageEvent) => {
    if ( !logger.listen(e) ) {
      listener(e);
    }
  }
}