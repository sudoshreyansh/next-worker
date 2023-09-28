import { useEffect } from 'react';
import { useWorker } from '../worker/sum.worker'
import { getLoggerInstance } from '@/lib/logger';
import { TestStatus } from '@/components/TestDisplay';
const Logger = getLoggerInstance('default');

export default function SimpleTest({ setState, logListener }) {
  const {isReady, postMessage} = useWorker(e => {
    if ( !Logger.listen(e) ) {
      Logger.log('Received response.');
      
      if ( e.data === 1e7 ) {
        setState(TestStatus.SUCCESS);
        Logger.log("Response correct.");
      } else {
        setState(TestStatus.FAILURE);
        Logger.log("Response incorrect.");
      }
    }
  }, {
    onSpawn: () => {
      Logger.log("Spawned worker.");
    },
    onTerminate: () => {
      Logger.log("Terminated worker.");
    }
  });

  useEffect(() => {
    Logger.addListener(logListener);
    Logger.log('Starting test.');

    return () => {
      Logger.log('Shutting down test.');
    }
  }, [])

  useEffect(() => {
    if ( isReady ) {
      const arr = Array(1e7).fill(1);
      postMessage(arr);

      Logger.log('Sent request.');
    }
  }, [isReady]);

  return <></>
}