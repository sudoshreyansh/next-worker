import { readdir } from 'fs/promises';
import path from 'path';
import { WorkerEntry } from '../generator';

interface FileSystem {
  readdir: typeof readdir
}

const candidateParentDirs = ['src', 'app', 'components'];

export async function resolveBySuffix(fs: FileSystem, context: string): Promise<WorkerEntry[]> {
  const rootEntries = await fs.readdir(context, {
    withFileTypes: true
  });

  const workerEntries: WorkerEntry[] = []; 
  
  for ( const entry of rootEntries ) {
    if ( !entry.isDirectory() ) continue;
    if ( !candidateParentDirs.includes(entry.name) ) continue;

    const candidateEntries = await fs.readdir(path.join(entry.path, entry.name), {
      withFileTypes: true,
      recursive: true
    });

    for ( const entry of candidateEntries ) {
      if ( entry.isDirectory() ) continue;

      const regexMatch = /^(.*).worker.(js|ts)$/.exec(entry.name);
      if ( regexMatch === null ) continue;

      workerEntries.push({
        name: regexMatch[1],
        path: path.join(entry.path, entry.name)
      });
    }
  }

  return workerEntries;
}