import React from 'react'
import styles from './styles.module.scss'
import Image from 'next/image'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material'
type ImagePreviewProps = {
  imgSrc: string
  deleteCb?: () => void
}
const ImagePreview: React.FC<ImagePreviewProps> = ({ imgSrc, deleteCb }) => {
  return (
    <div className={styles.imagePreview}>
      <IconButton
        className={styles.removeImage}
        sx={{ position: 'absolute' }}
        aria-label="delete"
        onClick={() => {
          deleteCb && deleteCb()
        }}
        size="large"
      >
        <DeleteIcon />
      </IconButton>
      <Image src={imgSrc} fill={true} style={{ objectFit: 'cover' }} alt="Image preview" />
    </div>
  )
}

export default ImagePreview
