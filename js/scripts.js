//Pokedex Program!
//Timothy Pamplin 2024

/* Pokemon Data Set

    contains an array of pokemon objects.

Each pokemon has 3 properties:
    name
    height
    type

access with:
    add: input an object to add it to the pokedex
    getAll: returns the entire array for further processing.

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

    //use this function to add pokemon to the pokedex.
    //must be an object with the correct keys.
    function add(pokemon) {

        //stringify object keys so they can be compared as strings.
        pokemonKeys = JSON.stringify(Object.keys(pokemon));
        compareKeys = JSON.stringify(Object.keys(pokemonList[0]));

        //check to make sure submission is an object with all the correct keys
        if ((typeof pokemon === "object") && (pokemonKeys === compareKeys)){
            //pushes pokemon to the pokemonList.    
            pokemonList.push(pokemon);
        }
        //catch any submission that is not an object or has incorrect object keys.
        else {
            //log error message to the console.
            console.log("Invalid: Not an object or keys don't match");
        };
    };

    function getAll () {

        return pokemonList;
    };

    return {

        add: add,
        getAll: getAll
    };
})();

/*tallest container

    contains the height of the tallest pokemon that has been compared to it.

access with:
    compare: input a pokemon height and if it is the tallest one it has compared to, then it logs its height to the tallestHeight variable.
    getTallestHeight: returns the tallestHeight variable

*/
let tallestContainer = (function(){
    
    let tallestHeight = 0;

    function compare(height){

        if (height > tallestHeight){
        
            tallestHeight = height;
        };
    };

    function getTallestHeight(){

        return tallestHeight;
    };

    return{

        compare: compare,
        getTallestHeight: getTallestHeight

    };
})();

//Data Manipulation

//example of adding a pokemon to the repository
pokemonRepository.add(
    {
        name: "Caterpie",
        height: 30,
        types: ["bug"]
    }
);

//Function declarations

//compare pokemon height to tallest height and print message if they are equal
function tallestMessage(tHeight, pHeight){
    if (tHeight === pHeight){
        document.write(' -- Wow, that\'s big!');
    };
};

//write information about one pokemon to the screen, and a special message if it is the tallest one on the list
function printPokemon(pokemon){

    //write the name and height of the current pokemon.
    document.write(pokemon.name, ' -- Height: ', pokemon.height, ' cm');
};

//add a line break
function lineBreak(){
    document.write('<br>')
}

//finds the tallest pokemon and sets the tallestHeight variable to that height.
function findTallestHeight(allPokemon){

    allPokemon.forEach(function(pokemon){
        tallestContainer.compare(pokemon.height);
    });
}

//takes pokedex as an input and runs the printPokemon function on each pokemon object in the array
function writeData(allPokemon, tallestHeight){
    allPokemon.forEach(function(pokemon){
        printPokemon(pokemon);
        tallestMessage(tallestHeight, pokemon.height);
        lineBreak();
        
    });
};

//call functions and execute program

//find height of the tallest pokemon
findTallestHeight(pokemonRepository.getAll());

//print all data to the screen
writeData(pokemonRepository.getAll(), tallestContainer.getTallestHeight());
