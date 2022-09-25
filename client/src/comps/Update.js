import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import { useParams } from 'react-router-dom'

export default function Update(){
	const [title, setTitle] = useState("")
	const [des, setDes] = useState("")
	const [price, setPrice] = useState(0)
	const [img, setImg] = useState("")

	const navigate = useNavigate()
	const { id } = useParams()

	useEffect(()=>{
		const getBook = async()=>{
			const { data } = await axios.get(`http://localhost:5000/book/${id}`)
			const book = data[0]
			setTitle(book.title)
			setDes(book.des)
			setPrice(book.price)
			setImg(book.img)
		}
		getBook()
	}, [id])	

	console.log(title, des, price, img)

	const handleUpdate = async()=>{
		if(!title || !des || !price || !img) alert('please fill all fields')
		const details = { title, des, price, img }
		try{
			await axios.put(`http://localhost:5000/books/${id}`, details)			
			navigate('/')
		}catch(err){
			console.log(err)
		}
	}
	return(
	 <div className='h-screen bgimg flex justify-center items-center'>
	  <div className='flex flex-col w-96 bg-blu-50 rounded-xl pb-3 px-5'>	
	    <h2 className='font-semibold text-2xl text-gray-300 my-2 flex justify-center'>Create a new book</h2>   
	    <input onChange={e=>setTitle(e.target.value)} value={title} className='h-12 my-1 outline-none rounded pl-1' placeholder='book name'/>
	    <input onChange={e=>setDes(e.target.value)} value={des} className='h-12 my-1 rounded pl-1 outline-none' placeholder='description'/>
	    <input onChange={e=>setPrice(e.target.value)} value={price} className='h-12 my-1 rounded pl-1 outline-none' placeholder='price'/>
	    <input onChange={e=>setImg(e.target.value)} value={img} className='h-12 my-1 rounded pl-1 outline-none' placeholder='img url'/>	   
	    <div className='flex justify-center'>
	     <button onClick={handleUpdate} className='rounded bg-green-500 text-white px-3 py-3 w-full my-2 font-bold'>Create book</button>
	    </div>
	  </div>
	 </div>
	)
}