import React, { useContext, useEffect, useState } from 'react'
import { BookContext } from "../context/bookContext";
import axiosInstance from './axios';
import lari from '../assets/lari.png';
import { Button } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';
import {motion} from 'framer-motion';


const Profile = () => {

  // categories
  const categories = [
    {
      id: 1,
      name: 'რომანი',
      color: '#6420AA'
    },

    {
      id: 2,
      name: 'მოთხრობა',
      color: '#87A922'
    },

    {
      id: 3,
      name: 'პოემა',
      color: '#FF9843'
    },

    {
      id: 4,
      name: 'ლექსი',
      color: '#D20062'
    },

    {
      id: 5,
      name: 'დეტექტივი',
      color: '#116D6E'
    },

    {
      id: 6,
      name: 'ნოველა',
      color: '#E26EE5'
    },

    {
      id: 7,
      name: 'ბიოგრაფია',
      color: '#39A7FF'
    },

    {
      id: 8,
      name: 'ზღაპარი',
      color: '#424769'
    }
  ];


  // show categories
  const [showCate, setShowCate] = useState(true);
  const [categoriesArr, setCategoriesArr] = useState([]);
  const [showFiltered, setShowFiltered] = useState(false);

  const { books, setBooks, isDarkMode} = useContext(BookContext);
 
  const getAllBooks = async () =>{
      const data = await axiosInstance.get('http://localhost:4000/api/books');

      setBooks(data.data.books);

   
  }

  useEffect(() => {
      getAllBooks();
  }, []);

  let navigate = useNavigate();

// navigate to full page
const fullPage = (id) => {
  navigate(`/books/${id}`);
 
}

// filter categories
const handleCategory = (type) => {
   const filterByType = books.filter(item => item.type === type);

   setCategoriesArr(filterByType);
   setShowFiltered(true);
}



  return (
    <div className='flex flex-col  items-center gap-12 p-8' style={{color: isDarkMode && '#fff'}}>
  
      <div className=' gap-8 hidden md:flex' >
       { categories.map((value) => (
         
          <button  style={{backgroundColor: value.color, color: "white",visibility: showCate ? "visible" : 'hidden' }} className='w-36 rounded-md h-8 shadow-lg' key={value.id} onClick={() => handleCategory(value.name)}>{value.name}</button>
  
          
       ))}
      
<CategoryIcon onClick = {() => setShowCate(!showCate)} sx={{color: showCate ? "green" : "black", cursor: "pointer"}} />
</div>

<div className='flex flex-wrap justify-center gap-12'>
   {showFiltered ? (
      
    categoriesArr.map((value) => (
      <motion.div initial = {{translateY: -20}} animate = {{translateY: 0}} key={value._id} >
      <p className='text-center text-xl font-semibold pb-6'>{value.title}</p>
     
       <img src = {value.url} className='shadow-lg rounded-md cursor-pointer w-56 h-64 object-cover'  />
       <div className='flex items-center gap-12  '>
       <p className='flex items-center text-2xl pt-6 '>{value.price}<img src = {lari} className='w-8' /></p>
      <Button variant='contained' color = "success" className='absolute top-2 w-24 ' onClick={() => fullPage(value._id)}>ყიდვა</Button>
    </div>
     </motion.div>
    ))
   ) : (
    books.map((value) => (
      <div key={value._id}>
        <p className='text-center text-xl font-semibold pb-6'>{value.title}</p>
       
         <img src = {value.url} className='shadow-lg rounded-md cursor-pointer w-56 h-64 object-cover'  />
         <div className='flex items-center gap-12  '>
         <p className='flex items-center text-2xl pt-6 '>{value.price}<img src = {lari} className='w-8' /></p>
        <Button variant='contained' color = "success" className='absolute top-2 w-24 ' onClick={() => fullPage(value._id)}>ყიდვა</Button>
      </div>
       </div>
     ))
   )}
       
       </div>
    </div>
  )
}

export default Profile
