import React, { useState } from 'react'
import Breadcumb from '../components/Breadcumb'
import Albums from '../components/Albums'
import AddAlbumDialog from '../components/Albums/AddAlbumDialog'

function AlbumPage() {
  const [showModal, setShowModal] = useState(false)

  function showAddAlbumDialog() {
    setShowModal(!showModal)
  }

  return (
    <>
      <Breadcumb showAddAlbumDialog={showAddAlbumDialog} />
      <Albums />
      {showModal && <AddAlbumDialog showAddAlbumDialog={showAddAlbumDialog} />}
    </>
  )
}

export default AlbumPage
