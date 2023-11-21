import { useCallback, useEffect, useRef } from "react"

export default function useExpect(success, failure, logger) {
  const successRef = useRef(success);
  const failureRef = useRef(failure);
  const loggerRef = useRef(logger);
  const testCasesRef = useRef({ total: 0, failed: 0 });

  useEffect(() => {
    successRef.current = success;
    failureRef.current = failure;
    loggerRef.current = logger;
  }, [success, failure, logger]);

  const expect = useCallback((condition, successText, failureText) => {
    testCasesRef.current.total += 1;

    if ( !condition ) {
      testCasesRef.current.failed += 1;
      if ( failureText ) loggerRef.current.log(failureText);
    } else {
      if ( successText ) loggerRef.current.log(successText);
    }
  }, []);

  const expectDone = useCallback(() => {
    if ( testCasesRef.current.failed > 0 ) {
      failureRef.current();
    } else {
      successRef.current();
    }
  }, []);

  return {
    expect,
    expectDone
  }
}