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

    function showModal(name, height, imageUrl) {

        //find the modal container and clear it
        let modalContainer = document.querySelector('#modal-container');


        let modal = document.createElement('div');
        modal.classList.add('modal')

        let closeButton = document.createElement('button');
        closeButton.classList.add('modal-close');
        closeButton.innerText = "X";
        closeButton.addEventListener('click', hideModal);

        //create a Title for the modal with the pokemon's name
        let modalTitle = document.createElement('h1');
        modalTitle.innerText = name;

        //create text content for the modal with the pokemon's height in cm
        let modalContent = document.createElement('p');
        modalContent.innerText = "This Pokemon is " + height + " cm tall.";

        //create an image of the pokemon on the modal with appropriate alt text
        let modalImage = document.createElement('img');
        modalImage.setAttribute('src', imageUrl);
        modalImage.setAttribute('alt', "A picture of " + name + ", a pokemon"); 

        //append content to the modal
        modal.appendChild(closeButton);
        modal.appendChild(modalTitle);
        modal.appendChild(modalContent);
        modal.appendChild(modalImage);

        modalContainer.appendChild(modal);

        //make the modal container visible
        modalContainer.classList.add('is-visible');
    }

    function hideModal(){
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.innerHTML = '';
        modalContainer.classList.remove('is-visible');

    }

    //waits for details to be loaded and adds a modal with details to the DOM
    function showDetails (pokemon){
        loadDetails(pokemon).then(function(){
            console.log("showDetails: pokemon = ", pokemon);
            showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
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

