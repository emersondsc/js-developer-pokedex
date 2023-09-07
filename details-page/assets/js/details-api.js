

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

    pokemon.height = pokeDetail.height
    pokemon.weight = (pokeDetail.weight)/10

    return pokemon
}

function convertPokemonToLi(pokemon) {
    return `
            <section class="banner">
                <div class="pokemon p${pokemon.type}">
                <a class="return-button" href="/">&#10140;</a>
                    <h1 class="name">${pokemon.name}</h1>
                    <span class="number">#${pokemon.number}</span>
                    <div class="detail">
                        <ol class="types">
                               ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>

                        <img src=${pokemon.photo}
                            alt="${pokemon.name}">
                    </div>
                </div>

            </section>

            <section class="informatives">
                <div class="about">
                    <h3>About</h3>
                    <ul class="list-about">
                        <li class="item-about">
                            <div>
                                <span class="about-attribute">Height</span>
                                <span class="about-value">${pokemon.height} cm</span>
                            </div>
                        </li>
                        <li class="item-about">
                            <div>
                                <span class="about-attribute">Weight</span>
                                <span class="about-value">${pokemon.weight} Kg</span>
                            </div>
                        </li>
                        <li class="item-about">
                            <div class= "about-abilities"> 
                                    <ol class="about-attribute">
                                        
                                        <span class="about-attribute">Abilities</span>
                                        
                                         ${pokemon.abilities.map((ability) => `<li class="value">${ability}</li>`).join(', ')}
                                    </ol>
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
                                <span class="stats-value">${pokemon.hp}</span>
                            </div>
                            <div>
                                <progress class="progress-bar" max="100" value=${pokemon.hp}>
                                ${pokemon.hp}
                                </progress>

                            </div>
                        </li>
                        <li  class="item-stat">
                            <div>
                                <span class="stats-attribute">Attack</span>
                                <span class="stats-value">${pokemon.attack}</span>
                            </div>
                            <div>
                                <progress class="progress-bar" max="100" value=${pokemon.attack}>
                                ${pokemon.attack}
                                </progress>

                            </div>
                        </li>
                        <li  class="item-stat">
                            <div>
                                <span class="stats-attribute">Defence</span>
                                <span class="stats-value">${pokemon.defence}</span>
                            </div>

                            <div>
                                <progress class="progress-bar" max="100" value=${pokemon.defence}>
                                ${pokemon.defence}
                                </progress>

                            </div>
                        </li>
                        <li  class="item-stat">
                            <div>
                                <span class="stats-attribute">Sp.Atk</span>
                                <span class="stats-value">${pokemon.spattack}</span>
                            </div>
                            <div>
                                <progress class="progress-bar" max="100" value=${pokemon.spattack}>
                                ${pokemon.spattack}
                                </progress>

                            </div>
                        </li>
                        <li  class="item-stat">
                            <div>
                                <span class="stats-attribute">Sp.Def</span>
                                <span class="stats-value">${pokemon.spdefence}</span>
                            </div>
                            <div>
                                <progress class="progress-bar" max="100" value=${pokemon.spdefence}>
                                ${pokemon.spdefence}
                                </progress>

                            </div>
                        </li>
                        <li  class="item-stat">
                            <div>
                                <span class="stats-attribute">Speed</span>
                                <span class="stats-value">${pokemon.speed}</span>
                            </div>
                            <div>
                                <progress class="progress-bar" max="100" value=${pokemon.speed}>
                                ${pokemon.speed}
                                </progress>

                            </div>
                        </li>
                    </ul>
                </div>

            </section>
    `
}

const allTheContent = document.getElementById ('allTheContent');


function getPokemons() {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNumberToDetails}`

    return fetch(url)
        .then((response) => response.json())
        .then((convertPokeApiDetailToPokemon))
        .then((pokemon) => {allTheContent.innerHTML += (convertPokemonToLi(pokemon))
            console.log(allTheContent.innerHTML)
            
        })
        .catch((error) => console.error(error));
}

getPokemons();
