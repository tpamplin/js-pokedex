//Pokedex Program!
//Timothy Pamplin 2024


let pokemonRepository = (function(){

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';



    //use this function to add pokemon to the pokedex.
    //must be an object with the correct keys.
    function add(pokemon) {

        //stringify object keys so they can be compared as strings.
        pokemonKeys = JSON.stringify(Object.keys(pokemon));
        compareKeys = '["name","detailsUrl"]';

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
    
    //use this function to retrieve the data from the IIFE as an array of pokemon objects, each with a name and url for more details
    function getAll () {
        return pokemonList;
    };

    //this function creates a button element on the DOM for any given pokemon that it is called on.
    function addListItem (pokemon){

        let list = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemonButton');

        listItem.appendChild(button);

        button.addEventListener('click', function(){
            
            hideDetails();
            showDetails(pokemon, listItem);

        });
        

        list.appendChild(listItem);
    };

    //this function loads a list of pokemon objects, and adds each one to the pokemonList.
    function loadList() {
        
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item){
                let pokemon = {
                    name:item.name,
                    detailsUrl:item.url
                };
                add(pokemon);
            });
        }).catch(function (error) {
            console.error(error);
        });
    };

    //loads more details about a specific pokemon
    function loadDetails(item) {

        let url = item.detailsUrl;
        
        return fetch(url).then(function (response) {
                return response.json();
            }).then(function (details) {
        
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types
        

        }).catch(function(error){
            console.error(error);
        });
    };

    //waits for details to be loaded and adds it to the DOM
    function showDetails (pokemon, listItem){
        loadDetails(pokemon).then(function(){
            console.log("showDetails: pokemon = ", pokemon);

            let detailsDisplay = document.createElement('p');
            let displayText = ("Height: " + pokemon.height);
            
            detailsDisplay.innerText = displayText;
            detailsDisplay.classList.add('pokemonDetails');

            listItem.appendChild(detailsDisplay);

        });
    };

    //searches the DOM for a pokemon with extra details and removes the extra details.
    function hideDetails(){
        let pokemon = document.querySelector('.pokemonDetails');
        if (pokemon !== null){
            pokemon.remove()
        };
    };

    return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        addListItem: addListItem,
        loadDetails: loadDetails
    };

})();

pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});

