// Array of Pokémon names
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

// Loop through the array and write each Pokémon name, height, and highlight special Pokémon
for (let i = 0; i < pokemonList.length; i++) {
    let pisang = pokemonList[i];
    // let pokemonInfo = pokemon.name + " (height: " + pokemon.height + ")";

    // Check if the height is above a certain value to highlight special Pokémon
    // if (pokemon.height > 1.5) {
    //     pokemonInfo += " - Wow, that's big!";
    // }

    // <div class="pokemon">
    //     <p class="name">Bulbasaur</p>
    //     <p class="height">(Height: 0.7)</p>
    // </div>


    document.write("<div class='pokemon'>" + 
    "<p class='name'>" + pokemon.name + "</p>" + 
    "<p class='height'>" + " (height: " + pokemon.height +")</p>" + 
    "</div>");
    
}

// document.write("pisang <b>pikachu</b>")