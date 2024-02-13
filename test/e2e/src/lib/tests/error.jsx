import { useEffect } from 'react';
import { useWorker } from 'next-worker';
import { debugLogForWorkerMessages, debugLogForWorkerLifecycle } from '../utils/debugLogging';

export default function ErrorTest({ expect, logger }) {
  const {isError} = useWorker(
    'error',
    debugLogForWorkerMessages(e => {}, logger),
    {
      ...debugLogForWorkerLifecycle(logger),
      onError: (err) => {
        expect.assert(err, "Error callback fired successfully");
        expect.assertDone();
      }
    }
  );

  useEffect(() => {
    if ( isError ) {
      expect.assert(isError, "Worker moved to error status successfully");
      expect.assertDone();
    }
  }, [isError]);
  
  useEffect(() => {
    expect.assertCount(2);
  }, []);

  return <></>
}