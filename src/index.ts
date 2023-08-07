import path from 'path';
import { SingleEntryPlugin } from 'webpack';
import WebWorkerTemplatePlugin from 'webpack/lib/webworker/WebWorkerTemplatePlugin';

export default function loader() {};

export function pitch(workerFilePath: string) {
  const filename = path.basename(workerFilePath);
  const chunkFilename = '[id].worker.js';

  const compiler = this._compilation.createChildCompiler(
    `next-worker ${workerFilePath}`,
    {
      filename,
      chunkFilename,
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

