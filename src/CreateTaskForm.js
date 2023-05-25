import {useState} from "react";
import {collection, addDoc, Timestamp} from "firebase/firestore";
import db from "./connectDB";


function CreateTaskForm() {
//state for the title of the task
  const [title, setTitle] = useState('');

  //function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title);
    //how to send data to Firestore
    addDoc(collection(db, 'tasks'), {
      title,
      // completed: false,
      created: Timestamp.now()
    }).then(r => console.log(r))
      .catch(err => console.log(err));
    setTitle('');// clear input field each time
  };


  return (
    <form className='input-group mb-3'>
      <input type="text" placeholder="Enter task title" id="" value={title} onChange={e => setTitle(e.target.value)}
             className="form-control" />
      <button className='btn btn-primary' type="submit" onClick={handleSubmit}>Add Task</button>
    </form>
  );
}

export default CreateTaskForm;