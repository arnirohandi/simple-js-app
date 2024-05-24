// IIFE
let pokemonRepository = (function () {

    // Array of Pokémon objects
    let pokemonList = [
        {
            name: "Bulbasaur",
            height: 0.7,
            types: ['grass', 'poison']
        },
        {
            name: "Oddish",
            height: 0.5,
            types: ['grass', 'poison']
        },
        {
            name: "Chansey",
            height: 1.1,
            types: ['normal']
        },
        {
            name: "Snorlax",
            height: 2.1,
            types: ['normal']
        }
    ]

    function getAll() {
        return pokemonList
    }
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
        button.addEventListener('click', function() {showDetails(pokemon)});

        // Append button to li node
        listItem.appendChild(button);

        // Append li node to ul node
        pokemonList.appendChild(listItem);

    }
    function showDetails(pokemon) {
        console.log(pokemon);
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
    }
})();

// Iterate over the array using forEach()
pokemonRepository.getAll().forEach(function (pokemon) {
    // Call addListItem function
    pokemonRepository.addListItem(pokemon)
});