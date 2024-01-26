import Logger from "@/lib/logger";
import { emptyFn } from "@/types";
import { useCallback, useEffect, useRef } from "react"

type TestCasesProgress = {
  failed: number;
  total: number;
  completed: number;
}

export type ExpectHookResponse = {
  assert: (condition: any, successText?: string, failureText?: string) => void;
  assertDone: emptyFn;
  assertCount: (count: number) => void;
}

export default function useExpect(success: emptyFn, failure: emptyFn, logger: Logger): ExpectHookResponse {
  const successRef = useRef<emptyFn>(success);
  const failureRef = useRef<emptyFn>(failure);
  const loggerRef = useRef<Logger>(logger);
  const testCasesRef = useRef<TestCasesProgress>({
    failed: 0,
    total: 1,
    completed: 0
  });

  useEffect(() => {
    successRef.current = success;
    failureRef.current = failure;
    loggerRef.current = logger;
  }, [success, failure, logger]);

  const assert: ExpectHookResponse["assert"] = useCallback((condition, successText, failureText) => {
    if ( !condition ) {
      testCasesRef.current.failed += 1;
      if ( failureText ) loggerRef.current.log(failureText);
    } else {
      if ( successText ) loggerRef.current.log(successText);
    }
  }, []);

  const assertDone: ExpectHookResponse["assertDone"] = useCallback(() => {
    testCasesRef.current.completed += 1;
    
    if ( testCasesRef.current.failed > 0 ) {
      failureRef.current();
    } else if ( testCasesRef.current.completed >= testCasesRef.current.total ) {
      successRef.current();
    }
  }, []);

  const assertCount: ExpectHookResponse["assertCount"] = useCallback((count) => {
    testCasesRef.current.total = count;
  }, []);

  return {
    assert,
    assertCount,
    assertDone
  };
}