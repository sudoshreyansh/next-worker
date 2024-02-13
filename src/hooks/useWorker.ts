import { WorkerState, MessageListener, WorkerStatus } from "../types";
import { useState, useEffect, useRef } from "react";
import { spawn, terminate } from "../utils/worker";

// TODO: Error handling
export function useWorker(name: string, listener: MessageListener, config: any) {
  const [_, setIsActive] = useState<boolean>(false);
  const listenerRef = useRef<MessageListener>();
  const workerRef = useRef<WorkerState>({
    status: WorkerStatus.LOADING
  });
  const configRef = useRef<any>({});

  listenerRef.current = listener;
  configRef.current = config;

  useEffect(() => {
    workerRef.current.worker = spawn(name, e => listenerRef.current(e));
    workerRef.current.status = WorkerStatus.READY;

    workerRef.current.worker.addEventListener('error', (e: Error) => {
      workerRef.current.status = WorkerStatus.ERROR;

      if ( configRef.current.onError )
        configRef.current.onError(e);

      setIsActive(false);
    })
    
    if ( configRef.current.onSpawn )
      configRef.current.onSpawn();

    setIsActive(true);

    return () => {
      terminate(workerRef.current.worker);
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
