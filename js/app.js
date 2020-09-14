//variables
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const tareas = [{
        nombre: 'Trabajo',
        color: '#007bff'
    },
    {
        nombre: 'Viaje',
        color: '#ffc107'
    }
];
const ulTareas = document.querySelector('.lista-tareas');
const btnDespues = document.querySelector('#despues');
const btnAntes = document.querySelector('#antes');
const formTarea = document.querySelector('#formTarea');
let fechaActual = new Date();
let miCalendario;
//listeners
document.addEventListener('DOMContentLoaded', () => {
    //instanciar el calendario por primera vez
    miCalendario = new Calendario(new Date);
    //cargar la lista de tareas
    cargarListaTareas();
});
btnDespues.addEventListener('click', () => {
    miCalendario.cargarFechaSiguiente(fechaActual);

});
btnAntes.addEventListener('click', () => {
    miCalendario.cargarFechaAnterior(fechaActual)
});
formTarea.addEventListener('submit', agregarTarea);
//funciones
function agregarTarea(e) {
    e.preventDefault();
    const nombreTarea = document.querySelector('#nombreTarea').value;
    if (nombreTarea != "") {
        const colorElegido = document.querySelector('.pickr button').style.color;
        //agregar nueva tarea al array tareas
        tareas.push({
            nombre: nombreTarea,
            color: colorElegido
        });
        //mostrar la tarea agregada en el DOM
        cargarListaTareas();
        //limpiar formulario
        formTarea.reset();
    }
}

function cargarListaTareas() {
    //limpiar la lista de tareas
    ulTareas.innerHTML = '';
    // el array tareas contiene todas las tareas existentes
    tareas.forEach(tarea => {
        //creando cada li con el nombre de la tarea
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'text-capitalize');
        li.innerHTML = `
        ${tarea.nombre}<span class="badge" style="background-color:${tarea.color}"><i class="fas fa-paint-brush"></i></span>
        `;
        //agregando cada li al dom
        ulTareas.appendChild(li);

    });



}