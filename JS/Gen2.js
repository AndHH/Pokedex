const poke_container = document.getElementById('poke-container')
const pokemon_count = 251
const colors = {
    fire: '#FF5252',
    grass: '#9BFF59',
	electric: '#FFFA73',
	water: '#59EAFF',
	ground: '#BF6A4D',
	rock: '#483D31',
	fairy: '#F09DFF',
	poison: '#A924FF',
	bug: '#0D8806',
	dragon: '#FF8B1E',
	psychic: '#FF00F3',
	flying: '#9DD6FF',
	fighting: '#FFDA9D',
	normal: '#B5C2CC',
    dark:'#3D3C3C',
    ghost:'#F6F6F6',
    steel:'#7E7777',
    ice:'#9EFCF5',
}

const main_types = Object.keys(colors)

const fetchPokemons = async () => {
    for(let i =152; i <= pokemon_count; i++) {
        await getPokemon(i)
    }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()
    createPokemonCard(data)
}

const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div')
    pokemonEl.classList.add('pokemon')

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    const id = pokemon.id.toString().padStart(3, '0')

    const poke_types = pokemon.types.map(type => type.type.name)
    const type = main_types.find(type => poke_types.indexOf(type) > -1)
    const color = colors[type]

    pokemonEl.style.backgroundColor = color

    const pokemonInnerHTML = `
    <div class="img-container">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Tipo: <span>${type}</span> </small>
    </div>
    `

    pokemonEl.innerHTML = pokemonInnerHTML

    poke_container.appendChild(pokemonEl)
}

fetchPokemons()