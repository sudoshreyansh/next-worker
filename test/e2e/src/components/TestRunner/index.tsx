import { useEffect, useRef, useState } from "react" 
import TestDisplay from "../TestDisplay"
import Logger, { Log, getLoggerInstance } from "@/lib/logger";
import { useTestProgress } from "@/hooks/useTestProgress";
import useExpect, { ExpectHookResponse } from "@/hooks/useExpect";

export type TestComponentProps = {
  expect: ExpectHookResponse,
  logger: Logger
}

export type TestRunnerProps = {
  title: string,
  component: React.FC<TestComponentProps>
};

export default function TestRunner({
  component: Component,
  title
}: TestRunnerProps) {
  const loggerRef = useRef<Logger>(getLoggerInstance('default'));
  const { label, enableTest, success, failure } =  useTestProgress(
    () => loggerRef.current.log("Test suite started."),
    () => loggerRef.current.log("Test suite shut down.")
  );
  const [logs, setLogs]  = useState<Array<Log>>([]);
  const expect = useExpect(success, failure, loggerRef.current);

  useEffect(() => {
    loggerRef.current.addListener(logs => setLogs([...logs]));
  }, []);
  
  return (
    <>
      {
        enableTest ?
        <Component
          expect={expect}
          logger={loggerRef.current}

        /> :
        <></>
      }
      <TestDisplay status={{ state: label, logs }} title={title} />
    </>
  )
}