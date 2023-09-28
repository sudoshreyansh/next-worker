import { generateWorkerRuntime } from './generator';
import { checkForLoaderDisable } from './utils';

export default function loader() {};

export function pitch(workerFilePath: string) {
  const disableStatus = checkForLoaderDisable(workerFilePath);
  if ( disableStatus ) return;

  return generateWorkerRuntime(workerFilePath);
}

