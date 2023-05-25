import CreateTaskForm from "./CreateTaskForm";
import TaskList from "./TaskList";
import {useState} from "react";
import EditTaskForm from "./EditTaskForm";

function App() {
  //state for id edit task status visibility
  const [editTaskId, setEditTaskId] = useState(null);

  //onEdit
  const onEdit = (id) => {
    console.log(id);
    setEditTaskId(id); // когда будет происходить onEdit, мы в state будем записывать id.Это нам даст возможнось показывать или нет какую-то форму

  };

  const onEditCancel = () => {
    setEditTaskId(null);
  };

  return (<div className="container">
    <CreateTaskForm/>
    <TaskList onEdit={onEdit}/>
    {editTaskId &&<EditTaskForm id={editTaskId} onCancel={onEditCancel}/>}
  </div>);
}

export default App;
