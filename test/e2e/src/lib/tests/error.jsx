import { useEffect } from 'react';
import { useWorker } from '../worker/error.worker';
import { debugLogForWorkerMessages, debugLogForWorkerLifecycle } from '../utils/debugLogging';

export default function ErrorTest({ expect, done, logger }) {
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