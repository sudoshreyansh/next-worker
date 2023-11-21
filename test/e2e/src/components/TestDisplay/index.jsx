import styles from '@/styles/Test.module.css'
import { TestStatusLabel } from '@/hooks/useTestProgress';

export default function TestDisplay({ status, title }) {
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
        <div className={styles.heading}>
          { title }
        </div>
        <div className={styles.logs}>
          {
            status.logs.map((log, i) => (
              <div key={i}>{log.source}: {log.message}</div>
            ))
          }
        </div>
      </div>
      
    </div>
  )
}