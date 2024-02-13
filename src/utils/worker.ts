import { MessageListener } from "../types";
import WorkerFactories from 'next-worker/build/loader.js!next-worker/build/worker.runtime.js';

export function spawn(name: string, listener: MessageListener): Worker {
  const worker = WorkerFactories[name]();
  worker.addEventListener('message', listener);

  return worker;
}

export function terminate(worker: Worker) {
  worker.terminate();
}