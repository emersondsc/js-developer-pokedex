

const urlParams = new URLSearchParams(window.location.search);
const pokemonNumberToDetails = urlParams.get("id");

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    const abilities = pokeDetail.abilities.map((nameAbility) => nameAbility.ability.name)
        
    pokemon.abilities = abilities 
    
    pokemon.hp = pokeDetail.stats [0].base_stat;
    pokemon.attack = pokeDetail.stats [1].base_stat;
    pokemon.defence = pokeDetail.stats [2].base_stat;
    pokemon.spattack = pokeDetail.stats [3].base_stat;
    pokemon.spdefence = pokeDetail.stats [4].base_stat;
    pokemon.speed = pokeDetail.stats [5].base_stat;

    
    return console.log(pokemon)
}

function convertPokemonToLi(pokemon) {
    return `
            <main class="content">
            <section class="banner">
                <div class="pokemon">
                    <button class="return-button"> Return </button>
                    <h1 class="name">Bulbasaur</h1>
                    <span class="number">#1</span>
                    <div class="detail">
                        <ol class="types">
                               ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>

                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
                            alt="Bulbasaur">
                    </div>
                </div>

            </section>

            <section class="informatives">
                <div class="about">
                    <h3>About</h3>
                    <ul class="list-about">
                        <li class="item-about">
                            <div>
                                <span class="about-attribute">Heigth</span>
                                <span class="about-value">0,7 cm</span>
                            </div>
                        </li>
                        <li class="item-about">
                            <div>
                                <span class="about-attribute">Weigth</span>
                                <span class="about-value">6,9 Kg</span>
                            </div>
                        </li>
                        <li class="item-about">
                            <div>
                                <span class="about-attribute">Abilities</span>
                                <span class="about-value">Overgrow, Chlorophyll</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="stats">
                    <h3>Stats</h3>
                    <ul class="list-stats">

                        <li  class="item-stat">
                            <div>
                                <span class="stats-attribute">HP</span>
                                <span class="stats-value">45</span>
                            </div>
                            <div>
                                <progress class="progress-bar" max="100" value="70">
                                    70%
                                </progress>

                            </div>
                        </li>
                        <li  class="item-stat">
                            <div>
                                <span class="stats-attribute">Attack</span>
                                <span class="stats-value">49</span>
                            </div>
                            <div>
                                <progress class="progress-bar" max="100" value="70">
                                    70%
                                </progress>

                            </div>
                        </li>
                        <li  class="item-stat">
                            <div>
                                <span class="stats-attribute">Defence</span>
                                <span class="stats-value">49</span>
                            </div>

                            <div>
                                <progress class="progress-bar" max="100" value="70">
                                    70%
                                </progress>

                            </div>
                        </li>
                        <li  class="item-stat">
                            <div>
                                <span class="stats-attribute">Sp.Atk</span>
                                <span class="stats-value">65</span>
                            </div>
                            <div>
                                <progress class="progress-bar" max="100" value="70">
                                    70%
                                </progress>

                            </div>
                        </li>
                        <li  class="item-stat">
                            <div>
                                <span class="stats-attribute">Sp.Def</span>
                                <span class="stats-value">65</span>
                            </div>
                            <div>
                                <progress class="progress-bar" max="100" value="70">
                                    70%
                                </progress>

                            </div>
                        </li>
                        <li  class="item-stat">
                            <div>
                                <span class="stats-attribute">Speed</span>
                                <span class="stats-value">45</span>
                            </div>
                            <div>
                                <progress class="progress-bar" max="100" value="70">
                                    70%
                                </progress>

                            </div>
                        </li>
                    </ul>
                </div>

            </section>
        </main
    `
}

const allTheContent = document.getElementById ('allTheContent');


function getPokemons() {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNumberToDetails}`

    return fetch(url)
        .then((response) => response.json())
        .then((pokemon) => {
            convertPokeApiDetailToPokemon(pokemon)
            console.log(pokemon)
            allTheContent.innerHTML += (convertPokemonToLi(pokemon))
        })
        .catch((error) => console.error(error));
}

getPokemons();
