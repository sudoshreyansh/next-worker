import { useEffect, useRef, useState } from "react"

export const TestStatusLabel = {
  IN_PROGRESS: 0,
  SUCCESS: 1,
  FAILURE: 2
}

const TestStatus = {
  INIT: 0, // to skip dev strict mode re-render of test suite
  SETUP: 1,
  IN_PROGRESS: 2,
  SUCCESS: 3,
  FAILURE: 4
}

function getLabelForStatus(status) {
  if ( status < TestStatus.SUCCESS ) {
    return TestStatusLabel.IN_PROGRESS;
  } else if ( status === TestStatus.SUCCESS ) {
    return TestStatusLabel.SUCCESS;
  } else {
    return TestStatusLabel.FAILURE;
  }
}

export function useTestProgress(setup, cleanup) {
  const [status, setStatus] = useState(TestStatus.INIT);
  const setupRef = useRef(setup);
  const cleanupRef = useRef(cleanup);

  useEffect(() => {
    setupRef.current = setup;
    cleanupRef.current = cleanup;
  }, [setup, cleanup])

  useEffect(() => {
    switch ( status ) {
      case TestStatus.INIT:
        setStatus(TestStatus.SETUP);
        break;
      
      case TestStatus.SETUP:
        setupRef.current();
        setStatus(TestStatus.IN_PROGRESS);
        break;

      case TestStatus.SUCCESS:
      case TestStatus.FAILURE:
        cleanupRef.current();
        break;
    }
  }, [status])

  return {
    label: getLabelForStatus(status),
    enableTest: (status === TestStatus.IN_PROGRESS),
    success: () => setStatus(TestStatus.SUCCESS),
    failure: () => setStatus(TestStatus.FAILURE)
  }
}