import { emptyFn } from "@/types";
import { useEffect, useRef, useState } from "react"

export enum TestStatusLabel {
  IN_PROGRESS,
  SUCCESS,
  FAILURE
}

export type TestProgressHookResponse = {
  label: TestStatusLabel,
  enableTest: boolean,
  success: emptyFn,
  failure: emptyFn
}

enum TestStatus {
  INIT, // to skip dev strict mode re-render of test suite
  SETUP,
  IN_PROGRESS,
  SUCCESS,
  FAILURE
};

function getLabelForStatus(status: TestStatus): TestStatusLabel {
  if ( status < TestStatus.SUCCESS ) {
    return TestStatusLabel.IN_PROGRESS;
  } else if ( status === TestStatus.SUCCESS ) {
    return TestStatusLabel.SUCCESS;
  } else {
    return TestStatusLabel.FAILURE;
  }
}

export function useTestProgress(setup: emptyFn, cleanup: emptyFn): TestProgressHookResponse {
  const [status, setStatus] = useState<TestStatus>(TestStatus.INIT);
  const setupRef = useRef<emptyFn>(setup);
  const cleanupRef = useRef<emptyFn>(cleanup);

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