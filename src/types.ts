export enum WorkerStatus {
  LOADING,
  READY,
  ERROR,
  TERMINATED
}

export type WorkerState = {
  status: WorkerStatus;
  worker: Worker | undefined;
}

export type MessageListener = (e: MessageEvent) => void;