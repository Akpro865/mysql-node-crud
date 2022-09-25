import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../App.css'

export default function Add(){
	const [details, setDetails] = useState({
		title: "", des: "", price: "", img: ""
	})

	const navigate = useNavigate()

	const handleChange = (e)=>{
		setDetails(prev=>({
			...prev,
			[e.target.name]: e.target.value
		}))
	}
	console.log(details)

	const handleCreate = async()=>{
		try{
			await axios.post(`http://localhost:5000/books`, details)
			navigate('/')
		}catch(err){
			console.log(err)
		}
	}
	return(
	 <div className='h-screen bgimg flex justify-center items-center'>
	  <div className='flex flex-col w-96 bg-blu-50 rounded-xl pb-3 px-5'>	
	    <h2 className='font-semibold text-2xl text-gray-300 my-2 flex justify-center'>Create a new book</h2>   
	    <input onChange={handleChange} name='title' className='h-12 my-1 outline-none rounded pl-1' placeholder='book name'/>
	    <input onChange={handleChange} name='des' className='h-12 my-1 rounded pl-1 outline-none' placeholder='description'/>
	    <input onChange={handleChange} name='price' className='h-12 my-1 rounded pl-1 outline-none' placeholder='price'/>
	    <input onChange={handleChange} name='img' className='h-12 my-1 rounded pl-1 outline-none' placeholder='img url'/>	   
	    <div className='flex justify-center'>
	     <button onClick={handleCreate} className='rounded bg-green-500 text-white px-3 py-3 w-full my-2 font-bold'>Create book</button>
	    </div>
	  </div>
	 </div>
	)
}