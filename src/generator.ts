import { escapeBackslash, addLoaderDisableParams } from "./utils";

export function generateWorkerRuntime(workerFilePath: string): string {
  // const chunkFilePath = getWorkerChunkFile(workerFilePath);
  const chunkFilePath = addLoaderDisableParams(workerFilePath);
  const escapedFilePath = escapeBackslash(chunkFilePath);

  return (
    `
    import { generateWorkerHooks } from 'next-worker/build/worker';

    function workerFactory() {
      return new Worker(new URL('${escapedFilePath}', import.meta.url));
    }

    const {
      useWorker
    } = generateWorkerHooks(workerFactory);

    export {
      useWorker
    };
    `
  ) 
}