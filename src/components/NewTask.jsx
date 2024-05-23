
import Button from "./Utility/Button"
import { useState } from "react"
export default function NewTask({onAdd}){
    const [enteredtask, setEnteredTask] = useState('')
    function handleChange(event){
        setEnteredTask(event.target.value)
    }
    function addTask(){
        onAdd(enteredtask)
        setEnteredTask('')
    }
    return <div className="flex items-center gap-4">
        <input  className='1-64 px-2 py-1 rounded-sm bg-stone-200' type="text" onChange={(e) => handleChange(e)} value={enteredtask}/>
        <button className="text-stone-700 hover:text-stone-950" onClick={addTask}>Add task</button>
    </div>
}