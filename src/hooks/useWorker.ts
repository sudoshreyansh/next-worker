import { WorkerFactory, WorkerState, MessageListener, WorkerStatus } from "../types";
import { useState, useEffect, useCallback, useRef } from "react";

function spawnWorker(factory: WorkerFactory, listener: MessageListener): Worker {
  const worker = factory();
  worker.addEventListener('message', listener);

  return worker;
}

function terminateWorker(worker: Worker) {
  worker.terminate();
}

// TODO: Error handling
function useWorker(factory: WorkerFactory, listener: MessageListener, config: any) {
  const [_, setIsActive] = useState<boolean>(false);
  const listenerRef = useRef<MessageListener>();
  const workerRef = useRef<WorkerState>({
    status: WorkerStatus.LOADING
  });
  const configRef = useRef<any>({});

  listenerRef.current = listener;
  configRef.current = config;

  useEffect(() => {
    workerRef.current.worker = spawnWorker(factory, e => listenerRef.current(e));
    workerRef.current.status = WorkerStatus.READY;

    workerRef.current.worker.addEventListener('error', (e: Error) => {
      // console.log
      workerRef.current.status = WorkerStatus.ERROR;
      setIsActive(false);
    })
    
    if ( configRef.current.onSpawn )
      configRef.current.onSpawn();

    setIsActive(true);

    return () => {
      terminateWorker(workerRef.current.worker);
      workerRef.current.status = WorkerStatus.TERMINATED;
      
      if ( configRef.current.onTerminate )
        configRef.current.onTerminate();

      setIsActive(false);
    }
  }, []);

  return {
    get isLoading() {
      return workerRef.current.status === WorkerStatus.LOADING;
    },

    get isError() {
      return workerRef.current.status === WorkerStatus.ERROR;
    },
    
    get isReady() {
      return workerRef.current.status === WorkerStatus.READY;
    },

    postMessage(message: any) {
      workerRef.current.worker.postMessage(message);
    }
  };
}

export function useWorkerFactory(workerFactory: WorkerFactory) {
  return (listener: MessageListener, config: any) => useWorker(workerFactory, listener, config)
}