/* CÓDIGO PARA MODAL EXTERNA*/
const openModal = document.querySelector('.active-modal');
const openModal2 = document.querySelector('.active-modal2');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal_x');

/*ABRIR DESDE AGENTE DE EXCELENCIA*/
openModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.add('modal--show');
});
/*ABRIR DESDE NUEVO REPORTE*/
openModal2.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.add('modal--show');
});

closeModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.remove('modal--show');
});



//https://www.youtube.com/watch?v=itNsRn1kjLU -------------------
import {
    onGetTasks,
    saveTask,
    deleteTask,
    getTask,
    updateTask,
    getTasks,
  } from "./firebase.js";
  
  
  const taskForm = document.getElementById("agt-form");
  const tasksContainer = document.getElementById("tasks-container"); //ES LA FUNCIÓN QUE GENERARÁ LA VENTANA DE ELEMENTOS EN BASE DE DATOS DONDE SE HA COLCAOD ESE ID EN EL HTML
  
  let editStatus = false;
  let id = "";
  
  taskForm.addEventListener("submit", async (e) => {  //AGREGAR NUEVAS ENTRADAS
    e.preventDefault();
    const mail = taskForm["agt-mail"];
    const predio = taskForm["agt-predio"];
    const referencia = taskForm["agt-refe"];
    const contacto = taskForm["agt-cel"];
    const descripcion = taskForm["agt-descripcion"];
    
    const timestamp = Date.now();
    let fecha = (new Date(timestamp)).toString( );  
    const photo = taskForm["agt-photo"];
  
    try {
      if (!editStatus) {
        console.log("prueba exitosa")
        await saveTask(
          mail.value, 
          predio.value, 
          referencia.value, 
          contacto.value, 
          descripcion.value,
          fecha
          ); //Se mandan todos los elementos obtenidos con .value directamente
      } else {
        console.log("prueba NO exitosa")
        await updateTask(id, {  //SI ES VERDADERA LA CONDICIÓN DE editrStatus SE CAMBIARÁN LOS DATOS POR LOS NUEVOS INGRESADOS, através del ID
          asunto: title.value,
          description: description.value,
          location: location.value,
          contact: contact.value,
          mail: mail.value,
        });
  
        editStatus = false;
        id = ""; //Se vacía la variable ID para buscar 
        taskForm["btn-agt-form"].innerText = "Save"; //Una vez que se actualizan los datos, se regresa a SAVE el texto en botón
      }
  
      taskForm.reset(); //Vacias los inputs una vez que se ha guardado la información
      modal.classList.remove('modal--show');
      mail.focus(); //regresar el cursor al título
    } catch (error) {
      console.log(console.log("ERROR:", error));
    }
  });