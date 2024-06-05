//Pokedex Program!
//Timothy Pamplin 2024

//Pokemon data set.
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

//establish variable to hold the height of the tallest pokemon
let tallestHeight = 0;

//find height of tallest pokemon
//checks every pokemon in pokemonList to see if it is the tallest in the list.
//sets tallestHeight to the height of the current pokemon if it is the tallest so far.
for (let i = 0; i < pokemonList.length; i++){
    //check if current pokemon is taller than tallest so far.
    if (pokemonList[i].height > tallestHeight){
        //set tallest height variable to current pokemon height.
        tallestHeight = pokemonList[i].height;
    }
};

/*
write data to page

cycles through each pokemon and writes its name and height to the page, 
also indentifies any pokemon whose height is equal to the tallest height
and writes special message accordingly
*/
for (let i = 0; i < pokemonList.length; i++){
    //write the name and height of the current pokemon.
    document.write(`${pokemonList[i].name} -- Height: ${pokemonList[i].height} cm<br>`);
    //check to see if the current pokemon's height is the same as the tallest pokemon's height.
    if (pokemonList[i].height == tallestHeight){
        //if this is the tallest pokemon, tell me about it!
        document.write('WOW! that\'s big!<br>');
    };
    //add an extra line break after each pokemon.
    document.write('<br>');
};