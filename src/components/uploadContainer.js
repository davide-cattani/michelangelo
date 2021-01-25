import React, { useContext } from "react"
import Dropzone from "react-dropzone"
import request from "superagent"
import { CloudinaryContext } from "cloudinary-react"

const UploadContainer = () => {
  const context = useContext(CloudinaryContext)

  console.log("context.cloud", context.cloudName)
  console.log("context.upload", context.uploadPreset)

  const onPhotoSelected = files => {
    console.log("selected", files[0])

    const url = `https://api.cloudinary.com/v1_1/${context.cloudName}/upload`
    const title = Date.now()

    for (let file of files) {
      // const photoId = this.photoId++
      const fileName = file.name
      request
        .post(url)
        .field("upload_preset", context.uploadPreset)
        .field("file", file)
        .field("multiple", true)
        .field("context", title ? `photo=${title}` : "")
        .on("progress", progress => onPhotoUploadProgress(progress))
        .end((error, response) => {
          onPhotoUploaded(fileName, response)
        })
    }
  }

  const onPhotoUploadProgress = progress => {
    console.log("progress", progress)
  }

  const onPhotoUploaded = (fileName, response) => {
    console.log("uploaded", response)
  }

  return (
    <>
      <Dropzone
        id="direct-upload-dropzone"
        disableClick={true}
        multiple={false}
        accept="image/*"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "10%",
        }}
        onDropAccepted={files => onPhotoSelected(files)}
      ></Dropzone>
    </>
  )
}

export default UploadContainer
