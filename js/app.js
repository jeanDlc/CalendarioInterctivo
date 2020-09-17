//VARIABLES******************************************************************************
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const tareas = [{
        id: 0,
        nombre: 'Trabajo',
        color: '#007bff'
    },
    {
        id: 1,
        nombre: 'Viaje',
        color: '#ffc107'
    }
];
const fechasMarcadas = [];
let tareaSeleccionada;
const ulTareas = document.querySelector('.lista-tareas');
const btnDespues = document.querySelector('#despues');
const btnAntes = document.querySelector('#antes');
const formTarea = document.querySelector('#formTarea');
const divDias = document.querySelector('#dias');
let fechaActual = new Date();
let miCalendario;
//LISTENERS*********************************************************************************
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
ulTareas.addEventListener('click', activarTarea);
divDias.addEventListener('click', seleccionarDia);
document.querySelector('#minimizar').addEventListener('click', () => {
    document.querySelector('.ventana-emergente').style.display = 'none';
});
//FUNCIONES********************************************************************************
function agregarTarea(e) {
    e.preventDefault();
    const nombreTarea = document.querySelector('#nombreTarea').value;
    if (nombreTarea != "") {
        const colorElegido = document.querySelector('.pickr button').style.color;
        //agregar nueva tarea al array tareas
        tareas.push({
            id: tareas.length,
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
        li.setAttribute('data-id', `${tarea.id}`);
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'text-capitalize');
        li.innerHTML = `
        ${tarea.nombre}<span class="badge" style="background-color:${tarea.color}"><i class="fas fa-paint-brush"></i></span>
        `;
        //agregando cada li al dom
        ulTareas.appendChild(li);

    });
}

function activarTarea(e) {
    desactivarTarea();
    const idSeleccionado = Number(e.target.getAttribute('data-id'));
    tareas.forEach((tarea) => {
        if (tarea.id === idSeleccionado) {
            tareaSeleccionada = tarea;
        }
    });
    e.target.classList.add('activo');
}

function desactivarTarea() {
    //remover la clase activo de la tarea seleccionada
    ulTareas.childNodes.forEach(li => {
            if (li.classList.contains('activo')) {
                //remover la clase activo
                li.classList.remove('activo');
            }
        })
        //que no haya ninguna tarea seleccionada
    tareaSeleccionada = '';
}

function seleccionarDia(e) {
    if (tareaSeleccionada && e.target.textContent != '') {
        guardarTareaEnCalendario(tareaSeleccionada, e.target);
    } else {
        miCalendario.mostrarTareasDelDia(e.target);
    }
}
//agregar una tarea a una determinada fecha
function guardarTareaEnCalendario(tarea, divSeleccionado) {

    const fecha = Number(divSeleccionado.textContent);
    const mes = fechaActual.getMonth();
    const anio = fechaActual.getFullYear();
    const fechaSeleccionada = new Date(anio, mes, fecha);
    //console.log(fechaSeleccionada);
    //verificar si esa fecha ya está guardada
    if (fechasMarcadas.length > 0) {
        let bandera = 0;
        let indice;
        fechasMarcadas.forEach((fechaMarcada, index) => {
            if (fechaMarcada.dia.getDate() === fechaSeleccionada.getDate() && fechaMarcada.dia.getMonth() === fechaSeleccionada.getMonth() && fechaMarcada.dia.getFullYear() === fechaSeleccionada.getFullYear()) {
                bandera++;
                indice = index;


            }
        });
        if (bandera > 0) {
            //la fecha ya estaba marcada
            //agregar la tarea en una fecha que ya estaba guardada
            //verificar que no se agregué una misma tarea dos veces
            if (fechasMarcadas[indice].idTareas.includes(tarea.id)) {
                //esa tarea ya existe
                console.log('esa tarea ya esta guardada');
                mostrarMensaje('info', 'Ojo', 'Esa tarea ya estaba guardada anteriormente', 1500);
                desactivarTarea();

            } else {
                fechasMarcadas[indice].idTareas.push(tarea.id);
                mostrarMensaje('success', 'Correcto', 'Se guardó la tarea correctamente', 1500);
                desactivarTarea();
                miCalendario.mostrarDiasMarcados();
            }

        } else {
            //agregar nueva tarea
            fechasMarcadas.push({
                dia: fechaSeleccionada,
                idTareas: [tarea.id]
            });
            mostrarMensaje('success', 'Correcto', 'Se guardó la tarea correctamente', 1500);
            desactivarTarea();
            miCalendario.mostrarDiasMarcados();
        }
    } else {
        fechasMarcadas.push({
            dia: fechaSeleccionada,
            idTareas: [tarea.id]
        });
        mostrarMensaje('success', 'Correcto', 'Se guardó la tarea correctamente', 1500);
        desactivarTarea();
        miCalendario.mostrarDiasMarcados();
    }
    //console.log(fechasMarcadas);

}

function mostrarMensaje(icono, titulo, mensaje, tiempo) {
    Swal.fire({
        icon: icono,
        title: titulo,
        text: mensaje,
        timer: tiempo
    })
}
//retorna la lista de tareas de un día en específico
//resibe como parámetro el div del día clickeado
function obtenerTareasDelDiv(divClickeado) {
    //obtener la fecha actual del día clickeado
    const fechaDelDiv = obtenerFechaDeUnDiv(divClickeado);
    let ids;
    //obtener lis ids de las tareas que hay en esa fecha
    fechasMarcadas.forEach(fechaMarcada => {
        if (fechaMarcada.dia.getDate() === fechaDelDiv.dia && fechaMarcada.dia.getMonth() === fechaDelDiv.mes && fechaMarcada.dia.getFullYear() === fechaDelDiv.anio) {
            ids = fechaMarcada.idTareas;
        }
    });
    const tareasDelDia = [];
    if (ids.length > 0) {
        //si hay tareas , entonces retornar la lista de tareas de ese día
        tareas.forEach(tarea => {
            if (ids.includes(tarea.id)) {
                tareasDelDia.push(tarea);
            }
        });
        //retorna un array con las tareas de ese día
        return tareasDelDia;
    } else {
        //sino, retornar un array vacío
        return [];
    }
}
//retorna un objeto con la informacion del día de un div
function obtenerFechaDeUnDiv(divDia) {
    //el objeto tiene la información de la fecha de un div del calendario
    return {
        anio: fechaActual.getFullYear(),
        mes: fechaActual.getMonth(),
        dia: Number(divDia.textContent),
        nombreMes: meses[fechaActual.getMonth()]
    }
}