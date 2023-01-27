
//https://www.youtube.com/watch?v=itNsRn1kjLU -------------------
import {
  onGetTasks,
  saveTask,
  deleteTask,
  getTask,
  updateTask,
  getTasks,
} from "./firebase.js";


const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container"); //ES LA FUNCIÓN QUE GENERARÁ LA VENTANA DE ELEMENTOS EN BASE DE DATOS DONDE SE HA COLCAOD ESE ID EN EL HTML

let editStatus = false;
let id = "";

taskForm.addEventListener("submit", async (e) => {  //AGREGAR NUEVAS ENTRADAS
  e.preventDefault();
  const title = taskForm["task-title"];
  const description = taskForm["task-description"];
  const location = taskForm["task-location"];
  const contact = taskForm["task-contact"];
  const mail = taskForm["task-mail"]
  const timestamp = Date.now();
  let fecha = (new Date(timestamp)).toString( );
  
  const photo = taskForm["task-photo"];


  try {
    if (!editStatus) {
      await saveTask(
        title.value, 
        description.value, 
        location.value, 
        contact.value, 
        mail.value,
        fecha
        ); //Se mandan todos los elementos obtenidos con .value directamente
    } else {
      await updateTask(id, {  //SI ES VERDADERA LA CONDICIÓN DE editrStatus SE CAMBIARÁN LOS DATOS POR LOS NUEVOS INGRESADOS, através del ID
        asunto: title.value,
        description: description.value,
        location: location.value,
        contact: contact.value,
        mail: mail.value,
      });

      editStatus = false;
      id = ""; //Se vacía la variable ID para buscar 
      taskForm["btn-task-form"].innerText = "Save"; //Una vez que se actualizan los datos, se regresa a SAVE el texto en botón
    }

    taskForm.reset(); //Vacias los inputs una vez que se ha guardado la información
    title.focus(); //regresar el cursor al título
  } catch (error) {
    console.log(error);
  }
});