const pokemonName = document.querySelector(".pokemon_name")
const pokemonNumber = document.querySelector(".pokemon_number")
const pokemonImage = document.querySelector(".pokemon_image")

const form = document.querySelector(".form")
const input = document.querySelector(".input_search")

let currentPokemonNumber = 1
let originalImageUrl = ''

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`)
    
    if (APIResponse.status == 200){
        const data = await APIResponse.json()
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = "carregando..."
    pokemonNumber.innerHTML = ""
    const data = await fetchPokemon(pokemon)

    if (data){
        pokemonImage.style.display = 'block'
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id + " - "
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']

        input.value=""

        originalImageUrl = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    } else {
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = "Nada :("
        pokemonNumber.innerHTML = ""
    }
    currentPokemonNumber = data.id
}

form.addEventListener('submit', (Event) => {
    
    Event.preventDefault()
    renderPokemon(input.value)
})

renderPokemon("1")

async function proximo(){
    const currentNumber = parseInt(pokemonNumber.innerHTML)
    const nextpokemonNumber = currentNumber + 1
    renderPokemon(nextpokemonNumber.toString())
}

async function anterior(){
    const currentNumber = parseInt(pokemonNumber.innerHTML)
    if(currentNumber > 1){
        const prevpokemonNumber = currentNumber - 1
        renderPokemon(prevpokemonNumber.toString())
    }
}

async function shiny(pokemon) {
    
    if (pokemonImage.src !== originalImageUrl){
        pokemonImage.src = originalImageUrl
    } else {
        const currentNumber = parseInt(pokemonNumber.innerHTML)
        const shinyData = await fetchPokemon(currentNumber.toString());
        if (shinyData) {
            pokemonImage.src = shinyData['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];
        }
    }
}