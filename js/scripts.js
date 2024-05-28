// IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=5';

  // Use the add() function to add each Pokémon from the results to your pokemonList variable. 
  // Make sure to set name and detailsUrl as the keys. Use this as a reference to see what the API response looks like.
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

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

  function getAll() {
    return pokemonList
  }

  // Add a LoadList() function as a return key that uses fetch 
  // to GET the complete list of Pokémon from here: https://pokeapi.co/api/v2/pokemon/
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

  // Add a loadDetails() function, as well. The loadDetails() function should expect a parameter with a Pokémon object as a parameter. 
  // loadDetails() should GET the Pokémon details using the URL from the Pokémon object in the parameter.
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

  function showDetails(pokemon) {
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