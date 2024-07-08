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

    //builds a modal with a given pokemon's name and height, and a picture of that pokemon
    function showModal(pokemon) {

        const {name, height, imageUrl} = pokemon;

        //find the modal container and clear it
        let modalContainer = document.querySelector('#modal-container');

        //create modal
        let modal = document.createElement('div');
        modal.classList.add('modal')
        
        //create close button
        let closeButton = document.createElement('button');
        closeButton.classList.add('modal-close');
        closeButton.innerText = "Close";

        //close the modal when you click the close button
        closeButton.addEventListener('click', hideModal);

        //close the modal when you click out of the modal
        modalContainer.addEventListener('click', (e) => {
            let target = e.target;
            if(target === modalContainer) {
                hideModal();
            }
        });

        //close the modal when you press the escape key
        window.addEventListener('keydown', (e) => {
            if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
                hideModal();
            }
        });

        //create a Title for the modal with the pokemon's name
        let modalTitle = document.createElement('h2');
        modalTitle.classList.add('modal-title');
        modalTitle.innerText = name;

        //create text content for the modal with the pokemon's height in cm
        let modalContent = document.createElement('p');
        modalContent.classList.add('modal-content');
        if(height >= 100){
            modalContent.innerText = "This Pokemon is " + height / 100 + " m tall.";
        }
        else{
            modalContent.innerText = "This Pokemon is " + height + " cm tall.";
        }
        

        //create an image of the pokemon on the modal with appropriate alt text
        let modalImage = document.createElement('img');
        modalImage.setAttribute('src', imageUrl);
        modalImage.setAttribute('alt', "A picture of " + name + ", a pokemon");
        modalImage.classList.add('modal-image') 

        //append content to the modal
        modal.appendChild(closeButton);
        modal.appendChild(modalTitle);
        modal.appendChild(modalContent);
        modal.appendChild(modalImage);

        modalContainer.appendChild(modal);

        //make the modal container visible
        modalContainer.classList.add('is-visible');
    }

    //makes the modal invisible
    function hideModal(){
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.innerHTML = '';
        modalContainer.classList.remove('is-visible');

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

