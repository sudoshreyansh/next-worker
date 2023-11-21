import { useEffect } from 'react';
import { useWorker } from '../worker/sum.worker';
import { debugLogForWorkerMessages, debugLogForWorkerLifecycle } from '../utils/debugLogging';

export default function SimpleTest({ expect, done, logger }) {
  const {isReady, postMessage} = useWorker(
    debugLogForWorkerMessages(
      e => {
        logger.log('Received response.');
        
        expect(e.data === 1e7, "Response correct", "Response incorrect");
        done();
      }, logger
    ),
    debugLogForWorkerLifecycle(logger)
  );

  useEffect(() => {
    if ( isReady ) {
      const arr = Array(1e7).fill(1);
      postMessage(arr);

      logger.log('Sent request.');
    }
  }, [isReady]);
  
  return <></>
}