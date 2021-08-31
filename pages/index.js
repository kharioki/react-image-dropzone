import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Image } from 'cloudinary-react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      access_mode: "public",
      asset_id: "dde2e9d75dd5fe1e69dfce6092d6aac1",
      bytes: 59206,
      created_at: "2021-08-31T05:55:11Z",
      etag: "9e203d76fff39b4b5531ff580aa4f70e",
      format: "jpg",
      height: 750,
      original_extension: "jpeg",
      original_filename: "kiki",
      placeholder: false,
      public_id: "gcubg1xwkpqoiljsvovc",
      resource_type: "image",
      secure_url: "https://res.cloudinary.com/khariokitony/image/upload/v1630389311/gcubg1xwkpqoiljsvovc.jpg",
      signature: "9a6c36b65fdf945caff42950e0e93b329c45d833",
      tags: [],
      type: "upload",
      url: "http://res.cloudinary.com/khariokitony/image/upload/v1630389311/gcubg1xwkpqoiljsvovc.jpg",
      version: 1630389311,
      version_id: "0d142391886178e32c26a23b34a1eb51",
      width: 750,
    }
  ]);

  const onDrop = useCallback(acceptedFiles => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

    console.log(url)

    // fetch call
    acceptedFiles.forEach(async acceptedFile => {
      const { signature, timestamp } = await getSignature();

      const formData = new FormData();
      formData.append('file', acceptedFile);
      // formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_KEY);
      formData.append('timestamp', timestamp);
      formData.append('signature', signature);

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setUploadedFiles(prevState => [...prevState, data]);
    });

  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false,
  });

  return (
    <>
      <div
        {...getRootProps()}
        className={`${styles.dropzone} ${isDragActive ? styles.active : null}`}
      >
        <input {...getInputProps()} />
        Drop Zone
      </div>

      <ul>
        {uploadedFiles.map(file => (
          <li key={file.public_id}>
            <Image
              alt={file.original_filename}
              cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
              publicId={file.public_id}
              width="300"
              crop="scale"
            />
          </li>
        ))}
      </ul>
    </>
  )
}

async function getSignature() {
  const response = await fetch('/api/sign');
  const data = await response.json();
  const { signature, timestamp } = data;
  return { signature, timestamp };
}
