import React, { useContext, useState } from 'react'
import { BookContext } from '../context/bookContext';
import axiosInstance from './axios';

const UploadModal = ({closeModal}) => {

    const [selectedFile, setSelectedFile] = useState(null);
    const { setImage, setUploadModal } = useContext(BookContext);
 

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            console.error("No file selected.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('testImage', selectedFile);

            await axiosInstance.post('http://localhost:4000/api/users/profileImage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            setImage(selectedFile);
            setUploadModal(false);
            

            console.log("Image uploaded successfully!");
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

  return (
    <div>
        <div className=' bg-white absolute w-1/2 h-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-md'>
            <span className='absolute right-2 top-2 cursor-pointer' onClick={closeModal}>X</span>
    
            
 <input type="file" onChange={handleFileChange}  />
 <button onClick={handleUpload}>Upload</button>

          
 
  </div>
    </div>
  )
}

export default UploadModal