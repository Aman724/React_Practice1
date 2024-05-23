import NewProject from './components/NewProject';
import NoProjectSelected from './components/NoProjectSelected';
import ProjectSidebar from './components/ProjectSidebar'
import {useState, useRef} from 'react'
import SelectedProject from './components/SelectedProject';
import  Modal from './components/Utility/Modal';
function App() {
  const modalRef = useRef();
  const [projectsState, setProjectState]= useState({
    selectedProjectId:undefined,
    projects:[],
    tasks:[]
  })

  function handleAddTask(text){
    if (text.trim() === '') {
      modalRef.current.open();
      return;
    }
    setProjectState(prevState => {
      const taskId = Math.random();
      const newTask = {
        text:text,
        projectId:prevState.selectedProjectId,
        id:taskId
      }

      return {
        ...prevState,
        tasks:[newTask,...prevState.tasks]
      }
    })
  }
  function handleDeletetask(id){
    setProjectState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(task => task.id !==id)
      }
    })
  }

  const [cancelled, setCancelled] = useState(false)
  function handleStartAddProject(){
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null
      }
    })
  }

  function handleAddProject(projectData){
    setProjectState(prevState => {
      const newProject ={
        ...projectData,
        id:Math.random()
      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects:[...prevState.projects, newProject]
      }
    })
  }

  function handleCancel(){
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined
      }
    })
  }

  function handleSelectProject(id){
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId:id
      }
    })
  }

  function handleDeleteProject(){
    setProjectState(prevState => {
      return{
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(project => project.id !== prevState.selectedProjectId)
      }
    })
  }

  const selectedProject = projectsState.projects.find(projects=> projects.id===projectsState.selectedProjectId)
  let content = <SelectedProject project={selectedProject} tasks={projectsState.tasks.filter(task => task.projectId === projectsState.selectedProjectId)} onDelete={handleDeleteProject} onAddTask ={handleAddTask} onDeleteTask ={handleDeletetask} />
  if(projectsState.selectedProjectId === null){
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancel}/>
  } else if(projectsState.selectedProjectId === undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
  }
  return (
    <>
      <Modal ref ={modalRef} buttonCaption="Close">
        <p>Task cannot be empty</p>
      </Modal>
      <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar projects={projectsState.projects} onStartAddProject={handleStartAddProject} onSelectProject={handleSelectProject} selectedProjectId={projectsState.selectedProjectId}></ProjectSidebar>
      {content}
      </main>
    </>
  );
}

export default App;
