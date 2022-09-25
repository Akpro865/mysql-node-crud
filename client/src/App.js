import './App.css';
import Add from './comps/Add'
import Books from './comps/Books'
import Update from './comps/Update'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className='bg-slate-50'>
    <Routes>
     <Route path='/' exact element={<Books />} />
     <Route path='/add' element={<Add />} />
     <Route path='/update/:id' element={<Update />} />
    </Routes>
    </div>
  );
}

export default App;
