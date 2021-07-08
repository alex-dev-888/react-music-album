import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import styles from './Albums.module.css'
import axios from 'axios'
import Moment from 'moment'

function Albums() {
  const [albums, setAlbums] = useState([])

  const fetchAlbum = async () => {
    const data = await axios('http://localhost:1338/albums')
    setAlbums(data.data)
  }

  useEffect(() => {
    fetchAlbum()
  }, [])

  return (
    <div className={styles.albumsContainer}>
      <div className={styles.albums}>
        <div className={styles.albumsTitle}>
          <h3>Your album</h3>
        </div>
        {albums.map((album) => {
          const { id, name, singer, imageUrl, created_at, songs } = album
          return (
            <div className={styles.albumItem} key={id}>
              <div
                className={styles.albumItemImg}
                style={{ backgroundImage: `url(${imageUrl})` }}
              ></div>
              <div className={styles.albumItemDetail}>
                <div className={styles.albumName}>
                  <Link to={`/album/${id}`}>
                    <h3>{name}</h3>
                  </Link>
                </div>
                <div className={styles.singer}>
                  <span>{singer}</span>
                </div>
                <div className={styles.miniDes}>
                  <span>{songs && songs.length ? songs.length : 0} songs</span>
                  <span>
                    Created at {Moment(created_at).format('MM-DD-YYYY')}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Albums
