import styles from '@/styles/Test.module.css'
import { TestStatusLabel } from '@/hooks/useTestProgress';
import { useState } from 'react';

export default function TestDisplay({ status, title }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  let testStatusBox;
  
  switch ( status.state ) {
    case TestStatusLabel.IN_PROGRESS:
      testStatusBox = <span className={styles.loadingStatus}>RUNS</span>
      break;
    case TestStatusLabel.SUCCESS:
      testStatusBox = <span className={styles.successStatus}>PASS</span>
      break;
    case TestStatusLabel.FAILURE:
      testStatusBox = <span className={styles.failureStatus}>FAIL</span>
      break;
  }
 
  return (
    <div className={styles.wrapper}>
      { testStatusBox }
      <div className={styles.content}>
        <div className={styles.heading} onClick={() => setIsCollapsed(v => !v)}>
          { title }
        </div>
        {
          isCollapsed ?
          <></> :
          <div className={styles.logs}>
            {
              status.logs.map((log, i) => (
                <div key={i}>{log.source}: {log.message}</div>
              ))
            }
          </div>
        }
      </div>
      
    </div>
  )
}