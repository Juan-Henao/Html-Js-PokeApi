const gallery = document.getElementById('gallery');
const modal = document.getElementById('pokemonModal');
const modalContent = document.getElementById('pokemon-details');
const closeModal = document.querySelector('.close');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// Función para obtener y mostrar los Pokémon constpor defecto (primeros 25)
async function fetchPokemons() {
    for (let id = 1; id <= 25; id++) {
        await fetchPokemonByIdOrName(id);
    }
}

// Función para obtener un Pokémon por nombre o ID
async function fetchPokemonByIdOrName(identifier) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
        if (!response.ok) {
            alert('Pokémon no encontrado. Por favor, verifica el nombre o ID.');
            return;
        }
        const data = await response.json();
        createPokemonCard(data);
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
    }
}

// Función para crear una card con la información del Pokémon
function createPokemonCard(pokemon) {
    const imageUrl = pokemon.sprites.other.home.front_default;
    const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    // Crear la card para el Pokémon
    const card = document.createElement('div');
    card.classList.add('card');
    card.addEventListener('click', () => showPokemonDetails(pokemon));

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = pokemonName;

    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');

    const title = document.createElement('h2');
    title.textContent = pokemonName;

    // Añadir la imagen y el nombre a la card
    cardContent.appendChild(title);
    card.appendChild(img);
    card.appendChild(cardContent);

    // Añadir la card a la galería
    gallery.appendChild(card);
}

// Función para mostrar los detalles del Pokémon en el modal
function showPokemonDetails(pokemon) {
    const { name, sprites, types, abilities } = pokemon;
    const imageUrl = sprites.other.dream_world.front_default;
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

    // Limpiar el contenido del modal
    modalContent.innerHTML = '';

    // Crear los elementos para los detalles del Pokémon
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = capitalizedName;

    const title = document.createElement('h2');
    title.textContent = capitalizedName;

    const typeList = document.createElement('ul');
    typeList.innerHTML = `<strong>Tipo(s):</strong> ${types.map(type => type.type.name).join(', ')}`;

    const abilityList = document.createElement('ul');
    abilityList.innerHTML = `<strong>Habilidades:</strong> ${abilities.map(ability => ability.ability.name).join(', ')}`;

    // Añadir los elementos al contenido del modal
    modalContent.appendChild(img);
    modalContent.appendChild(title);
    modalContent.appendChild(typeList);
    modalContent.appendChild(abilityList);

    // Mostrar el modal
    modal.style.display = 'flex';
}

// Evento para cerrar el modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Cerrar el modal cuando se hace clic fuera del contenido
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Función de búsqueda
searchButton.addEventListener('click', () => {
    const query = searchInput.value.toLowerCase().trim();
    if (query) {
        gallery.innerHTML = ''; // Limpiar la galería para mostrar solo el Pokémon buscado
        fetchPokemonByIdOrName(query); // Buscar por nombre o ID
    }else{
        gallery.innerHTML = ''; // Limpiar la galería para mostrar solo el Pokémon buscado
        fetchPokemons();
    }

});

// Llamar a la función para cargar los Pokémon por defecto al cargar la página
fetchPokemons();
