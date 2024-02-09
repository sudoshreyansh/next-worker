import path from 'path';
import { escapeBackslash } from "./utils";

export type WorkerEntry = {
  name: string;
  path: string;
};

export function generateRuntime(workerEntries: WorkerEntry[]): string {
  const escapedRelativeWorkerEntries = 
    workerEntries
      .map(e => ({
        name: e.name,
        path: 
          path.relative(__dirname, e.path)
            .split(path.sep)
            .join(path.posix.sep)
      }));
  
  const factories =
    escapedRelativeWorkerEntries
      .map(e => `'${e.name}': () => new Worker(new URL('${e.path}', import.meta.url))`)
      .join(', ');
  
  return (
    `export default { ${ factories } };`
  ) 
}