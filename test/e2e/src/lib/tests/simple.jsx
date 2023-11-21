import { useEffect } from 'react';
import { useWorker } from '../worker/sum.worker';
import { debugLogForWorkerMessages, debugLogForWorkerLifecycle } from '../utils/debugLogging';

export default function SimpleTest({ success, failure, logger }) {
  const {isReady, postMessage} = useWorker(
    debugLogForWorkerMessages(
      e => {
        logger.log('Received response.');
        
        if ( e.data === 1e7 ) {
          success();
          logger.log("Response correct.");
        } else {
          failure();
          logger.log("Response incorrect.");
        }
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