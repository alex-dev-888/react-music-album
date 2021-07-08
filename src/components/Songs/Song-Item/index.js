import styles from './SongItem.module.css'

function SongItem({ name, mp3Link }) {
  return (
    <div className={styles.songItem}>
      <div className={styles.songItemImg}></div>
      <div className={styles.songItemDetail}>
        <div className={styles.title}>
          <h3>{name}</h3>
        </div>
        <div className={styles.audio}>
          <audio controls src={mp3Link} />
        </div>
      </div>
    </div>
  )
}

export default SongItem
