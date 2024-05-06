const gameBoard = document.getElementById("game-board");
const tile = document.createElement("div");
tile.classList.add("tiles");


// 4x4 div grid

for (let i = 0; i < 16; i++) {
    let tile = document.createElement("div");
    tile.classList.add("tiles");
    tile.setAttribute("id", "tile" + i);
  
    gameBoard.appendChild(tile);
  }



// Set cardBack image on each tile

const tiles = document.querySelectorAll(".tiles");

tiles.forEach((tile) => {
  const img = document.createElement("img");
  img.src = "https://miro.medium.com/v2/resize:fit:646/0*QFwllsqpOmnp9bBg.jpg";
  img.alt = "cardBack";
  img.classList.add("cardBack");
  tile.appendChild(img);
});


    // tile.innerHTML = `<img src="https://miro.medium.com/v2/resize:fit:646/0*QFwllsqpOmnp9bBg.jpg" alt="cardBack" class="cardBack" />`;
    // });


// Fix an img on each tile with the alt attribute and id set to cardFront. The cardFront image should be same for only 2 tiles, so there should be 8 different images in total.
// There should be two of each of the 8 images on the total 16 divs. The images are fetched fetched in an asynchronous function that just gets the images from the Pokemon API.

async function getImages() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=8");
    const data = await response.json();
    const pokemon = data.results;
    
    //loop through the pokemon array and set the images on the tiles 0 through 7, using setAttribute to set the class and alt attribute amd the src attribute to the image url
  
    pokemon.forEach((poke, index) => {
      const tile = document.getElementById("tile" + index);
      const img = document.createElement("img");
      img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`;
      img.alt = "cardFront";
      img.classList.add("cardFront");
      tile.appendChild(img);
      img.style.display = "none";
      
      // tile.innerHTML = `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png" alt="cardFront" class="cardFront" />`;
    });

    //loop through the pokemon array and set the images on the tiles 8 through 15, using setAttribute to set the class and alt attribute amd the src attribute to the image url

    pokemon.forEach((poke, index) => {
      const tile = document.getElementById("tile" + (index + 8));
      const img = document.createElement("img");
      img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`;
      img.alt = "cardFront";
      img.classList.add("cardFront");
      tile.appendChild(img);
      img.style.display = "none";

      // tile.innerHTML = `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png" alt="cardFront" class="cardFront" />`;
    });
}

getImages();



   

// A function that appends a new class called pair to the tiles such that index 0 is matched with index 8, 1 with 9, 2 with 10, and so on.

function pairTiles() {
    for (let i = 0; i < 8; i++) {
        tiles[i].classList.add("pair" + i);
        tiles[i + 8].classList.add("pair" + i);
    }
}

pairTiles();


// Create a function that will shuffle the tiles when the page is loaded

function shuffleTiles() {
    const tiles = document.querySelectorAll(".tiles");
    tiles.forEach((tile) => {
      let randomPos = Math.floor(Math.random() * 16);
      tile.style.order = randomPos;
    });
  }

shuffleTiles();



//Add an event listener to each tile that will flip it when clicked by giving it the class flipped and cardFront and change the display of the cardBack image to none, while the cardFront image is displayed.

tiles.forEach((tile) => {
    tile.addEventListener("click", () => {
      tile.classList.add("flipped");
      tile.classList.add("cardFront");
      tile.firstChild.style.display = "none";
      tile.firstChild.nextSibling.style.display = "block";
    });
  });


// tiles.forEach((tile) => {
//     tile.addEventListener("click", () => {
//       tile.classList.add("flipped");
//       tile.classList.add("cardFront");
//     });
//   });



// Create a function that will flip each of the tiles back over after a short delay

function flipBack() {
  tiles.forEach((tile) => {
    tile.classList.remove("flipped");
    tile.classList.remove("cardFront");
    tile.firstChild.style.display = "block";
      tile.firstChild.nextSibling.style.display = "none";
  });
}



// Call the function every time the number of flipped tiles is greater than 2, and a tile other than the one that was just clicked is clicked

let flippedTiles = 0;
let firstTile = null;
let secondTile = null;

tiles.forEach((tile) => {
  tile.addEventListener("click", () => {
    if (flippedTiles === 0) {
      firstTile = tile;
      flippedTiles++;
    } else if (flippedTiles === 1 && tile !== firstTile) {
      secondTile = tile;
      flippedTiles++;
    } else if (flippedTiles === 2) {
      flipBack();
      flippedTiles = 0;
    }
  });
});


//


