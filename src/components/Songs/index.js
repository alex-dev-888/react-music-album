import styles from './Songs.module.css'

import Song from './Song-Item'

function Songs({ songs }) {
  return (
    <div className={styles.songsContainer}>
      {songs?.map((song, index) => {
        return <Song {...song} key={index} />
      })}
    </div>
  )
}

export default Songs
