import Button from './Utility/Button'
import Tasks from './Tasks'
export default function SelectedProject({project, tasks, onDelete, onAddTask, onDeleteTask}){
    return(
        <div className='w-[35rem] mt-16'>
            <header className='pb-4 mb-4 border-b-1 border-stone-300'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-3xl font-bold text-stone-600 mb-2'>{project.title}</h1>
                    <Button onClick ={onDelete}>Delete</Button>
                </div>
                <p className='mb-4 text-stone-600'>{project.dueDate}</p>
                <p className='text-stone-600 whitespace-pre-wrap'>{project.description}</p>
            </header>
            <hr />
            <Tasks onAdd={onAddTask} onDelete={onDeleteTask} tasks={tasks}/>
        </div>
    )
}