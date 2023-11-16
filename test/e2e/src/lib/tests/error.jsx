import { useEffect } from 'react';
import { useWorker } from '../worker/error.worker'
import { getLoggerInstance } from '@/lib/logger';
import { TestStatus } from '@/components/TestDisplay';
const Logger = getLoggerInstance('default');

export default function SimpleTest({ setState, logListener }) {
  const {isError} = useWorker(e => {}, {
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
    if ( isError ) {
      setState(TestStatus.SUCCESS)
    }
  }, [isError]);

  return <></>
}