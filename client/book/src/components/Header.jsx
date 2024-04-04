import React, { useContext, useEffect, useState } from 'react'
import {Button,   IconButton,   InputAdornment,   TextField, Tooltip} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import {Link, useNavigate} from 'react-router-dom';
import axiosInstance from './axios';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import CloseIcon from '@mui/icons-material/Close';
import { BookContext } from '../context/bookContext';
import BrushIcon from '@mui/icons-material/Brush';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PersonPinIcon from '@mui/icons-material/PersonPin';

const Header = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

 
  
  // cart span
  const { cart, err, setErr, showPassword, handleShowPassword, handleMouseDownPassword,  showLari, books, image, setImage, fetchImages } = useContext(BookContext);
   const isUserLoggedIn = localStorage.getItem('token');

   // logout modal
   const [modal, setModal] = useState(false);  

   // errors
   const [nameErr, setNameErr] = useState(false);
   const [passErr, setPassErr] = useState(false);
   // incorrect credential error
   const [incorrect, setIncorrect] = useState(false);

   // saerch input
   const [search, setSearch] = useState('');
   const [searchResult, setSearchResult] = useState([]);


  let navigate = useNavigate();

const handleLogin = async () => {
  
if(!name && !password) {
  setErr(true);
  setNameErr(false);
}else if(!name) {
  setNameErr(true);
  setPassErr(false);
   
}else if(!password) {
   setPassErr(true);
   setNameErr(false);
}else {
  try {
    const response = await axiosInstance.post('http://localhost:4000/api/login', {name, password});
  const token = response.data.token;
  localStorage.setItem('token', token);
  localStorage.setItem('name', response.data.name);

  navigate('/profile');
  } catch (error) {
   setIncorrect(true);
  }
  
    
}
 

}




const logout = () => {
  localStorage.removeItem('token');
 
  navigate('/');
}

useEffect(() => {
   const filterSearch = books.filter(item => item.title.startsWith(search));
     
   setSearchResult(filterSearch);

}, [books, search]);


// navigate to full page
const showFull = (id) => {
  navigate(`/books/${id}`);
  setSearch(false);
  
}


useEffect(() => {
  fetchImages();
}, [image]);


  return (
    <div className='w-full flex items-center justify-between px-12 py-6 shadow relative'>
      <div className="logo flex gap-12">
        <h1 className='text-3xl font-bold cursor-pointer' onClick={() => isUserLoggedIn && navigate('/profile')}>მწერალი</h1>
       {isUserLoggedIn &&  <TextField size='small' variant='outlined' label = "მოძებნე წიგნი..." style={{width: "500px"}} onChange={(e) => setSearch(e.target.value)} /> }
       <div className='absolute -bottom-20 bg-gray-400 left-48 rounded-md shadow-md' style={{width: "500px", marginLeft: "7px"}}>
       {search && searchResult.map((value) => (
     
         <p  className='p-4 px-8 flex items-center justify-between gap-12 text-lg'><img src = {value.url} className='w-12' />{value.title}  <span className='font-bold'>{value.price}ლ</span> <OpenInNewIcon className='cursor-pointer'  onClick = {() => showFull(value._id)} /> </p>
   
       ))}
       </div>
      </div>
       {isUserLoggedIn ? (
        <div className='flex items-center gap-8 '>
          <Tooltip title = "ჩემი პროფილი">
          <IconButton>
         <PersonPinIcon onClick={() => navigate('/myProfile')} sx = {{fontSize: "30px", color: "green", cursor: "pointer"}} />
         </IconButton>
         </Tooltip>
          
       <Button variant='outlined' color = "success"> <Link to = "/create" className='text-md'>წიგნის დაწერა</Link></Button>
        <p className='text-2xl font-semibold'>{localStorage.getItem('name')}</p>
        <img src = {image[image.length - 1]?.dataURL} className='w-8 h-8 rounded-full' />
        <p>ბალანსი:<span> {showLari}</span></p>
        <Tooltip title = "ჩემი კალათა">
          <IconButton>
          <ShoppingCartIcon className='cursor-pointer relative' onClick = {() => navigate('/cart')} /><span className='absolute top-0 right-0 text-white text-sm text-center bg-green-800 rounded-full w-4 h-4'>{cart}</span>
          </IconButton>
        </Tooltip>
        
       {modal ? <CloseIcon className='cursor-pointer' onClick = {() => setModal(false)} /> :  ( 
       
       <Tooltip title = "მენიუ">
        <IconButton>
        <DragHandleIcon className='cursor-pointer' onClick = {() => setModal(true)} />
        </IconButton>
       </Tooltip>
     
       
       )}
<AnimatePresence>
         {
         
          modal && <motion.div initial = {{opacity: 0, translateX: 50}} animate = {{opacity: 1, translateX: 0}} transition = {{duration: 1, delay: 0.2, type: 'spring'}} exit = {{translateX: 300}} className='absolute right-0 top-24  bottom-0 h-full w-64 bg-gray-300 -mt-2 flex flex-col gap-4'>
            <Link className='p-4 flex gap-4' to = "/design" onClick={() => setModal(false)}><BrushIcon className='text-green-800' />ყდის დიზაინის შექმნა</Link>
            <Link className='p-4 flex gap-4' to = "/myDesign"  onClick={() => setModal(false)}><InsertPhotoIcon className='text-green-800'/>ჩემი სურათები</Link>
            <Link className='p-4 flex gap-4' to = "/myBooks"  onClick={() => setModal(false)}><MenuBookIcon className='text-green-800'/>ჩემი წიგნები</Link>
          <Button variant='contained' color="success" onClick={logout} className='w-full'>გასვლა</Button>

          </motion.div>
  
         }
         </AnimatePresence>
         </div>
       ) : (
        <form className='flex items-center gap-4'>
         <TextField error = {err && true} helperText = {err ?  'შეიყვანეთ სახელი' : nameErr ? "შეიყვანეთ სახელი" : incorrect ? "სახელი არასწორია" : ''}  label = "სახელი" variant='outlined' size="small" className='w-44' onChange={(e) => setName(e.target.value)} required />
         
         <TextField error = {err && true} helperText = {err ? 'შეიყვანეთ პაროლი' : passErr ? "შეიყვანეთ პაროლი" : incorrect ? "პაროლი არასწორია" : ''} label = "პაროლი" variant='outlined' size='small' type = {showPassword ? "text" : "password"}   InputProps={{ 
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleShowPassword}
          onMouseDown={handleMouseDownPassword}
          edge="end"
        >
          {showPassword ? <VisibilityOff sx={{fontSize: 20}} /> : <Visibility sx={{fontSize: 20}}/>}
        </IconButton>
      </InputAdornment>
    )
  }} className='w-44' onChange={(e) => setPassword(e.target.value)} required />
         <Button variant='contained' color="success" onClick={handleLogin}>შესვლა</Button>
        
     </form>
  
       )}
        
    </div>
  )
}

export default Header
