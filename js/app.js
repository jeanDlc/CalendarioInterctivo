//variables
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const btnDespues = document.querySelector('#despues');
const btnAntes = document.querySelector('#antes');
let fechaActual = new Date();
//listeners
document.addEventListener('DOMContentLoaded', cargarDias(new Date));
btnDespues.addEventListener('click', () => {
    cargarFechaSiguiente(fechaActual)
});
btnAntes.addEventListener('click', () => {
    cargarFechaAnterior(fechaActual)
});
//funciones
function cargarDias(fecha) {
    limpiarCalendario();
    fechaActual = fecha;
    //const fecha = new Date();
    const numDias = cantidadDias(fecha);
    const primerDia = primerDiaDeSemana(fecha);
    const listaDias = document.querySelector('#dias');
    //poner los primeros div vacios antes de rellenar el calendario
    for (j = 1; j < primerDia; j++) {
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
    rellenarCabecera(fecha);

}

function cantidadDias(fecha) {
    //retorna la cantidad de dias del mes de 'fecha'
    return new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0).getDate();
}
//averiguar en qué día de semana empieza el mes
function primerDiaDeSemana(fecha) {
    const primerDia = new Date(fecha.getFullYear(), fecha.getMonth(), 1).getDay();
    if (primerDia === 0) {
        return 7;
    } else {
        return primerDia;
    }
    //return new Date(fecha.getFullYear(), fecha.getMonth(), 1).getDay();
}

function nombreMes(fecha) {
    //obtener el nombre de un mes
    return meses[fecha.getMonth()];
}

function rellenarCabecera(fecha) {
    //rellena la cabecera del calendario(donde aparece mes y año)
    const mes = nombreMes(fecha);
    const anio = fecha.getFullYear();
    //rellenar en el DOM
    document.querySelector('#mes').textContent = `${mes}`;
    document.querySelector('#anio').textContent = `${anio}`;
}

function getFechaSiguiente(fecha) {
    if (fecha.getMonth() === 11) {
        return new Date(fecha.getFullYear() + 1, 0, 1);
    } else {
        return new Date(fecha.getFullYear(), fecha.getMonth() + 1, 1);
    }
}

function getFechaAnterior(fecha) {
    if (fecha.getMonth() === 0) {
        return new Date(fecha.getFullYear() - 1, 11, 1);
    } else {
        return new Date(fecha.getFullYear(), fecha.getMonth() - 1, 1);
    }
}

function cargarFechaSiguiente(fecha) {
    const fechaSiguiente = getFechaSiguiente(fecha);
    cargarDias(fechaSiguiente);
}

function cargarFechaAnterior(fecha) {
    const fechaAnterior = getFechaAnterior(fecha);
    cargarDias(fechaAnterior);
}

function limpiarCalendario() {
    document.querySelector('#dias').innerHTML = '';
}