import { useEffect } from 'react';
import { debugLogForWorkerMessages, debugLogForWorkerLifecycle } from '../utils/debugLogging';
import { useWorkerFactory } from 'next-worker/build/hooks/useWorker';

const useWorker = useWorkerFactory(() => {
  return new Worker('/nothing.worker.js');
});

export default function Error404Test({ expect, done, logger }) {
  const {isError} = useWorker(
    debugLogForWorkerMessages(e => {}, logger),
    debugLogForWorkerLifecycle(logger)
  );

  useEffect(() => {
    if ( isError ) {
      expect(isError, "Received error object");
      done();
    }
  }, [isError]);

  return <></>
}