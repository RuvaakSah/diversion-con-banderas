const countriesList = document.getElementById('countries-list');

// URL con los campos específicos que pediste
const API_URL = "https://restcountries.com/v3.1/all?fields=name,flags,car,population,capital";

/**
 * Obtiene los países, los ordena y los manda a pintar
 */
async function fetchCountries() {
    try {
        const response = await fetch(API_URL);
        const countries = await response.json();

        // Ordenar alfabéticamente (A-Z)
        countries.sort((a, b) => {
            const nameA = a.name.common.toUpperCase();
            const nameB = b.name.common.toUpperCase();
            return nameA.localeCompare(nameB);
        });

        displayCountries(countries);
    } catch (error) {
        console.error("Error al obtener países:", error);
    }
}

/**
 * Crea las tarjetas de las banderas en el HTML
 */
function displayCountries(countries) {
    countriesList.innerHTML = ""; // Limpiar por si acaso

    countries.forEach(country => {
        const card = document.createElement('div');
        card.classList.add('country-card');
        
        card.innerHTML = `
            <img src="${country.flags.png}" alt="Bandera de ${country.name.common}">
            <p><strong>${country.name.common}</strong></p>
        `;

        // Al hacer clic, abrimos el detalle
        card.addEventListener('click', () => showDetail(country));
        
        countriesList.appendChild(card);
    });
}

/**
 * Crea y muestra la ventana flotante (Modal)
 */
function showDetail(country) {
    // Creamos el elemento del modal
    const modal = document.createElement('div');
    modal.classList.add('modal');

    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-btn" id="close-modal">Cerrar</button>
            <img src="${country.flags.png}" style="width: 100%; border: 1px solid #ddd">
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'No tiene'}</p>
            <p><strong>Población:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Lado de la carretera:</strong> ${country.car.side === 'right' ? 'Derecha' : 'Izquierda'}</p>
        </div>
    `;

    document.body.appendChild(modal);

    // Lógica para cerrar el modal
    document.getElementById('close-modal').addEventListener('click', () => {
        modal.remove();
    });
}

// Iniciamos la carga al entrar
fetchCountries();