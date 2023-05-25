import db from './connectDB';
import { collection, query, onSnapshot, orderBy, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

function TaskList(props) {

    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        const taskColRef = query(collection(db, 'tasks'), orderBy('created', 'desc'));
        onSnapshot(taskColRef, (snapshot) => {
            setTasks(snapshot.docs.map(doc => ({
                id: doc.id, // data:doc.data()
                ...doc.data()
            })));
        });
    }, []);

    //delete task from firestore
    const onDeleteTask = (id) => {
        deleteDoc(doc(db, 'tasks', id))
            .then(r => console.log('Ура'))
            .catch(err => console.log(err));
    };

//onToggleDone handler function to edit task status in firestore
    const onToggleDone = (id) => {
        const task = tasks.find(task => task.id === id);
        const updatedTask = { ...task, completed: !task.completed };


        //update task in firestore
        updateDoc(doc(db, 'tasks', id), updatedTask)
            .then((r) => console.log(r))
            .catch(err => console.log(err));
    };


    return (

        <ul className = 'list-group'>
            { tasks.map(task => (
                <li key = { task.id } className = 'list-group-item'>
                    <div className = 'row'>
                        <div className = 'col-8'>
                            { task.completed ? <s>{ task.title }</s> : task.title }
                        </div>
                        <div className = 'col-4'>
                            <button onClick = { () => onDeleteTask(task.id) }>Delete</button>
                            <button onClick = { () => onToggleDone(task.id) }>Done</button>
                            <button onClick = { () => props.onEdit(task.id) }>Edit</button>
                        </div>
                    </div>

                </li>)) }
        </ul>

    );
}

export default TaskList;
