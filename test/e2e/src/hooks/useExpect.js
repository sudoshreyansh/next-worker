import { useCallback, useEffect, useRef } from "react"

export default function useExpect(success, failure, logger) {
  const successRef = useRef(success);
  const failureRef = useRef(failure);
  const loggerRef = useRef(logger);
  const testCasesRef = useRef({
    failed: 0,
    total: 1,
    completed: 0
  });

  useEffect(() => {
    successRef.current = success;
    failureRef.current = failure;
    loggerRef.current = logger;
  }, [success, failure, logger]);

  const assert = useCallback((condition, successText, failureText) => {
    if ( !condition ) {
      testCasesRef.current.failed += 1;
      if ( failureText ) loggerRef.current.log(failureText);
    } else {
      if ( successText ) loggerRef.current.log(successText);
    }
  }, []);

  const assertDone = useCallback(() => {
    testCasesRef.current.completed += 1;
    
    if ( testCasesRef.current.failed > 0 ) {
      failureRef.current();
    } else if ( testCasesRef.current.completed >= testCasesRef.current.total ) {
      successRef.current();
    }
  }, []);

  const assertCount = useCallback((count) => {
    testCasesRef.current.total = count;
  }, []);

  return {
    assert,
    assertCount,
    assertDone
  }
}