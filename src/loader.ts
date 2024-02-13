import { generateRuntime } from './generator';
import { resolveBySuffix } from './resolvers/suffix';

export default function loader() {};

export function pitch() {
  const entries = resolveBySuffix(this.fs, this.rootContext)
  console.log(generateRuntime(entries));
  return generateRuntime(entries);
}

