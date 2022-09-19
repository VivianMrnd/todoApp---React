import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/home';
import Todo from './components/todolistpage';

function App() {
  return (
    <div className='mainApp'>
        <div className='container'>
          <BrowserRouter>
            <Routes>
              <Route path = '/' element={<Home />}/>
              <Route path = '/todo' element={<Todo />}/>
            </Routes>
          </BrowserRouter>
        </div>
        <div className='footer'>
          <p className='text-center p-4 text-white'>This is just a simple pages to practice creating a simple web application using MERN</p>
        </div>
    </div>
  );
}

export default App;
