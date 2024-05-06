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
  };
  const anzahlPokemon = 120;
  const card = document.getElementById("card");
  let allPokemon = [];

// Initial 151 Pokémons fetched
  async function init() {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${anzahlPokemon}&offset=0`;
    pokemonWithoutDetails = await fetchData(url);
    allPokemon = await Promise.all(pokemonWithoutDetails.results.map(async (pokemon) => {
        let detailedData = await fetchData(pokemon.url); // Fetch detailed data for each Pokémon
        return detailedData; // Return detailed data instead of basic
    }));

    //sort Pokémon by name
    allPokemon.sort((a, b) => a.name.localeCompare(b.name));

    allPokemon.forEach(pokemon => {
        createCard(pokemon);
    });
}

// dom loaded

document.addEventListener('DOMContentLoaded', function () {
    init();
});

// Fetch data from API

async function fetchData(url) {
    try {let response = await fetch(url);
    let data = await response.json();
    return data;}
    catch (error) {
        console.log(error);
    }}

// Create card for each Pokémon

function createCard(pokemon) {
    let card = document.createElement("div");
    card.className = 'card';

    // HP
    let hp = document.createElement("p");
    hp.classList.add('hp');
    hp.textContent = 'HP ' + pokemon.stats[0].base_stat;
    card.appendChild(hp);

    // Image
    let pokemonImage = document.createElement("img");
    pokemonImage.src = pokemon.sprites.other.home.front_default;
    pokemonImage.alt = pokemon.name;
    pokemonImage.className = 'pokemonImg';
    card.appendChild(pokemonImage);

    // Name
    let name = document.createElement("h2");
    name.textContent = pokemon.name;
    name.className = 'poke-name';
    card.appendChild(name);

    // Types
    let types = document.createElement("div");
    types.className = 'types';
    pokemon.types.forEach(type => {
        let span = document.createElement("span");
        span.textContent = type.type.name;
        span.style.backgroundColor = typeColor[type.type.name];
        types.appendChild(span);
    });
    card.appendChild(types);

    // Stats
    let stats = document.createElement("div");
    stats.className = 'stats';
    
    // Attack
    let attack = document.createElement("p");
    attack.textContent = 'Attack' + pokemon.stats[0].base_stat;
    stats.appendChild(attack);

    // Defense
    let defense = document.createElement("p");
    defense.textContent = 'Defense' + pokemon.stats[1].base_stat;
    stats.appendChild(defense);

    // Speed
    let speed = document.createElement("p");
    speed.textContent = 'Speed' + pokemon.stats[2].base_stat;
    stats.appendChild(speed);

    card.appendChild(stats);

    //styling the card with radial gradient and type color
    let primaryTypeColor = typeColor[pokemon.types[0].type.name];
    styleCard(card, primaryTypeColor);

    document.getElementById("card-container").appendChild(card);  // Ensure 'card' ID exists in your HTML
}

function styleCard(card, color){
  card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #000000 36%)`;
}

