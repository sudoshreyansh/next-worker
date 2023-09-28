import { useState } from "react" 
import TestDisplay, { TestStatus } from "../TestDisplay"

export default function TestRunner({
  component: Component,
  title
}) {
  const [status, setStatus]  = useState({
    state: TestStatus.IN_PROGRESS,
    logs: []
  });

  function setState(state) {
    setStatus(v => ({
      ...v,
      state
    }));
  }

  function logListener(logs) {
    setStatus(v => ({
      ...v,
      logs
    }));
  }

  return (
    <>
      <Component setState={setState} logListener={logListener} />
      <TestDisplay status={status} title={title} />
    </>
  )
}