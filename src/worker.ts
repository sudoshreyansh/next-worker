import { WorkerFactory } from "./types";
import { useWorkerFactory } from "./hooks/useWorker";

export function generateWorkerHooks(workerFactory: WorkerFactory) {
  return {
    useWorker: useWorkerFactory(workerFactory)
  }
}
