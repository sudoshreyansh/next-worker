export type WorkerFactory = () => Worker;

export type WorkerState = {
  isReady: boolean;
  worker: Worker | undefined;
}

export type MessageListener = (e: MessageEvent) => void;