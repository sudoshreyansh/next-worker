import { useCallback, useEffect, useRef, useState } from "react" 
import TestDisplay from "../TestDisplay"
import { getLoggerInstance } from "@/lib/logger";
import { useTestProgress } from "@/hooks/useTestProgress";
import { TestStatus } from "@/hooks/useTestProgress";

export default function TestRunner({
  component: Component,
  title
}) {
  const loggerRef = useRef(getLoggerInstance('default'));
  const { label, enableTest, success, failure } =  useTestProgress(
    () => loggerRef.current.log("Test suite started."),
    () => loggerRef.current.log("Test suite shut down.")
  );
  const [logs, setLogs]  = useState([]);

  useEffect(() => {
    loggerRef.current.addListener(logs => setLogs([...logs]));
  }, []);

  // expect
  
  return (
    <>
      {
        enableTest ?
        <Component
          success={success}
          failure={failure}
          logger={loggerRef.current}

        /> :
        <></>
      }
      <TestDisplay status={{ state: label, logs }} title={title} />
    </>
  )
}