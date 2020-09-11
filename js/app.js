//variables
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
//listeners
document.addEventListener('DOMContentLoaded', cargarDias(new Date));
//funciones
function cargarDias(fecha) {

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
        //añadir clase activo al día actual
        if (i == fecha.getDate()) {
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
    return new Date(fecha.getFullYear(), fecha.getMonth(), 1).getDay();
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