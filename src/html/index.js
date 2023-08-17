// Assuming you're using Webpack and have SCSS configured
import './style.scss';

document.addEventListener('DOMContentLoaded', () => {

    var cards = {
        'A': ['&#9827;', '&#9824;', '&#9829;', '&#9830;'],
        '2': ['&#9827;', '&#9824;', '&#9829;', '&#9830;'],
        '3': ['&#9827;', '&#9824;', '&#9829;', '&#9830;'],
        '4': ['&#9827;', '&#9824;', '&#9829;', '&#9830;'],
        '5': ['&#9827;', '&#9824;', '&#9829;', '&#9830;'],
        '6': ['&#9827;', '&#9824;', '&#9829;', '&#9830;'],
        '7': ['&#9827;', '&#9824;', '&#9829;', '&#9830;'],
        '8': ['&#9827;', '&#9824;', '&#9829;', '&#9830;'],
        '9': ['&#9827;', '&#9824;', '&#9829;', '&#9830;'],
        '10': ['&#9827;', '&#9824;', '&#9829;', '&#9830;'],
        'J': ['&#9827;', '&#9824;', '&#9829;', '&#9830;'],
        'Q': ['&#9827;', '&#9824;', '&#9829;', '&#9830;'],
        'K': ['&#9827;', '&#9824;', '&#9829;', '&#9830;']
    };

    var baralho = document.getElementById('baralho');

    var miolo = (valor, naipe) => {
        valor = ['A', 'J', 'Q', 'K'].includes(valor) ? 1 : parseInt(valor);
        console.log(valor, naipe);

        return `
            <div class="carta-miolo miolo-${valor}">
                ${new Array(valor).fill().map(() => {
            if (valor > 1)
                return `<span class="naip-miolo">${naipe}</span>`
            return `<span>${naipe}</span>`
        }).join('')}
            </div>
        `;
    }

    var carta = (valor, naipe) => {
        return `
            <div class="carta" style="color: ${['&#9827;', '&#9824;'].includes(naipe) ? 'black' : 'red'}">
                <div class="naip-area naip-top">
                    <span class="naip-number">${valor}</span>
                    <span class="naip-sign">${naipe}</span>
                </div>

                <div class="naip-area naip-bottom">
                    <span class="naip-number">${valor}</span>
                    <span class="naip-sign">${naipe}</span>
                </div>

                ${miolo(valor, naipe)}

            </div>
        `;
    }

    Object.keys(cards).forEach(v => {
        cards[v].forEach(n => {
            baralho.innerHTML += carta(v, n);
        });
    });

});
