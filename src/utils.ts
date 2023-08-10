import path from 'path';

function calculateHash(value: string): string {
  return value
    .split('')
    .reduce((accumulator, char) => (
      accumulator + char.charCodeAt(0)
    ))
    .toString();
}

export function getOutputFileName(workerFilePath: string): string {
  const workerFileName = path.basename(workerFilePath);
  const suffixIndex = workerFileName.search(/\.worker\.([a-z]+)(\?.+)?$/i);
  if ( suffixIndex === -1 ) throw "Invalid file name. Worker file name must follow: *.worker.[js|ts]";

  const hash: string = calculateHash(workerFilePath);
  const prefix = workerFileName.slice(0, suffixIndex);
  const suffix = workerFileName.slice(suffixIndex);
  const outputFileName = `${prefix}.${hash}${suffix}`;

  return outputFileName;
}