import { useEffect } from 'react';
import { useWorker } from '../worker/error.worker';
import { debugLogForWorkerMessages, debugLogForWorkerLifecycle } from '../utils/debugLogging';

export default function ErrorTest({ expect, logger }) {
  const {isError} = useWorker(
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