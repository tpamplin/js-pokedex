//Pokedex Program!
//Timothy Pamplin 2024

/* Pokemon Data Set

Each pokemon has 3 properties:
name
height
type

*/

let pokemonRepository = (function(){

    let pokemonList = [
        {
            name: "Bulbasaur",
            height: 70,
            types: ["Grass", "Poison"]
        }, 

        {
            name: "Ivysaur",
            height: 100,
            types: ["Grass", "Poison"]
        }, 

        {
            name: "Venusaur",
            height: 200,
            types: ["Grass", "Poison"]
        }, 

        {
            name: "Charmander",
            height: 60,
            types: ["Fire"]
        },

        {
            name: "Charmeleon",
            height: 110,
            types: ["Fire"]
        }, 

        {
            name: "Charizard",
            height: 170,
            types: ["Fire", "Flying"]
        }, 

        {
            name: "Squirtle",
            height: 50,
            types: ["Water"]
        },

        {
            name: "Wartortle",
            height: 100,
            types: ["Water"]
        }, 

        {
            name: "Blastoise",
            height: 160,
            types: ["Water"]
        }
    ];

    function add(pokemon) {
        pokemonList.push(pokemon);
    };

    function getAll () {

        return pokemonList;
    }

    return {

        add: add,
        getAll: getAll
    };
})();

/* write data to page

cycles through each pokemon and writes its name and height to the page, 
also indentifies any pokemon whose height is equal to the tallest height
and writes special message accordingly

*/


for (let i = 0; i < pokemonList.length; i++){

    //set variables for pokemon name and height to improve readability.
    let thisPokemonName = pokemonList[i].name;
    let thisPokemonHeight = pokemonList[i].height;
    
    //write the name and height of the current pokemon.
    document.write(`${thisPokemonName} -- Height: ${thisPokemonHeight} cm<br>`);
    
    //check to see if the current pokemon's height is the same as the tallest pokemon's height.
    if (thisPokemonHeight == tallestHeight){
        
        //if this is the tallest pokemon, tell me about it!
        document.write('WOW! that\'s big!<br>');
    };
    //add an extra line break after each pokemon.
    document.write('<br>');
};