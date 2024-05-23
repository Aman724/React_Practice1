import Input from "./Utility/Input"
import {useRef} from 'react';
import Modal from './Utility/Modal'
export default function NewProject({onAdd, onCancel}){
    const titleRef=useRef();
    const descriptionRef = useRef();
    const dueDateRef = useRef();
    const modalRef = useRef();
    function handleSave(){
        const enteredTitle = titleRef.current.value;
        const enteredDescription = descriptionRef.current.value;
        const dueDate = dueDateRef.current.value;

        //validation
        if(enteredTitle.trim() === '' || enteredDescription.trim()==='' || dueDate.trim()===''){
            //show error modal
            modalRef.current.open();
            return;
        }

        onAdd({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: dueDate
        })
    }
    return(
    <>
        <Modal ref={modalRef} buttonCaption="Okay">
            <h1 className="text-xl font-bols text-stone-500 my-4">Invalid Input</h1>
            <p className="text-stone-600 mb-4">Oops... looks like you forgot to enter a value</p>
            <p className="text-stone-600 mb-4">Please make sure you provide a valid value for every input field</p>
        </Modal>
        <div className="w-[35rem] mt-16">
            <menu className="flex items-center justify-end gap-4 my-4">
            <button className="text-stone-800 hover:text-stone-950" onClick={onCancel}>Cancel</button>
            <button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
            onClick={handleSave}>Save</button>
            </menu>
            <div>
                <Input ref={titleRef} label ="Title"/>
                <Input ref={descriptionRef} label ="Description" textarea/>
                <Input type='date' ref={dueDateRef} label ="Due date"/>
            </div>
        </div>
    </>)
}