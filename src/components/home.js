import {Link} from 'react-router-dom';
const Home = ()=>{
    return(
        <div className='homepage'>
           <h1 className='titlepage'>Welcome to a Simple ToDo List App Web</h1>
           <small className='miniCaption p-2'>Make a list to manage your time and be productive!</small><br/><br/>
           <Link to='/todo' className='text-light bg-dark p-1' id='startcreating'>Start Creating!</Link>
        </div>
    )

}
export default Home;