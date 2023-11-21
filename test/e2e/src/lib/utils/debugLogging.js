export function debugLogForWorkerLifecycle(logger) {
  return {
    onSpawn: () => {
      logger.log("Spawned worker.");
    },
    onTerminate: () => {
      logger.log("Terminated worker.");
    }
  }
}

export function debugLogForWorkerMessages(listener, logger) {
  return (e) => {
    if ( !logger.listen(e) ) {
      listener(e);
    }
  }
}