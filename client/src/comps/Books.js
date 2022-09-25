import { useEffect, useState } from 'react'
import axios from 'axios'
import bookimg from '../assets/rich.jpg'
import { useNavigate, Link } from 'react-router-dom'
import '../App.css'

export default function Books(){
	const [books, setBooks] = useState([])

	const navigate = useNavigate()

	useEffect(()=>{
	 const fetchBooks = async()=>{
	 const { data } = await axios.get('http://localhost:5000/books')	 
	 setBooks(data)
	 }

	 fetchBooks()
	}, [])

	console.log(books)

	const handleDelete = async(id)=>{
		try{
		 	await axios.delete(`http://localhost/5000/books/${id}`)
		 	window.location.reload()
		} catch(err){
			console.log(err)
		}
	}
	return(
	 <div className=''>
	  <div className='relative titlefont sticky bg-pink-50 border-b'>
	   <h1 className='text-4xl font-semibold text-gray-800 flex justify-center py-4'>Featured books by Ak</h1>
	   <Link to='/add'>
	    <span className='absolute right-9 bottom-2.5'>
	     <button className='px-6 py-2 font-bold text-blue-500 overflow-hidden bg-blue-100 cursor-pointer hover:bg-blue-200 rounded-full'>add book</button>
	    </span>
	   </Link>
	  </div>
	  <div className='grid xs:grid-cols-1 sm:grid-cols-4 xl:grid-cols-5 ml-7'>
	   {books ? books.map(book => (
	   	<div className='w-52 my-2 rounded-xl overflow-hidden' key={book.id}>
	    <img src={bookimg} className='w-full h-52 object-cover overflow-hidden'/>
	    <div className='px-3 pb-2 bg-white'>
	     <h3 className='text-xl flex justify-center font-medium text-gray-800'>{book.title.substring(0, 12)}..</h3>
	     <h3 className='flex text-gray-600 justify-center'>{book.des.substring(0, 15)}..</h3>
	     <h3 className='font-medium flex justify-center text-gray-800'>Rs.{book.price}</h3>
	     <Link to={`/update/${book.id}`} >
	      <div className='text-green-400 p-0.5 rounded bg-green-100 cursor-pointer flex justify-center my-1'>update</div>
	     </Link>
	     <div onClick={()=>handleDelete(book.id)} className='text-red-400 p-0.5 cursor-pointer rounded bg-red-50 my-1 flex justify-center'>delete</div>
	    </div>
	   </div>
	   )) : null}	   
	  </div>
	 </div>
	)
}