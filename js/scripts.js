// IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

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
    if (pokemon.height > 10) {
      pokemonInfo += " - Wow, that's big!";
    }

    // Get ul node
    let pokemonList = document.querySelector('.pokemon-list');

    // Create li node
    let listItem = document.createElement('li')

    // Create button node
    let button = document.createElement('button')
    // button.innerText = pokemon.name;
    button.innerText = pokemonInfo;
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
  * @return {Promise<json>} Promise 
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
    showModal(
      pokemon.name,
      'Height: ' + pokemon.height,
      pokemon.imageUrl
    );
  }

  return {
    add: add,
    addListItem: addListItem,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

/**
* Show modal of Pokemon profile
* @param {string} title Title of the modal
* @param {string} text Content inside the modal
* @param {string} imgUrl Link to picture of pokemon
*/
function showModal(title, text, imgUrl) {
  let modalContainer = document.querySelector('#modal-container');

  // Clear all existing modal content
  modalContainer.innerHTML = '';

  let modal = document.createElement('div');
  modal.classList.add('modal');

  // Add the new modal content
  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);

  let titleElement = document.createElement('h1');
  titleElement.innerText = title;

  let contentElement = document.createElement('p');
  contentElement.innerText = text;

  let imageElement = document.createElement('img');
  imageElement.src = imgUrl;

  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modal.appendChild(imageElement);
  modalContainer.appendChild(modal);

  modalContainer.classList.add('is-visible');

  // Listener for click outside the modal
  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });
}

/**
* Hide modal of Pokemon profile
*/
function hideModal() {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.remove('is-visible');
}

pokemonRepository.loadList()
.then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    // Load the datails first, otherwise the pokemon only has name and url
    pokemonRepository.loadDetails(pokemon)
    .then(function () {
      pokemonRepository.addListItem(pokemon);
    });
  });
});

// Listner for escape key
window.addEventListener('keydown', (e) => {
  let modalContainer = document.querySelector('#modal-container');
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();
  }
});