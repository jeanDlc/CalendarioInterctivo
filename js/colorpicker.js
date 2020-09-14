// Simple example, see optional options for more configuration.
const pickr = Pickr.create({
    el: '.color-picker',
    theme: 'classic', // or 'monolith', or 'nano'
    default: '#df691a',
    swatches: [
        '#df691a'
    ],

    components: {

        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
            input: true,
            clear: true,
            save: true
        }
    }
});
pickr.on('save', (color, instance) => {
    console.log('save', color, instance);
}).on('clear', instance => {
    console.log('clear', instance);
}).on('change', (color, instance) => {
    //selecccionar el colorpicker que cambiará de color
    const colorpicker = document.querySelector('.pickr button');
    //convertir el color a hexadecimal
    const colorHexa = color.toHEXA().toString();
    colorpicker.style.color = `${colorHexa}`;
    console.log(color.toHEXA().toString());
}).on('swatchselect', (color, instance) => {
    console.log('swatchselect', color, instance);
});