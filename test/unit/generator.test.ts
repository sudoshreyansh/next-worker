import { generateRuntime } from '../../src/generator';
import path from 'path';

describe('generateRuntime', () => {
  it('Snapshot testing of generated runtime', () => {
    const entries = [
      {
        name: 'example1',
        path: path.join(__dirname, 'example1.worker.js')
      },
      {
        name: 'example2',
        path: path.join(__dirname, 'hello world', 'example2.worker.js')
      },
    ]

    expect(generateRuntime(entries)).toMatchSnapshot();
  });
})