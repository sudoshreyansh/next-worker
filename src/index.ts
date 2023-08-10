import path from 'path';
import { SingleEntryPlugin } from 'webpack';
import WebWorkerTemplatePlugin from 'webpack/lib/webworker/WebWorkerTemplatePlugin';
import { getOutputFileName } from './utils';

export default function loader() {};

export function pitch(workerFilePath: string) {
  const outputFileName = getOutputFileName(workerFilePath);
  const outputChunkFileName = '[id].' + outputFileName;

  const compiler = this._compilation.createChildCompiler(
    `next-worker ${workerFilePath}`,
    {
      filename: outputFileName,
      chunkFilename: outputChunkFileName,
      publicPath: 'auto',
      globalObject: "self",
    }
  );

  new WebWorkerTemplatePlugin().apply(compiler);

  new SingleEntryPlugin(
    this.context,
    `!!${workerFilePath}`,
    path.parse(this.resourcePath).name
  ).apply(compiler);


  let callback = this.async();
  compiler.runAsChild((err, entries, compilation) => {
    callback(
        null,
        `
        const worker = new Worker(__webpack_public_path__ + 'test.worker.js');
        export default worker;
        `
    );
  });
}

