//Pokedex Program!
//Timothy Pamplin 2024


let pokemonRepository = (function(){

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';



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
        button.classList.add('pokemonButton', 'btn', 'btn-primary');
        button.setAttribute("data-bs-toggle", "modal");
        button.setAttribute("data-bs-target", "#detailsModal");
        listItem.appendChild(button);

        button.addEventListener('click', function(){
            
            showDetails(pokemon);

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
                    name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
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
            item.height = details.height * 10;
            item.types = details.types
        

        }).catch(function(error){
            console.error(error);
        });
    };

    //builds a modal with a given pokemon's name and height, and a picture of that pokemon
    function showModal(pokemon) {

        const {name, height, imageUrl} = pokemon;

        //Set Modal title
        let title = $('#detailsModalLabel');
        title.empty();
        title.text(name);

        //build modal body
        let body = $('.modal-body');
        body.empty();

        let heightText = '';
        if(height >= 100){
            heightText = "This Pokemon is " + height / 100 + " m tall.";
        }
        else{
            heightText = "This Pokemon is " + height + " cm tall.";
        }        

        let heightTextElement = $('<p></p>').text(heightText);
        body.append(heightTextElement);

        let imageElement = $('<img></img>');
        imageElement.attr('src', imageUrl);
        imageElement.attr('alt', 'An image of ' + name + ', a pokemon.');
        imageElement.addClass('pokemonImage')

        body.append(imageElement);
    }

    //waits for details to be loaded and adds a modal with details to the DOM
    function showDetails (pokemon){
        loadDetails(pokemon).then(function(){
            showModal(pokemon);
        });
    };


    return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        addListItem: addListItem,
        showModal: showModal
    };

})();



pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});

