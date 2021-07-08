import React, { useState } from 'react'
import styles from './AddAlbumDialog.module.css'
import Song from '../../Songs/Song-Item'
import axios from 'axios'

function AddAlbumDialog({ showAddAlbumDialog }) {
  const [album, setAlbum] = useState({
    albumName: '',
    albumImageUrl: '',
    albumSinger: '',
    songName: '',
    songLink: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [process, setProcess] = useState(false)
  const [addSong, setAddSong] = useState(false)
  const [songs, setSongs] = useState([])

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setAlbum({ ...album, [name]: value })
  }

  const handleSong = (e) => {
    e.preventDefault()
    setAddSong(true)
    if (album.songName && album.songLink) {
      setAddSong(false)
      setSongs([...songs, { name: album.songName, mp3Link: album.songLink }])
      setAlbum({ ...album, songName: '', songLink: '' })
    }
  }

  const removeSong = (index) => {
    setSongs(songs.filter((song, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitted(true)
    if (
      album.albumName &&
      album.albumImageUrl &&
      album.albumSinger &&
      songs.length > 0
    ) {
      setProcess(true)

      // add All Songs
      const songIds = []
      for (let i = 0; i < songs.length; i++) {
        const song = songs[i]
        const data = await axios.post('http://localhost:1338/songs', {
          ...song,
        })
        songIds.push(data?.data?.id)
      }

      // add All Album
      await axios.post('http://localhost:1338/albums', {
        name: album.albumName,
        singer: album.albumSinger,
        imageUrl: album.albumImageUrl,
        songs: songIds,
      })

      setAlbum({
        albumName: '',
        albumImageUrl: '',
        albumSinger: '',
        // songName: '',
        // songLink: '',
      })

      setProcess(false)
      showAddAlbumDialog()
      window.location.reload()
    }
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalBackDrop}></div>
      <div className={styles.modalContent}>
        <form name='form'>
          <div className={styles.modalHeader}>
            <h3>Add New Album</h3>
            <span onClick={showAddAlbumDialog}>X</span>
          </div>
          <div className={styles.modalFields}>
            <div className={styles.inputField}>
              <div className={styles.label}>
                <label>Album Name</label>
              </div>
              <div>
                <input
                  id='albumName'
                  name='albumName'
                  type='text'
                  value={album?.albumName}
                  onChange={handleChange}
                  className={
                    submitted && !album.albumName ? styles.hasError : ''
                  }
                />
              </div>
              {/* {submitted && !album.albumName && (
                <div className={styles.helpBlock}>Required</div>
              )} */}
            </div>
            <div className={styles.inputField}>
              <div className={styles.label}>
                <label>ImageUrl</label>
              </div>
              <div>
                <input
                  id='albumImageUrl'
                  name='albumImageUrl'
                  type='text'
                  value={album?.albumImageUrl}
                  onChange={handleChange}
                  className={
                    submitted && !album.albumImageUrl ? styles.hasError : ''
                  }
                />
              </div>
              {/* {submitted && !album.albumImageUrl && (
                <div className={styles.helpBlock}>Required</div>
              )} */}
            </div>
            <div className={styles.inputField}>
              <div className={styles.label}>
                <label>Singer</label>
              </div>
              <div>
                <input
                  id='albumSinger'
                  name='albumSinger'
                  type='text'
                  value={album?.albumSinger}
                  onChange={handleChange}
                  className={
                    submitted && !album.albumSinger ? styles.hasError : ''
                  }
                />
              </div>
              {/* {submitted && !album.albumSinger && (
                <div className={styles.helpBlock}>Required</div>
              )} */}
            </div>
          </div>
          <div className={styles.addSongContainer}>
            <h4>Add Songs</h4>
            <div className={styles.songAdd}>
              <div className={styles.inputField}>
                <div className={styles.label}>
                  <label>Song Name</label>
                </div>
                <div>
                  <input
                    id='songName'
                    name='songName'
                    type='text'
                    value={album?.songName}
                    onChange={handleChange}
                    className={
                      addSong && !album.songName ? styles.hasError : ''
                    }
                  />
                </div>
                {/* {addSong && !album.songName && (
                  <div className={styles.helpBlock}>Required</div>
                )} */}
              </div>
              <div className={styles.inputField}>
                <div className={styles.label}>
                  <label>Mp3 Link</label>
                </div>
                <div>
                  <input
                    id='songLink'
                    name='songLink'
                    type='text'
                    value={album?.songLink}
                    onChange={handleChange}
                    className={
                      addSong && !album.songLink ? styles.hasError : ''
                    }
                  />
                </div>
                {/* {addSong && !album.songLink && (
                  <div className={styles.helpBlock}>Required</div>
                )} */}
              </div>
              <div className={`${styles.inputField} ${styles.btnInputField}`}>
                <button
                  className={styles.addBtn}
                  onClick={handleSong}
                  type='button'
                >
                  Add
                </button>
              </div>
            </div>
            <div className={styles.containerListSong}>
              {songs?.map((song, index) => {
                return (
                  <div className={styles.SongItem}>
                    <Song {...song} key={index} />
                    <button
                      className={styles.btnDelete}
                      onClick={() => removeSong(index)}
                      type='button'
                    >
                      X
                    </button>
                  </div>
                )
              })}
            </div>
            <div className={styles.btnContainer}>
              <button className={styles.cancelBtn} onClick={showAddAlbumDialog}>
                Cancel
              </button>
              <button className={styles.saveBtn} onClick={handleSubmit}>
                Save Album
                {process && (
                  <img src='data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==' />
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddAlbumDialog
