// Constants and variables

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


// Fix an img on each tile with the alt attribute and class set to cardFront. The cardFront image should be same for only 2 tiles, so there should be 8 different images in total.
// There should be two of each of the 8 images on the total 16 divs. The images are fetched fetched in an asynchronous function that just gets the images from the Pokemon API.

async function getImages() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=8");
    const data = await response.json();
    const pokemon = data.results;
    
    //loop through the pokemon array and set the images on the tiles 0 through 7
  
    pokemon.forEach((poke, index) => {
      const tile = document.getElementById("tile" + index);
      const img = document.createElement("img");
      img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${index + 1}.png`;
      img.alt = "cardFront";
      img.classList.add("cardFront");
      tile.appendChild(img);
      img.style.display = "none";
      
      // tile.innerHTML = `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png" alt="cardFront" class="cardFront" />`;
    });

    //loop through the pokemon array and set the images on the tiles 8 through 15

    pokemon.forEach((poke, index) => {
      const tile = document.getElementById("tile" + (index + 8));
      const img = document.createElement("img");
      img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${index + 1}.png`;
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


// A function that will shuffle the tiles when the page is loaded

function shuffleTiles() {
    const tiles = document.querySelectorAll(".tiles");
    tiles.forEach((tile) => {
      let randomPos = Math.floor(Math.random() * 16);
      tile.style.order = randomPos;
    });
  }

shuffleTiles();


// reset button that will reload the page when clicked. to be use after game is over.

const resetButton = document.createElement("button");
resetButton.innerText = "Reset";
resetButton.classList.add("reset-button");
document.body.appendChild(resetButton);
// resetButton.style.display = "block";
// resetButton.style.margin = "auto";
// resetButton.style.marginTop = "20px";
// resetButton.style.padding = "10px";
// resetButton.style.fontSize = "20px";
// resetButton.style.backgroundColor = "black";
// resetButton.style.color = "white";
// resetButton.style.border = "none";
// resetButton.style.borderRadius = "5px";
// resetButton.style.cursor = "pointer";
// resetButton.style.outline = "none";


resetButton.addEventListener("click", () => {
  location.reload();
});




//MAIN GAME LOGIC



//Add an event listener to each tile that will flip it when clicked by giving it the class
//flipped and cardFront and change the display of the cardBack image to none, while the cardFront image is displayed.

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

// A function that will allow only two tiles to be flipped at a time.
//If any tile, other than the two that are flipped, is clicked,
//the two flipped tiles will flip back to their original state.

tiles.forEach((tile) => {
    tile.addEventListener("click", () => {
      const flippedTiles = document.querySelectorAll(".flipped");
      if (flippedTiles.length > 2) {
        flippedTiles.forEach((tile) => {
          tile.classList.remove("flipped");
          tile.firstChild.style.display = "block";
          tile.firstChild.nextSibling.style.display = "none";
        });
      }
    });
  });

// A function that will flip each of the tiles back over after a delay of 2 seconds
//after the second tile is clicked and the two tiles do not have a class called matched.
// Do not flip the tiles back over if the two tiles have a class called matched.
// Do not flip after 2 seconds if only one tile is flipped.

function flipBack() {
  const flippedTiles = document.querySelectorAll(".flipped");
  if (flippedTiles.length === 2) {
    flippedTiles.forEach((tile) => {
      tile.classList.remove("flipped");
      tile.firstChild.style.display = "block";
      tile.firstChild.nextSibling.style.display = "none";
    });
  }
}




// A function that will check if the two flipped tiles have the same pair[i] class. If they do, add a class called matched to the tiles, and remove the class flipped from the tiles.
// If the two tiles do not have the same pair[i] class, call the flipBack function to flip the tiles back over after 2 seconds.

function checkMatch() {
  const flippedTiles = document.querySelectorAll(".flipped");
  if (flippedTiles.length === 2) {
    if (flippedTiles[0].classList[1] === flippedTiles[1].classList[1]) {
      flippedTiles.forEach((tile) => {
        tile.classList.add("matched");
        tile.classList.remove("flipped");
      });
    } else {
      setTimeout(() => {
        flipBack();
      }, 2000);
    }
  }
}

// Call the checkMatch function every time 2 tiles are flipped

tiles.forEach((tile) => {
  tile.addEventListener("click", () => {
    checkMatch();
  });
});

// Call the flipBack function every time the number of flipped tiles is greater than 2, and a tile other than the one that was just clicked is clicked

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

// A function that checks if all the tiles have the class matched. If they do, game over, you win.

// function checkWin() {
//   const matchedTiles = document.querySelectorAll(".matched");
//   if (matchedTiles.length === 16) {
//     alert("You win!");
//   }
// }

//function to delay win message by 2 seconds
// function checkWin() {
//   const matchedTiles = document.querySelectorAll(".matched");
//   if (matchedTiles.length === 16) {
//     setTimeout(() => {
//       alert("You win!");
//     }, 2000);
//   }
// }

// A funcntion that checks if all the tiles have the class matched, and after a delay of 1 second, an alert will pop up saying "You win!"
//and on clicking the OK button, the pokeart page will be loaded.

function checkWin() {
  const matchedTiles = document.querySelectorAll(".matched");
  if (matchedTiles.length === 16) {
    setTimeout(() => {
      alert("You win!");
      window.location.href = "pokeart.html";
    }, 1000);
  }
}



// Call the checkWin function every time 2 tiles are flipped

tiles.forEach((tile) => {
  tile.addEventListener("click", () => {
    checkWin();
  });
});

// FINITO PASTA FINALLY DONE!










