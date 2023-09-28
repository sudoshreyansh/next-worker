import path from 'path';
import qs from 'querystring'

const NextWorkerDisableParamName = 'nextWorkerDisable';

export function escapeBackslash(val: string): string {
  return val.replace(/\\/g, '\\\\');
}

export function addLoaderDisableParams(file: string): string {
  const dirname = path.dirname(file);
  const basename = path.basename(file);
  const [filename, querystring] = basename.split('?');
  let params = {};

  if ( querystring ) {
    const existingParams = qs.parse(querystring);
    params = { ...existingParams };
  }

  params[NextWorkerDisableParamName] = 'true';

  const newQuerystring = qs.stringify(params);
  return path.join(dirname, filename + '?' + newQuerystring);
}

export function checkForLoaderDisable(file: string): boolean {
  const basename = path.basename(file);
  const querystring = basename.split('?')[1];
  const params = qs.parse(querystring);

  return params[NextWorkerDisableParamName] === 'true';
}

export function getWorkerChunkFile(file: string) {
  const dirname = path.dirname(file);
  const basename = path.basename(file);

  const matches = basename.match(/([a-z0-9-\._]+)\.worker(?:\.([a-z0-9-\._]+))?$/i);
  if ( !matches || matches.length === 0 )
    throw "Invalid worker file name. The file name should be of the form \"*.worker.[js|ts]\"";

  const basenamePrefix = matches[1];
  const basenameSuffix = matches[2] ? '.' + matches[2] : '';

  return path.join(dirname, basenamePrefix + '.worker.chunk' + basenameSuffix);
}

export function getWorkerSourceFile(chunk: string) {
  const dirname = path.dirname(chunk);
  const basename = path.basename(chunk);

  const matches = basename.match(/([a-z0-9-\._]+)\.worker\.chunk(?:\.([a-z0-9-\._]+))?$/i);
  if ( !matches || matches.length === 0 )
    throw "Invalid worker chunk. The file name should be of the form \"*.worker.chunk.[js|ts]\"";
  
  const basenamePrefix = matches[1];
  const basenameSuffix = matches[2] ? '.' + matches[2] : '';

  return path.join(dirname, basenamePrefix + '.worker' + basenameSuffix);
}