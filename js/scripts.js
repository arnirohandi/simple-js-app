(function() {
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
    ];

    // Iterate over the array using forEach()
    pokemonList.forEach(function(pokemon) {
        let pokemonInfo = pokemon.name + " (height: " + pokemon.height + ")";
        
        // Check if the height is above a certain value to highlight special Pokémon
        if (pokemon.height > 1.5) {
            pokemonInfo += " - Wow, that's big!";
        }
        
        document.write("<p>" + pokemonInfo + "</p>");
    });
})();