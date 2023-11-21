import { useEffect } from 'react';
import { useWorker } from '../worker/error.worker'

export default function ErrorTest({ success, failure, logger }) {
  const {isError} = useWorker(e => {}, {
    onSpawn: () => {
      logger.log("Spawned worker.");
    },
    onTerminate: () => {
      logger.log("Terminated worker.");
    }
  });

  useEffect(() => {
    if ( isError ) {
      success();
    }
  }, [isError]);

  return <></>
}