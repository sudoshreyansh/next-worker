import { resolveBySuffix } from '../../src/resolvers/suffix';
import fs from 'fs/promises';
import path from 'path';

describe('resolveBySuffix', () => {
  it('Success resolving workers', async () => {
    console.log(path.join(__dirname, 'mocks', 'fs'));
    const entries = await resolveBySuffix(fs, path.join(__dirname, 'mocks', 'fs'));

    expect(entries.length).toBe(2);
    expect(entries[0].name).toBe('example1');
    expect(entries[0].path).toBe(path.resolve(__dirname, './mocks/fs/app/example1.worker.js'));
    expect(entries[1].name).toBe('example2');
    expect(entries[1].path).toBe(path.resolve(__dirname, './mocks/fs/src/example2.worker.js'));
  });
})