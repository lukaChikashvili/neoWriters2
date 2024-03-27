import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axiosInstance from './axios';
import lari from '../assets/lari.png';
import tag from '../assets/tag.png';
import { Button } from '@mui/material';

const FullPage = () => {
    
    // take id from route
    const { id } = useParams();
    const [fullPage, setFullPage] = useState(null);


    useEffect(() => {
        const getFull = async () => {
         const response = await axiosInstance.get(`http://localhost:4000/api/books/${id}`);

           setFullPage(response.data.oneBook);

           
        
        }


        getFull();
    }, []);


  return (
    <div className='p-24'>
        {fullPage ? (
            <div className='flex items-center gap-12'>
     
         <img src = {fullPage.url} className='w-96 h-96 object-cover cursor-pointer shadow-lg rounded-md'/>
       
    
         <div className='flex flex-col gap-4'>
            <h1 className='text-4xl font-bold'>{fullPage.title}</h1>
            <p className='text-2xl text-green-600'>{fullPage.author.name}</p>
            <p className='text-2xl'>{fullPage.createdAt.substring(0, 10)}</p>
            <p className='text-2xl underline underline-offset-4'>{fullPage.type}</p>
             <img src = {tag} className='w-40 absolute right-40' />
             <p className='flex text-5xl  absolute right-52 top-56 text-white'>{fullPage.price}</p>
              
             
            <p className='line pt-4 text-lg'>{fullPage.desc}</p>
            <div className='flex gap-8 '>
            <Button variant='outlined' color = "success" className = "w-56">კალათში დამატება</Button>
            <Button variant='contained' color = "success"  className = "w-56">ყიდვა</Button>
            </div>
            </div>
           
                </div>
        ) : (
            <p>იტვირთება...</p>
        )}
    
    </div>
  )
}

export default FullPage