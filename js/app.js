//variables
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const btnDespues = document.querySelector('#despues');
const btnAntes = document.querySelector('#antes');
let fechaActual = new Date();
let miCalendario;
//listeners
document.addEventListener('DOMContentLoaded', () => {
    miCalendario = new Calendario(new Date);
});
btnDespues.addEventListener('click', () => {
    miCalendario.cargarFechaSiguiente(fechaActual);

});
btnAntes.addEventListener('click', () => {
    miCalendario.cargarFechaAnterior(fechaActual)
});