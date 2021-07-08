import styles from './Breadcumb.module.css'

function Breadcumb({ showAddAlbumDialog }) {
  return (
    <div className={styles.breadcumb}>
      <div className={styles.breadcumbContent}>
        <h2>Hello, Welcome back</h2>
        <button
          type='button'
          className={styles.btn}
          onClick={showAddAlbumDialog}
        >
          Add Album
        </button>
      </div>
    </div>
  )
}

export default Breadcumb
