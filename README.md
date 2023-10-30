## next-worker

Makes it simple to create and manage Web Workers in NextJS. Detects imports to `*.worker.[js|ts]` and manages the hard stuff for you.

Caution: This package is still under development.

Without `next-worker`:
```js
useEffect(() =>  {
  worker = new Worker(new URL('./bg-task.js', import.meta.url));;
}, []);
```
<br>

With `next-worker`:
```js
import { useWorker } from './bg-task.worker.js'

  ...
  const {isReady, postMessage} = useWorker(e => {});
  ...
```

## Usage

In your `next.config.json`:

```javascript
const { NextWorkerPlugin } = require('next-worker');

module.exports = {
  webpack: NextWorkerPlugin()
}
```