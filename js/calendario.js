class Calendario {
    constructor(hoy) {
        this.hoy = hoy;
        this.init();

    }
    init() {

        this.cargarDias(this.hoy);

    }
    cargarDias(fecha) {
        this.limpiarCalendario();
        fechaActual = fecha;
        //const fecha = new Date();
        const numDias = this.cantidadDias(fecha);
        const primerDia = this.primerDiaDeSemana(fecha);
        const listaDias = document.querySelector('#dias');
        //poner los primeros div vacios antes de rellenar el calendario
        for (let j = 1; j < primerDia; j++) {
            const divVacio = document.createElement('div');
            divVacio.classList.add('dia');
            listaDias.appendChild(divVacio);
        }
        //empezar a llenar el calendario
        for (let i = 1; i <= numDias; i++) {
            const divDia = document.createElement('div');
            divDia.classList.add('dia');
            divDia.textContent = `${i}`;
            listaDias.appendChild(divDia);
            //añadir clase activo al día de hoy
            if (i == new Date().getDate() && fecha.getMonth() == new Date().getMonth() && fecha.getFullYear() == new Date().getFullYear()) {
                divDia.classList.add('activo');
            }
        }
        this.rellenarCabecera(fecha);
        this.mostrarDiasMarcados();
    }
    cantidadDias(fecha) {
        //retorna la cantidad de dias del mes de 'fecha'
        return new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0).getDate();
    }
    primerDiaDeSemana(fecha) {
        const primerDia = new Date(fecha.getFullYear(), fecha.getMonth(), 1).getDay();
        if (primerDia === 0) {
            return 7;
        } else {
            return primerDia;
        }
        //return new Date(fecha.getFullYear(), fecha.getMonth(), 1).getDay();
    }
    nombreMes(fecha) {
        //obtener el nombre de un mes
        return meses[fecha.getMonth()];
    }
    rellenarCabecera(fecha) {
        //rellena la cabecera del calendario(donde aparece mes y año)
        const mes = this.nombreMes(fecha);
        const anio = fecha.getFullYear();
        //rellenar en el DOM
        document.querySelector('#mes').textContent = `${mes}`;
        document.querySelector('#anio').textContent = `${anio}`;
    }
    getFechaSiguiente(fecha) {
        if (fecha.getMonth() === 11) {
            return new Date(fecha.getFullYear() + 1, 0, 1);
        } else {
            return new Date(fecha.getFullYear(), fecha.getMonth() + 1, 1);
        }
    }
    getFechaAnterior(fecha) {
        if (fecha.getMonth() === 0) {
            return new Date(fecha.getFullYear() - 1, 11, 1);
        } else {
            return new Date(fecha.getFullYear(), fecha.getMonth() - 1, 1);
        }
    }
    cargarFechaSiguiente(fecha) {
        const fechaSiguiente = this.getFechaSiguiente(fecha);
        this.cargarDias(fechaSiguiente);
    }
    cargarFechaAnterior(fecha) {
        const fechaAnterior = this.getFechaAnterior(fecha);
        this.cargarDias(fechaAnterior);
    }
    limpiarCalendario() {
            document.querySelector('#dias').innerHTML = '';
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
                        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'text-capitalize');
                        li.innerHTML = `
                            ${tarea.nombre}
                            <div class="d-flex align-items-center">
                                <span class="text-danger mr-2"><i class="fas fa-times"></i></span>
                                <span class="badge" style="background-color:${tarea.color}"><i class="fas fa-paint-brush" aria-hidden="true"></i></span>
                            </div>
                        `;
                        //agregar cada li al DOM
                        listaEmergente.appendChild(li);
                    });
                    //agregar el último li que es para borrar todo
                    const liBorrar = document.createElement('li');
                    liBorrar.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'text-capitalize', 'bg-danger');
                    liBorrar.innerHTML = `
                        <span class="text-light">Borrar todo</span> <span class="badge badge-light"><i class="fas fa-trash-alt"></i></span>
                    `;
                    listaEmergente.appendChild(liBorrar);
                } else {
                    //mostrar un mensaje de que no hay tareas
                    mostrarMensaje('info', 'Vacío', 'Aquí no hay tareas, selecciona una tarea', 2000);
                }


            } else {
                mostrarMensaje('info', 'Vacío', 'Aquí no hay tareas, selecciona una tarea', 2000);
            }
        } else {
            mostrarMensaje('info', 'Vacío', 'Aquí no hay tareas, selecciona una tarea', 2000);
        }
    }
}