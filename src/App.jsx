import { useState ,useEffect} from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Navbar from '../components/Navbar'
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(false)
  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  
 useEffect(() => {
  let todostring = localStorage.getItem("todos");
  if (todostring) {
    setTodos(JSON.parse(todostring));
  }
}, []);

useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);

const  handleEdit = (e,id)=>{
let t = todos.filter(i=>
  i.id===id)
  setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
    return item.id!==id
   
  })
  
  setTodos(newTodos) 
   
}
const  handeleDelete = (e,id)=>{
if (confirm("Are u sure")) {
  
  let newTodos = todos.filter(item=>{
    return item.id!==id
  }
)
  setTodos(newTodos)
  
     


  
}
}
const  handleAdd = ()=>{
  setTodos([...todos , {id:  uuidv4() ,todo, isCompleted :false}])
  setTodo("")

}
const  handleChange  = (e)=>{
setTodo(e.target.value)


}
const handleCheckbox = (e) => {
 let id =  e.target.name
 let index = todos.findIndex(item =>{ return item.id === id})
 let newTodos = [...todos]
 newTodos[index].isCompleted = !newTodos[index].isCompleted;
 setTodos(newTodos)

}


  return (
    <>
    <Navbar/>
    <div className="container mx-auto bg-violet-300 my-5 p-5 rounded-xl min-h-[80vh] w-full md:w-1/2" >
    <div className="logo text-3xl text-center font-bold text-black my-4">iTodo - Manage Your Todo</div>
    <div className="addtodo my-5">
      <h2 className='text-xl  font-bold '>Add a ToDo </h2>
      <input onChange={handleChange} value={todo} type="text" className='bg-white w-full rounded-full px-2' />
      <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 font-bold w-full  rounded-md py-1 p-2 text-sm text-white my-2'>Add</button>
   </div>
   <input onChange={toggleFinished} type="checkbox" checked={showFinished} className='mx-2' />Show Finished
    <h2 className='text-lg  font-bold'>Your ToDos</h2>
    <div className="todos">

    {todos.length ===0 && <div className='m-5'>No Todos to display</div> }
      {todos.map(item=>{

      
      return (showFinished || !item.isCompleted) && <div key={item.id}  className="todo flex w-full justify-between my-4"> 
      <div className='flex gap-5'>
        <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" /><div className={item.isCompleted?"line-through":""
      }>{item.todo}</div>
      <div className="buttons flex h-full"><button onClick={(e,id)=> {handleEdit(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 font-bold rounded-md py-1 p-2 text-sm text-white mx-1'><FaEdit /></button> <button onClick={(e,id)=> {handeleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 font-bold rounded-md py-1 p-2 text-sm text-white mx-1'><MdDelete /></button>
  </div> </div>  
</div>})}</div> 
    </div> 
    </>
  )
}

export default App
