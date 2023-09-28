import styles from '@/styles/Test.module.css'

export const TestStatus = {
  IN_PROGRESS: 0,
  SUCCESS: 1,
  FAILURE: 2
}

export default function TestDisplay({ status, title }) {
  let testStatusBox;
  switch ( status.state ) {
    case TestStatus.IN_PROGRESS:
      testStatusBox = <span className={styles.loadingStatus}>RUNS</span>
      break;
    case TestStatus.SUCCESS:
      testStatusBox = <span className={styles.successStatus}>PASS</span>
      break;
    case TestStatus.FAILURE:
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