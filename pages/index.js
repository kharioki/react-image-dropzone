import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from '../styles/Home.module.css';

export default function Home() {
  const onDrop = useCallback(async acceptedFiles => {
    const url =
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

    // fetch call
    acceptedFiles.forEach(async acceptedFile => {
      const formData = new FormData();
      formData.append('file', acceptedFile);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
    });

  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false,
  });

  return (
    <>
      <div {...getRootProps()} className={`${styles.dropzone} ${isDragActive ? styles.active : null}`}>
        <input {...getInputProps()} />
        Drop Zone
      </div>
    </>
  )
}
