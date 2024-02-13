import { readdirSync } from 'fs';
import path from 'path';
import { WorkerEntry } from '../generator';

interface FileSystem {
  readdirSync: typeof readdirSync
}

const candidateParentDirs = ['src', 'app', 'components'];

export function resolveBySuffix(fs: FileSystem, context: string): WorkerEntry[] {
  const rootEntries = fs.readdirSync(context, {
    withFileTypes: true
  });

  const workerEntries: WorkerEntry[] = []; 
  
  for ( const entry of rootEntries ) {
    if ( !entry.isDirectory() ) continue;
    if ( !candidateParentDirs.includes(entry.name) ) continue;

    const candidateEntries = fs.readdirSync(path.join(entry.path, entry.name), {
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