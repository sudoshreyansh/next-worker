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
import worker from './bg-task.worker.js'
```

## Usage

In your `next.config.json`:

```javascript
module.exports = {
  webpack: config => {
    config.module.rules.push({
      test: /\.worker\.js$/,
      use: [{ loader: 'next-worker' }]
    });
  }
}
```