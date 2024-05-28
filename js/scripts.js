// IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=5';

  /**
  * Add pokemon to the pokemon list
  * @param {Pokemon} pokemon
  */
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  /**
  * Add pokemon info to pokemon list,
  * create unordered list,
  * create pokemon as button in html page
  * @param {Pokemon} pokemon 
  */
  function addListItem(pokemon) {
    let pokemonInfo = pokemon.name + " (height: " + pokemon.height + ")";

    // Check if the height is above a certain value to highlight special Pokémon
    if (pokemon.height > 1.5) {
      pokemonInfo += " - Wow, that's big!";
    }

    // Get ul node
    let pokemonList = document.querySelector('.pokemon-list');

    // Create li node
    let listItem = document.createElement('li')

    // Create button node
    let button = document.createElement('button')
    button.innerText = pokemon.name;
    button.classList.add('pokemon-list');

    // Event listener
    button.addEventListener('click', function () { showDetails(pokemon) });

    // Append button to li node
    listItem.appendChild(button);

    // Append li node to ul node
    pokemonList.appendChild(listItem);
  }

  /**
  * Get pokemon list
  * @return {Array<Pokemon>} Array of pokemon 
  */
  function getAll() {
    return pokemonList
  }

  /**
  * Fetch pokemons from API server
  * @return {Promise} Promise 
  */
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(
        function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
          });
        }
      )
      .catch(
        function (e) {
          console.error(e);
        }
      )
  }

  /**
  * Get details of pokemon from API server
  * @param {Pokemon} item
  */
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  /**
  * Show details of pokemon list
  * @param {Pokemon} pokemon 
  */
  function showDetails(pokemon) {
    loadDetails(pokemon);
    console.log(pokemon);
  }

  return {
    add: add,
    addListItem: addListItem,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});