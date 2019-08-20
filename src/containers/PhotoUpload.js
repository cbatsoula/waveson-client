import React, { useState } from 'react'


function PhotoUpload() {
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)

  const uploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'waveson')
    setLoading(true)
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dlybpe5za/image/upload',
      {
        method: 'POST',
        body: data
      }
    )
    const file = await res.json()

    setImage(file.secure_url)
    setLoading(false)
    console.log("hmmmmmmmmm", file.secure_url)
  }


  return (
    <div className="PhotoUpload">
      <h1>Upload Image</h1>
      <input
        type="file"
        name="file"
        placeholder="Upload an image"
        onChange={uploadImage}
      />
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <img src={image} style={{ width: '400px' }} />
      )}
    </div>
  )
}

export default PhotoUpload
