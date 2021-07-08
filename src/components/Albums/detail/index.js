import styles from './AlbumDetail.module.css'
import Songs from '../../../components/Songs'
import { useParams, Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Moment from 'moment'

function AlbumDetail() {
  const { id } = useParams()
  const [album, setAlbum] = useState()
  const history = useHistory()

  const fetchAlbumById = async () => {
    const data = await axios.get(`http://localhost:1338/albums/${id}`)
    setAlbum(data?.data)
  }

  const deleteAlbum = async () => {
    if (window.confirm('Do you want to delete this album?')) {
      // delete songs & album
      const songs = album?.song
      for (let index = 0; index < songs?.length; index++) {
        const song = songs[index]
        await axios.delete(`http://localhost:1338/songs/${song?.id}`)
      }
      await axios.delete(`http://localhost:1338/albums/${id}`)
      history.push('/')
    }
  }

  useEffect(() => {
    fetchAlbumById()
  }, [id])

  {
    !album && <div className={styles.container}>No content found</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.albumsDetailContainer}>
        <div className={styles.albumsDetailColLeft}>
          <div
            className={styles.albumsDetailImg}
            style={{ backgroundImage: `url(${album?.imageUrl})` }}
          ></div>
        </div>
        <div className={styles.albumsDetailColRight}>
          <div className={styles.albumItemDetail}>
            <div className={styles.albumName}>
              <h2>{album?.name}</h2>
            </div>
            <div className={styles.singer}>
              <span>{album?.singer}</span>
            </div>
            <div className={styles.miniDes}>
              <span>
                {album?.songs && album?.songs.length ? album.songs.length : 0}{' '}
                songs
              </span>
              <span>
                Created at {Moment(album?.created_at).format('MM-DD-YYYY')}
              </span>
            </div>
          </div>
          <div className={styles.btnContainer}>
            <button
              type='button'
              className={styles.btnDelete}
              onClick={deleteAlbum}
            >
              Delete
            </button>
            <Link to='/' className={styles.btnBack}>
              Back
            </Link>
          </div>
        </div>
      </div>
      <Songs songs={album?.songs} />
    </div>
  )
}

export default AlbumDetail
