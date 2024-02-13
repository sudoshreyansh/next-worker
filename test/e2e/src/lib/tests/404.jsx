// import { useEffect } from 'react';
// import { debugLogForWorkerMessages, debugLogForWorkerLifecycle } from '../utils/debugLogging';
// import { useWorkerFactory } from 'next-worker/build/hooks/useWorker';

// const useWorker = useWorkerFactory(() => {
//   return new Worker('/nothing.worker.js');
// });

// export default function Error404Test({ expect, done, logger }) {
//   const {isError} = useWorker(
//     debugLogForWorkerMessages(() => {}, logger),
//     {
//       ...debugLogForWorkerLifecycle(logger),
//       onError: (err) => {
//         expect.assert(err, "Error callback fired successfully");
//         expect.assertDone();
//       }
//     }
//   );

//   useEffect(() => {
//     if ( isError ) {
//       expect.assert(isError, "Worker moved to error status successfully");
//       expect.assertDone();
//     }
//   }, [isError]);

//   useEffect(() => {
//     expect.assertCount(2);
//   }, []);

//   return <></>
// }