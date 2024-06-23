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

    function showDetails (pokemon){
        console.log(pokemon.name);    
    }

    function addListItem (pokemon){

        let list = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemonButton');

        listItem.appendChild(button);
        list.appendChild(listItem);

        button.addEventListener('click', function(event){
            showDetails(pokemon);
        });
        
    }

    return {

        add: add,
        getAll: getAll,
        addListItem: addListItem
    };
})();

//Data Manipulation

//example of adding a pokemon to the repository
pokemonRepository.add(
    {
        name: "Caterpie",
        height: 30,
        types: ["Bug", "Grass"]
    }
);

//Function declarations
pokemonRepository.getAll().forEach(pokemonRepository.addListItem);
