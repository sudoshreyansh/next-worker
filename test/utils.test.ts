import { getOutputFilename } from '../src/utils'

describe('getOutputFilename', () => {
  it('Worker name and suffix preserved', () => {
    const name = 'test_worker';
    const basePath = '/local';
    const ext = 'ts';

    const file = `${basePath}/${name}.worker.${ext}`;
    const output = getOutputFilename(file);
    const outputComponents = output.split('.');

    expect(outputComponents.length === 4).toBe(true);
    expect(outputComponents[3] === ext).toBe(true);
    expect(outputComponents[2] === 'worker').toBe(true);
    expect(outputComponents[0] === name).toBe(true);
  });

  it('Generates a unique output file name', () => {
    const name = 'test_worker';
    const basePath = '/local';
    const ext = 'ts';

    const file1 = `${basePath}/${name}.worker.${ext}`;
    const file2 = `${basePath}/src/${name}.worker.${ext}`;

    const output1 = getOutputFilename(file1);
    const output2 = getOutputFilename(file2);
    
    const hash1 = output1.split('.')[1];
    const hash2 = output2.split('.')[1];

    expect(hash1 !== hash2).toBe(true);
  });

  it('Throws on invalid file name', () => {
    const invalidWorkerFilename = '/local/test.ts';
    expect(() => getOutputFilename(invalidWorkerFilename)).toThrow();
  });
})