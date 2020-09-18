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
let miInterfaz;
//LISTENERS*********************************************************************************
document.addEventListener('DOMContentLoaded', () => {
    //cargar la lista de tareas
    miInterfaz = new Interfaz();
    //instanciar el calendario por primera vez
    miCalendario = new Calendario(new Date);

});
btnDespues.addEventListener('click', () => {
    miCalendario.cargarFechaSiguiente(fechaActual);

});
btnAntes.addEventListener('click', () => {
    miCalendario.cargarFechaAnterior(fechaActual);
});
formTarea.addEventListener('submit', agregarTarea);
ulTareas.addEventListener('click', (e) => {
    miInterfaz.activarTarea(e);
});
divDias.addEventListener('click', seleccionarDia);
document.querySelector('#minimizar').addEventListener('click', () => {
    miInterfaz.ocultarVentanEmergente();
});
document.querySelector('.lista-emergente').addEventListener('click', eliminar);
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
        miInterfaz.cargarListaTareas();
        //limpiar formulario
        formTarea.reset();
    }
}


function seleccionarDia(e) {
    if (tareaSeleccionada && e.target.textContent != '') {
        guardarTareaEnCalendario(tareaSeleccionada, e.target);
    } else {
        miInterfaz.mostrarTareasDelDia(e.target);
    }
}
//agregar una tarea a una determinada fecha
function guardarTareaEnCalendario(tarea, divSeleccionado) {
    //fechaSeleccionada tiene la fecha del div al que se le dio click
    const fechaSeleccionada = obtenerFechaDeUnDiv(divSeleccionado);
    //verificar si esa fecha ya está guardada en fechasMarcadas
    if (fechasMarcadas.length > 0) {
        let bandera = 0;
        let indice;
        fechasMarcadas.forEach((fechaMarcada, index) => {
            if (fechaMarcada.dia.getDate() === fechaSeleccionada.dia && fechaMarcada.dia.getMonth() === fechaSeleccionada.mes && fechaMarcada.dia.getFullYear() === fechaSeleccionada.anio) {
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
                miInterfaz.mostrarMensaje('info', 'Ojo', 'Esa tarea ya estaba guardada anteriormente', 1500);
                miInterfaz.desactivarTarea();

            } else {
                fechasMarcadas[indice].idTareas.push(tarea.id);
                miInterfaz.mostrarMensaje('success', 'Correcto', 'Se guardó la tarea correctamente', 1500);
                miInterfaz.desactivarTarea();
                miInterfaz.mostrarDiasMarcados();
            }

        } else {
            //agregar nueva tarea
            fechasMarcadas.push({
                dia: new Date(fechaSeleccionada.anio, fechaSeleccionada.mes, fechaSeleccionada.dia),
                idTareas: [tarea.id]
            });
            miInterfaz.mostrarMensaje('success', 'Correcto', 'Se guardó la tarea correctamente', 1500);
            miInterfaz.desactivarTarea();
            miInterfaz.mostrarDiasMarcados();
        }
    } else {
        fechasMarcadas.push({
            dia: new Date(fechaSeleccionada.anio, fechaSeleccionada.mes, fechaSeleccionada.dia),
            idTareas: [tarea.id]
        });
        miInterfaz.mostrarMensaje('success', 'Correcto', 'Se guardó la tarea correctamente', 1500);
        miInterfaz.desactivarTarea();
        miInterfaz.mostrarDiasMarcados();
    }
    //console.log(fechasMarcadas);

}

//retorna la lista de tareas de un día en específico
//recibe como parámetro el div del día clickeado
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

function eliminar(e) {
    //eliminar las tareas de un determinado día
    //2 opciones: eliminar una tarea o eliminar todas por completo
    if (e.target.classList.contains('eliminarTarea')) {
        //eliminar una tarea
        //preguntar si está seguro
        Swal.fire({
            title: 'Estás seguro?',
            text: "Se borrará la tarea!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2B3E50',
            cancelButtonColor: '#dc3545',
            confirmButtonText: 'Sí, borrar!'
        }).then((result) => {
            if (result.isConfirmed) {
                //eliminar la tarea
                borrarUnaTarea(e.target.parentElement.parentElement);
            }
        })
    } else if (e.target.classList.contains('eliminarAllTareas')) {
        //eliminar todas las tareas
        //preguntar si está seguro
        Swal.fire({
            title: 'Estás seguro?',
            text: "Se borrarán todas las tareas!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2B3E50',
            cancelButtonColor: '#dc3545',
            confirmButtonText: 'Sí, borrar!'
        }).then((result) => {
            if (result.isConfirmed) {
                //eliminar todas las tareas
                borrarTodasLasTareas(e.target);
            }
        })
    }
}
//eliminar una tarea de una fecha específica
function borrarUnaTarea(div) {
    //el div contiene el id de la tarea a eliminar
    const idTarea = Number(div.getAttribute('data-tareaid'));
    //este li contiene la información del día del cual se borrará la tarea    
    const liBorrar = document.querySelector('.eliminarAllTareas');
    const dia = Number(liBorrar.getAttribute('data-dia'));
    const mes = Number(liBorrar.getAttribute('data-mes'));
    const anio = Number(liBorrar.getAttribute('data-anio'));
    fechasMarcadas.forEach((fechaMarcada, index) => {
        if (fechaMarcada.dia.getDate() === dia && fechaMarcada.dia.getMonth() === mes && fechaMarcada.dia.getFullYear() === anio) {
            //borrar la fecha del array que contiene todas las fechasMarcadas
            if (fechasMarcadas[index].idTareas.length === 1) {
                //si solo queda una tarea, entonces eliminar todas las tareas de esa fecha
                borrarTodasLasTareas(liBorrar);
            } else if (fechasMarcadas[index].idTareas.length > 1) {
                //si hay más de una tarea, entonces
                //eliminar esa única tarea de la fecha en cuestión
                const indice = fechasMarcadas[index].idTareas.indexOf(idTarea);
                fechasMarcadas[index].idTareas.splice(indice, 1);
                //eliminar la tarea (li) del dom
                div.remove();
            }
        }
    });
}
//elimina todas las tareas de una determinada fecha
function borrarTodasLasTareas(div) {
    const dia = Number(div.getAttribute('data-dia'));
    const mes = Number(div.getAttribute('data-mes'));
    const anio = Number(div.getAttribute('data-anio'));
    //buscar la fecha para borrarla del array de las fechasMarcadas
    fechasMarcadas.forEach((fechaMarcada, index) => {
        if (fechaMarcada.dia.getDate() === dia && fechaMarcada.dia.getMonth() === mes && fechaMarcada.dia.getFullYear() === anio) {
            //borrar la fecha del array que contiene todas las fechasMarcadas
            fechasMarcadas.splice(index, 1);
        }
    });
    //volver a cargar el calendario
    miCalendario.cargarDias(fechaActual);
    //ocultar la lista de tareas
    miInterfaz.ocultarVentanEmergente();

}