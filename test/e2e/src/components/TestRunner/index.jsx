import { useEffect, useRef, useState } from "react" 
import TestDisplay from "../TestDisplay"
import { getLoggerInstance } from "@/lib/logger";
import { useTestProgress } from "@/hooks/useTestProgress";
import useExpect from "@/hooks/useExpect";

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
  const { expect, expectDone } = useExpect(success, failure, loggerRef.current);

  useEffect(() => {
    loggerRef.current.addListener(logs => setLogs([...logs]));
  }, []);
  
  return (
    <>
      {
        enableTest ?
        <Component
          expect={expect}
          done={expectDone}
          logger={loggerRef.current}

        /> :
        <></>
      }
      <TestDisplay status={{ state: label, logs }} title={title} />
    </>
  )
}