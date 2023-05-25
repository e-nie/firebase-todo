import {useEffect, useState} from "react";
import {collection, addDoc, Timestamp, doc, getDoc, updateDoc} from "firebase/firestore";
import db from "./connectDB";


function EditTaskForm(props) {

//state for the title of the task
  const [title, setTitle] = useState('');
  if (!props.id) return null;

  //get task from firestore

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getDoc(doc(db, 'tasks', props.id)).then(doc => {
      setTitle(doc.data().title);
    });
  }, [props.id]);

  //function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    updateDoc(doc(db, 'tasks', props.id), {title})
      .then((r) => console.log(r))
      .catch(err => console.log(err));
    props.onCancel();
    setTitle('')
  };

  const handleCancel=()=> {
    props.onCancel()
    setTitle('')
  }
  //hide form if title is null

  if (!title) return null;

  return (<form>
    <input type="text" placeholder="Enter task title" id="" value={title} onChange={e => setTitle(e.target.value)}/>
    <button type="submit" onClick={handleSubmit}>Save</button>
    <button type="submit" onClick={handleCancel}>Cancel</button>
  </form>);
}

export default EditTaskForm;