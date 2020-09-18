class Interfaz {
    constructor() {
        this.init();
    }
    init() {
        this.cargarListaTareas();
    }
    cargarListaTareas() {
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
        //cuando le das click a una tarea, esta se activa
        //también se sombrea la tarea seleccionada
    activarTarea(e) {
            this.desactivarTarea();
            const idSeleccionado = Number(e.target.getAttribute('data-id'));
            tareas.forEach((tarea) => {
                if (tarea.id === idSeleccionado) {
                    tareaSeleccionada = tarea;
                }
            });
            e.target.classList.add('activo');
        }
        //desactiva la tarea que estaba seleccionada
        //también se le quita el sombreado
    desactivarTarea() {
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
        //colorea los días que tienen tareas
    mostrarDiasMarcados() {
            if (fechasMarcadas.length > 0) {
                const mes = fechaActual.getMonth();
                const anio = fechaActual.getFullYear();
                let bandera = 0;
                let diasMarcados = [];
                fechasMarcadas.forEach(fecha => {
                    if (fecha.dia.getFullYear() == anio && fecha.dia.getMonth() == mes) {
                        bandera++;
                        diasMarcados.push(fecha.dia.getDate());
                    }
                });

                if (bandera > 0) {
                    //existen tareas en este mes
                    const divDias = document.querySelector('#dias');
                    divDias.childNodes.forEach(divDia => {
                        if (diasMarcados.includes(Number(divDia.textContent))) {
                            divDia.classList.add('diaMarcado');
                        }
                    });
                }
            }

        }
        //muestra la lista de tareas cuando se da click en un día
    mostrarTareasDelDia(divDiaClickeado) {
        //revisar si existen tareas guardadas
        if (fechasMarcadas.length > 0) {
            //revisar si hay tareas ese día
            if (divDiaClickeado.classList.contains('diaMarcado')) {
                const tareasDelDia = obtenerTareasDelDiv(divDiaClickeado);
                if (tareasDelDia.length > 0) {
                    document.querySelector('.ventana-emergente').style.display = 'block';
                    //si hay tareas ese día entonces..
                    //escribir el titulo de la ventana emergente
                    const fechaDelDiv = obtenerFechaDeUnDiv(divDiaClickeado);
                    document.querySelector('.titulo-ventana-emergente').textContent = `
                    ${fechaDelDiv.dia} de ${fechaDelDiv.nombreMes} del ${fechaDelDiv.anio}
                    `;
                    //mostrar la lista de tareas en el DOM                    
                    const listaEmergente = document.querySelector('.lista-emergente');
                    //limpiar la listaEmergente
                    listaEmergente.innerHTML = '';
                    //crear un li para cada tarea
                    tareasDelDia.forEach(tarea => {
                        //creando el contenido de cada li
                        const li = document.createElement('li');
                        li.setAttribute('data-tareaID', `${tarea.id}`);
                        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'text-capitalize', 'borrarTodo');
                        li.innerHTML = `
                            ${tarea.nombre}
                            <div class="d-flex align-items-center">
                            <i class="fas fa-times eliminarTarea text-danger mr-4"></i>
                                <span class="badge" style="background-color:${tarea.color}"><i class="fas fa-paint-brush" aria-hidden="true"></i></span>
                            </div>
                        `;
                        //agregar cada li al DOM
                        listaEmergente.appendChild(li);
                    });
                    //agregar el último li que es para borrar todo
                    const liBorrar = document.createElement('li');
                    liBorrar.classList.add('list-group-item', 'text-capitalize', 'bg-danger', 'eliminarAllTareas', 'text-light', 'text-right');
                    liBorrar.setAttribute('data-dia', `${fechaDelDiv.dia}`);
                    liBorrar.setAttribute('data-mes', `${fechaDelDiv.mes}`);
                    liBorrar.setAttribute('data-anio', `${fechaDelDiv.anio}`);
                    liBorrar.textContent = 'Borrar Todo';
                    listaEmergente.appendChild(liBorrar);
                } else {
                    //mostrar un mensaje de que no hay tareas
                    this.mostrarMensaje('info', 'Vacío', 'Aquí no hay tareas, selecciona una tarea', 2000);
                }


            } else {
                this.mostrarMensaje('info', 'Vacío', 'Aquí no hay tareas, selecciona una tarea', 2000);
            }
        } else {
            this.mostrarMensaje('info', 'Vacío', 'Aquí no hay tareas, selecciona una tarea', 2000);
        }
    }
    mostrarMensaje(icono, titulo, mensaje, tiempo) {
        Swal.fire({
            icon: icono,
            title: titulo,
            text: mensaje,
            timer: tiempo,
            confirmButtonColor: '#2B3E50',
        })
    }
    ocultarVentanEmergente() {
        document.querySelector('.ventana-emergente').style.display = 'none';
    }

}