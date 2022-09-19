import React,{useState,useEffect,Fragment} from 'react';
import axios from 'axios';
import port from '../local';
import {Link} from 'react-router-dom';
const ToDoPage = ()=>{
    const [todolist, settodolist]=useState([]);
    const today = new Date()
    const [addtodo,setaddtodo] = useState({
        description:"", date:today.toLocaleString()
    })
    const [edittodo,setedittodo] = useState({
        description:""
    })
    const [editablehandler,seteditablehandler] = useState(null);

    useEffect(()=>{
        axios.get(port).then(res=>{
            settodolist(res.data)
        })
    },[])

    const onChangeAddTodo = e=>{
        const targetInput = e.target.getAttribute('name');
        const fieldvalue = e.target.value;
        const addtodolist = {...addtodo};
        addtodolist[targetInput]=fieldvalue;
        setaddtodo(addtodolist);
    }

    const submitAddedList = e=>{
        e.preventDefault();
        const addlist = {
            description:addtodo.description, dateCreated:addtodo.date
        }
        axios.post(port, addlist).then(res=>{
            settodolist([...todolist,res.data])
            document.getElementById('addform').reset()
        }).catch(err=>console.log(err))
    }

    const deleteTodo=(e,todo)=>{
        e.preventDefault();
        axios.delete(port + todo).then(()=>{
            settodolist(todolist.filter(todoid => todoid._id !== todo))

        })
    }

    const onClickEdit=(e,todo)=>{
        e.preventDefault()
        seteditablehandler(todo._id);

        const formEditRow = {
            description:todo.description,dateCreated:todo.dateCreated
        }
        setedittodo(formEditRow)
    }

    const onChangeEdit = e=>{
        const targetInput = e.target.getAttribute('name');
        const fieldvalue = e.target.value;
        const todoedit = {...edittodo};
        todoedit[targetInput]=fieldvalue;
        setedittodo(todoedit)
    }
    const saveChanges = (e)=>{
        e.preventDefault();
        const savetodo = {
            _id:editablehandler, description:edittodo.description, dateCreated:today.toLocaleString()
        }
        axios.put(port + savetodo._id, savetodo).then(()=>{
                const index = todolist.findIndex(todo=>todo._id === editablehandler);
                const todos = [...todolist];
                todos[index]=savetodo;
                settodolist(todos);
                seteditablehandler(null)
                console.log();
            }
        )
    }
    const cancel = (e)=>{
        e.preventDefault();
        seteditablehandler(null)
    }

    return(
        <div>
            <div className='todopage'>
                <div className='row pb-3'>
                    <div className='col-sm-4'>
                        <Link to='/'><button className="btn btnhome bg-warning"><i className="fa fa-home"></i><p className='home '><b>Go Back Home</b></p></button></Link>
                    </div>
                    <div className='col-sm'>
                        <h4 className=''>Testing Todo App web - MERN</h4>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-8'>
                        <div className='tablescroll'>
                            <form onSubmit={saveChanges}>
                                <table className="table table-warning table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Action</th>
                                            <th>ToDo List</th>
                                            <th>Date Created</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        todolist.map(todo=>{
                                            return(
                                                <Fragment key={todo._id}>

                                                    {
                                                        editablehandler === todo._id ? 
                                                        (
                                                            <tr>
                                                                <td>
                                                                    <button type='submit' className="btn saveIcon">
                                                                        <i className="fa fa-save"></i> 
                                                                        <span className="tooltiptext">save</span>                                       
                                                                    </button>
                                                                    <button onClick={cancel} type='button' className="btn cancelIcon">
                                                                        <i className="fa fa-close"></i> 
                                                                        <span className="tooltiptext">cancel</span>                                       
                                                                    </button>
                                                                </td>
                                                                <td><input onChange={onChangeEdit} value={edittodo.description} name='description'/></td>
                                                                <td>{edittodo.dateCreated}</td>
                                                            </tr>
                                                        ):  
                                                        (
                                                            <tr>
                                                                <td>
                                                                    <button type='button' className="btn deleteIcon" onClick={e=>deleteTodo(e,todo._id)}>
                                                                        <i className="fa fa-trash"></i> 
                                                                        <span className="tooltiptext">remove</span>    
                                   
                                                                    </button>
                                                                    <button onClick={e=>onClickEdit(e,todo)} className="btn editIcon">
                                                                        <i className="fa fa-edit"></i>
                                                                        <span className="tooltiptext">edit</span>            
                                                                    </button>
                                                                </td>
                                                                <td><b>{todo.description}</b></td>
                                                                <td>{todo.dateCreated}</td>
                                                            </tr>


                                                        )      
                                                    }

                                                </Fragment>
                                                
                                                )
                                            }).sort().reverse()
                                    }
                                    </tbody>
                                </table>
                            </form>
                        </div> 
                    </div>
                    <div className='col-sm-4'>
                            <form id='addform' className='addform' onSubmit={submitAddedList}>
                                <textarea onChange={onChangeAddTodo} name = "description" placeholder="Enter your 'todo' here"/> <br/>
                                <button type="submit" className="btn btn-warning text-dark"><b>Submit</b></button>
                            </form>
                    </div>
                </div>
            </div>                
        </div>
    )
}
export default ToDoPage;