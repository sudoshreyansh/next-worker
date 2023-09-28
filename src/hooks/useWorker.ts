import { WorkerFactory, WorkerState, MessageListener } from "../types";
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
  const [isActive, setIsActive] = useState<boolean>(false);
  const listenerRef = useRef<MessageListener>();
  const workerRef = useRef<WorkerState>({});
  const configRef = useRef<any>({});

  listenerRef.current = listener;
  configRef.current = config;

  useEffect(() => {
    workerRef.current = {
      worker: spawnWorker(factory, e => listenerRef.current(e)),
      isReady: true
    };
    
    if ( configRef.current.onSpawn )
      configRef.current.onSpawn();

    setIsActive(true);

    return () => {
      terminateWorker(workerRef.current.worker);
      workerRef.current.isReady = false;
      
      if ( configRef.current.onTerminate )
        configRef.current.onTerminate();

      setIsActive(false);
    }
  }, []);

  return {
    get isReady() {
      return workerRef.current.isReady;
    },

    postMessage(message: any) {
      if ( workerRef.current.isReady )
        workerRef.current.worker.postMessage(message);
    }
  };
}

export function useWorkerFactory(workerFactory: WorkerFactory) {
  return (listener: MessageListener, config: any) => useWorker(workerFactory, listener, config)
}