const loaderContainer = document.querySelector('.loader-container');
const pageContent = document.querySelector('#page-content');
const resetButton = document.getElementById('reset-button'); // Reference to reset button

window.addEventListener('load', () => {
  loaderContainer.classList.add('hidden');
  pageContent.classList.add('visible');
});

const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
  steel: "#7f8fa6",
};

const anzahlPokemon = 151;
const searchBox = document.getElementById("search");
const app = document.getElementById("card-container");
let allPokemon = [];

// Helper function to capitalize the first letter of a name
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function init() {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${anzahlPokemon}&offset=0`;
  const pokemonWithoutDetails = await fetchData(url);
  allPokemon = await Promise.all(pokemonWithoutDetails.results.map(async (pokemon) => {
    const detailedData = await fetchData(pokemon.url);
    return detailedData;
  }));

  // allPokemon.sort((a, b) => a.name.localeCompare(b.name));
  allPokemon.forEach(pokemon => {
    createCard(pokemon);
  });
}

async function suchePokemon(searchInput) {
  const filteredPokemon = allPokemon.filter(wantedPokemon => wantedPokemon.name.includes(searchInput.toLowerCase()));
  app.innerHTML = '';
  filteredPokemon.forEach(pokemon => {
    createCard(pokemon);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  pageContent.classList.add('visible');
  init();
});

searchBox.addEventListener('input', function () {
  suchePokemon(searchBox.value);
});

async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Create card for each pokemon

function createCard(pokemon) {
  const card = document.createElement("div");
  card.className = 'card';

  const hp = document.createElement("p");
  hp.classList.add('hp');
  hp.innerHTML = '<span class="hpLabel ">HP</span> ' + pokemon.stats[0].base_stat;
  card.appendChild(hp);

  const pokemonImage = document.createElement("img");
  pokemonImage.src = pokemon.sprites.other.home.front_default;
  pokemonImage.alt = pokemon.name;
  pokemonImage.className = 'pokemonImg';
  card.appendChild(pokemonImage);

  const name = document.createElement("h2");
  name.textContent = capitalizeFirstLetter(pokemon.name); // Apply capitalization
  name.className = 'poke-name';
  card.appendChild(name);

  const types = document.createElement("div");
  types.className = 'types';
  pokemon.types.forEach(type => {
    const span = document.createElement("span");
    span.textContent = type.type.name;
    span.style.backgroundColor = typeColor[type.type.name];
    types.appendChild(span);
  });
  card.appendChild(types);

  const stats = document.createElement("div");
  stats.className = 'stats';

  const attack = document.createElement("p");
  attack.innerHTML = '<span class="statLabel">Attack</span><span class="statValue">' + pokemon.stats[1].base_stat + '</span>';
  stats.appendChild(attack);

  const defense = document.createElement("p");
  defense.innerHTML = '<span class="statLabel">Defense</span><span class="statValue">' + pokemon.stats[2].base_stat + '</span>';
  stats.appendChild(defense);
  const speed = document.createElement("p");
  speed.innerHTML = '<span class="statLabel">Speed</span><span class="statValue">' + pokemon.stats[5].base_stat + '</span>';
  stats.appendChild(speed);

  card.appendChild(stats);

  const primaryTypeColor = typeColor[pokemon.types[0].type.name];
  styleCard(card, primaryTypeColor);

  document.getElementById("card-container").appendChild(card);
}

function styleCard(card, color) {
  card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #000000 36%)`;
}

// function to creat buttons/Checkboxes at top of the page

document.addEventListener('DOMContentLoaded', function () {
  init();
  createTypeButtons();
});

function createTypeButtons() {
  const types = Object.keys(typeColor); // Get all the types from 

  types.forEach(type => {
    const button = createTypeButton(type);
    const typeselection = document.getElementById('types');
    typeselection.appendChild(button);
    button.textContent = " ";
    button.style.cursor = 'pointer';
    button.style.borderRadius = '50%';
    button.style.width = '48px';
    button.style.height = '48px';
    const btnTxthover = type.charAt(0).toUpperCase() + type.slice(1);
    button.setAttribute('title', btnTxthover);
    const icon = document.createElement('img');
    icon.src = 'types/' + type + '.png';
    icon.alt = type;
    icon.style.borderRadius = '50%';
    icon.style.width = '24px';
    icon.style.height = '24px';
    icon.classList.add(type);
    icon.classList.add('icon');
    console.log(icon.src);
    button.appendChild(icon);
  });
}

function createTypeButton(type) {
  const button = document.createElement('button');
  button.textContent = capitalizeFirstLetter(type);
  button.style.backgroundColor = typeColor[type];
  button.className = 'type-button'; // Add this class for potential styling via CSS
  button.onclick = function () { filterByType(type); };

  return button;
}

function filterByType(type) {
  const filteredPokemon = allPokemon.filter(pokemon => pokemon.types.some(pokemonType => pokemonType.type.name === type));
  app.innerHTML = '';
  filteredPokemon.forEach(pokemon => {
    createCard(pokemon);
  });
}

// Function to reset filters and show all Pokémon
function resetFilters() {
  searchBox.value = ''; // Clear the search box
  app.innerHTML = ''; // Clear the current cards
  allPokemon.forEach(pokemon => {
    createCard(pokemon); // Create cards for all Pokémon
  });
}

resetButton.addEventListener('click', resetFilters); // Attach event listener to the reset button