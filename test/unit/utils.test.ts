import {
  addLoaderDisableParams,
  checkForLoaderDisable,
  escapeBackslash,
  getWorkerChunkFile,
  getWorkerSourceFile
} from '../../src/utils'

import path from 'path';


describe('escapeBackslash', () => {
  it('Escape backslash in string', () => {
    const samplePath = '\\users\\local\\data\\sample.worker.js';
    const escapedPath = escapeBackslash(samplePath);

    expect(escapedPath === '\\\\users\\\\local\\\\data\\\\sample.worker.js').toBe(true);
  });
});

describe('getWorkerChunkFile', () => {
  it('Valid chunk file from source file name', () => {
    const sampleWorker = path.join('data', 'test.sample.worker.js');
    const chunkName = getWorkerChunkFile(sampleWorker);

    expect(chunkName === path.join('data', 'test.sample.worker.chunk.js')).toBe(true);
  });

  it('Throw on invalid source file name', () => {
    const invalidWorker = 'test.sample.js';

    expect(() => getWorkerChunkFile(invalidWorker)).toThrow();
  });
});


describe('getWorkerSourceFile', () => {
  it('Valid source file from chunk file name', () => {
    const sampleChunk = path.join('data', 'test.sample.worker.chunk.js');
    const workerName = getWorkerSourceFile(sampleChunk);

    expect(workerName === path.join('data', 'test.sample.worker.js')).toBe(true);
  });

  it('Throw on invalid chunk file name', () => {
    const invalidChunk = 'test.sample.js';

    expect(() => getWorkerSourceFile(invalidChunk)).toThrow();
  });
});

describe('loaderDisableParams', () => {
  it('Add and check for loader disable params', () => {
    const samplePath = path.join('local', 'project', 'sample.worker.js');
    const loaderDisabledPath = addLoaderDisableParams(samplePath);

    expect(checkForLoaderDisable(loaderDisabledPath)).toBe(true);
  });
});
