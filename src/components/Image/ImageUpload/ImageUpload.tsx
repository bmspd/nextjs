import { Button } from '@mui/material'
import React, { useMemo } from 'react'
import ImagePreview from '../ImagePreview/ImagePreview'
import styles from './styles.module.scss'
type ImageUploadProps = {
  isMultiple?: boolean
  filesState: [File[], React.Dispatch<React.SetStateAction<File[]>>]
}

const ImageUpload: React.FC<ImageUploadProps> = ({ isMultiple, filesState }) => {
  const [files, setFiles] = filesState
  const preview = useMemo(() => files.map((el) => URL.createObjectURL(el)), [files])
  const fileUploadHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    if (!isMultiple) {
      setFiles(Array.from(e.target.files))
    } else {
      // TODO: for multiple file uploads
    }
    e.target.value = ''
  }
  return (
    <div>
      <Button component="label" variant="outlined" sx={{ width: '100%' }}>
        Upload image
        <input
          type="file"
          hidden
          multiple={isMultiple}
          onChange={fileUploadHandle}
          accept="image/*"
        />
      </Button>
      <div className={styles.imagePreview}>
        {preview.map((el, index) => (
          <ImagePreview
            key={el}
            imgSrc={el}
            deleteCb={() => {
              setFiles((prev) => {
                prev.splice(index, 1)
                return [...prev]
              })
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageUpload
